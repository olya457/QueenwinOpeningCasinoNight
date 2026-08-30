import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, Pill, SectionTitle} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';
import {events} from '../../data/events';
import {useAppState} from '../../store/AppContext';

const filters = ['All', 'Grand Opening', 'Live Performance', 'Welcome Ceremony', 'Lounge'];

export function EventsScreen({navigation}: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const {savedEventIds, toggleSavedEvent} = useAppState();

  const filteredEvents = useMemo(
    () => (activeFilter === 'All' ? events : events.filter(item => item.category === activeFilter)),
    [activeFilter],
  );

  return (
    <BackgroundScreen image={images.loaderBackground}>
      <SectionTitle
        eyebrow="SEPT 28, 2026"
        title="Opening Events"
        right={
          <Pressable onPress={() => navigation.navigate('SavedEvents')}>
            <Text style={styles.savedLink}>🔖 {savedEventIds.length || ''}</Text>
          </Pressable>
        }
      />
      <View style={styles.filters}>
        {filters.map(filter => (
          <Pill key={filter} label={filter} active={filter === activeFilter} onPress={() => setActiveFilter(filter)} />
        ))}
      </View>
      {filteredEvents.map(item => {
        const saved = savedEventIds.includes(item.id);
        return (
          <Card key={item.id} style={[styles.eventCard, {borderLeftColor: item.accent}]}>
            <Image source={item.image} style={styles.eventImage} />
            <View style={styles.rowBetween}>
              <View style={styles.badgeRow}>
                <View style={[styles.badge, {backgroundColor: `${item.accent}26`}]}><Text style={[styles.badgeText, {color: item.accent}]}>{item.category}</Text></View>
                <View style={styles.badgeDark}><Text style={styles.badgeDarkText}>{item.status}</Text></View>
              </View>
              <Pressable onPress={() => toggleSavedEvent(item.id)}>
                <Text style={styles.saveIcon}>{saved ? '🔖' : '📑'}</Text>
              </Pressable>
            </View>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventMeta}>{item.time} · {item.venue}</Text>
            <Text style={styles.eventDescription}>{item.shortDescription}</Text>
            <Pressable onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}>
              <Text style={styles.detailsLink}>View Details →</Text>
            </Pressable>
          </Card>
        );
      })}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  savedLink: {
    color: colors.accent,
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  eventCard: {
    borderLeftWidth: 3,
    padding: 0,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 170,
    marginBottom: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  badgeDark: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeDarkText: {
    color: colors.text,
    fontSize: 11,
  },
  saveIcon: {
    fontSize: 18,
  },
  eventTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  eventMeta: {
    color: colors.muted,
    marginTop: 6,
    paddingHorizontal: 16,
  },
  eventDescription: {
    color: '#A4B1C9',
    lineHeight: 22,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  detailsLink: {
    color: colors.accent,
    marginTop: 14,
    marginBottom: 16,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
});
