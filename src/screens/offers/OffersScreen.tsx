import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, Pill, SectionTitle, SecondaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {offers} from '../../data/offers';
import {useAppState} from '../../store/AppContext';

const filters = ['All', 'Hotel', 'Dining', 'Lounge'];

export function OffersScreen({navigation}: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const {savedOfferIds, toggleSavedOffer} = useAppState();
  const filteredOffers = useMemo(
    () => (activeFilter === 'All' ? offers : offers.filter(item => item.tag.includes(activeFilter))),
    [activeFilter],
  );

  return (
    <BackgroundScreen>
      <SectionTitle
        eyebrow="AFTER OPENING"
        title="Exclusive Offers"
        right={
          <Pressable onPress={() => navigation.navigate('SavedOffers')}>
            <Text style={styles.savedLink}>⭐</Text>
          </Pressable>
        }
      />
      <View style={styles.filters}>
        {filters.map(filter => (
          <Pill key={filter} label={filter} active={filter === activeFilter} onPress={() => setActiveFilter(filter)} />
        ))}
      </View>
      {filteredOffers.map(item => {
        const saved = savedOfferIds.includes(item.id);
        return (
          <Card key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.topActions}>
              <View style={styles.tag}><Text style={styles.tagText}>{item.tag}</Text></View>
              <View style={styles.iconRow}>
                <Pressable style={styles.iconButton}><Text style={styles.iconText}>↗</Text></Pressable>
                <Pressable style={styles.iconButton} onPress={() => toggleSavedOffer(item.id)}><Text style={styles.iconText}>{saved ? '★' : '☆'}</Text></Pressable>
              </View>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.validity}>🗓 {item.validity}</Text>
              <View style={{width: 120}}>
                <SecondaryButton label="View Details" onPress={() => navigation.navigate('OfferDetails', {offerId: item.id})} />
              </View>
            </View>
          </Card>
        );
      })}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  savedLink: {
    color: colors.text,
    fontSize: 20,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  topActions: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: 'rgba(15,17,30,0.72)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagText: {
    color: colors.text,
    fontSize: 12,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(15,17,30,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: colors.text,
    fontSize: 16,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  description: {
    color: colors.muted,
    lineHeight: 24,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  validity: {
    color: colors.muted,
    flex: 1,
  },
});
