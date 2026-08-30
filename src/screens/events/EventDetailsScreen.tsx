import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, PrimaryButton} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';
import {events} from '../../data/events';

export function EventDetailsScreen({route, navigation}: any) {
  const event = events.find(item => item.id === route.params.eventId);
  if (!event) {
    return null;
  }

  return (
    <BackgroundScreen image={images.loaderBackground}>
      <Image source={event.image} style={styles.heroImage} />
      <Card>
        <View style={styles.badge}><Text style={styles.badgeText}>{event.category}</Text></View>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.metaGrid}>
          <Meta label="DATE" value={event.date} />
          <Meta label="TIME" value={event.time} />
          <Meta label="VENUE" value={event.venue} />
          <Meta label="STATUS" value={event.status} />
        </View>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>About this Event</Text>
        <Text style={styles.body}>{event.about}</Text>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Access & Guest Notes</Text>
        {event.notes.map(note => (
          <View key={note} style={styles.noteRow}>
            <Text style={styles.noteDot}>•</Text>
            <Text style={styles.body}>{note}</Text>
          </View>
        ))}
      </Card>
      <PrimaryButton label="Send Request" onPress={() => navigation.navigate('EventRequest', {eventId: event.id})} />
    </BackgroundScreen>
  );
}

function Meta({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.metaCell}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(240,195,89,0.16)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#F0C359',
    fontSize: 11,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
    marginTop: 12,
  },
  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  metaCell: {
    width: '45%',
    gap: 4,
  },
  metaLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  metaValue: {
    color: colors.text,
    fontWeight: '700',
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 17,
  },
  body: {
    color: colors.muted,
    lineHeight: 22,
    flex: 1,
  },
  noteRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  noteDot: {
    color: '#F0C359',
  },
});
