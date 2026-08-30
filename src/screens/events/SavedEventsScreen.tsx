import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {BackgroundScreen, Card} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';
import {events} from '../../data/events';
import {useAppState} from '../../store/AppContext';

export function SavedEventsScreen({navigation}: any) {
  const {savedEventIds} = useAppState();
  const savedEvents = events.filter(item => savedEventIds.includes(item.id));

  return (
    <BackgroundScreen image={images.loaderBackground}>
      {savedEvents.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🔖</Text>
          <Text style={styles.emptyTitle}>No Saved Events</Text>
          <Text style={styles.emptyText}>Tap the bookmark icon on any event to save it here for quick access.</Text>
        </Card>
      ) : (
        savedEvents.map(item => (
          <Card key={item.id}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemMeta}>{item.time}</Text>
            <Text style={styles.itemMeta}>{item.venue}</Text>
            <Pressable onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}>
              <Text style={styles.link}>Open Details →</Text>
            </Pressable>
          </Card>
        ))
      )}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    minHeight: 240,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyIcon: {
    fontSize: 42,
    opacity: 0.65,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 22,
  },
  itemTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
  itemMeta: {
    color: colors.muted,
    marginTop: 2,
  },
  link: {
    color: colors.accent,
    marginTop: 12,
  },
});
