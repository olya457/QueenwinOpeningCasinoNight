import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, PrimaryButton, SecondaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {offers} from '../../data/offers';
import {useAppState} from '../../store/AppContext';

export function OfferDetailsScreen({route}: any) {
  const offer = offers.find(item => item.id === route.params.offerId);
  const {savedOfferIds, toggleSavedOffer} = useAppState();
  if (!offer) {
    return null;
  }

  const saved = savedOfferIds.includes(offer.id);

  return (
    <BackgroundScreen>
      <Image source={offer.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.tag}><Text style={styles.tagText}>{offer.tag}</Text></View>
          <View style={styles.actionRow}>
            <Pressable style={styles.actionButton}><Text style={styles.actionText}>↗</Text></Pressable>
            <Pressable style={styles.actionButton} onPress={() => toggleSavedOffer(offer.id)}><Text style={styles.actionText}>{saved ? '★' : '☆'}</Text></Pressable>
          </View>
        </View>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.description}>{offer.description}</Text>
        <Card><Text style={styles.validity}>🗓 {offer.validity}</Text></Card>
        <Card>
          <Text style={styles.sectionTitle}>Included Benefits</Text>
          {offer.benefits.map(item => <Text key={item} style={styles.listItem}>• {item}</Text>)}
        </Card>
        <Card>
          <Text style={styles.sectionTitle}>Important Conditions</Text>
          {offer.conditions.map(item => <Text key={item} style={styles.listItem}>• {item}</Text>)}
        </Card>
        <Card><Text style={styles.location}>📍 {offer.location}</Text></Card>
        <View style={styles.bottomButtons}>
          <View style={{flex: 1}}><PrimaryButton label={saved ? 'Saved' : 'Save Offer'} onPress={() => toggleSavedOffer(offer.id)} /></View>
          <View style={{flex: 1}}><SecondaryButton label="Share" onPress={() => {}} /></View>
        </View>
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: 'rgba(126,89,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: '#B8A7FF',
    fontSize: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: colors.text,
    fontSize: 16,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    lineHeight: 26,
  },
  validity: {
    color: '#F0C359',
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 10,
  },
  listItem: {
    color: colors.muted,
    lineHeight: 24,
  },
  location: {
    color: colors.text,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});
