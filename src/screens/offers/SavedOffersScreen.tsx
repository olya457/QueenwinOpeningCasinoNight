import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {BackgroundScreen, Card} from '../../components/ui';
import {colors} from '../../constants/theme';
import {offers} from '../../data/offers';
import {useAppState} from '../../store/AppContext';

export function SavedOffersScreen() {
  const {savedOfferIds} = useAppState();
  const savedOffers = offers.filter(item => savedOfferIds.includes(item.id));

  return (
    <BackgroundScreen>
      {savedOffers.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>☆</Text>
          <Text style={styles.emptyTitle}>No Saved Offers</Text>
          <Text style={styles.emptyText}>Tap the star icon on any offer to save it for later.</Text>
        </Card>
      ) : (
        savedOffers.map(item => (
          <Card key={item.id}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.validity}</Text>
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
  itemText: {
    color: colors.muted,
    marginTop: 6,
  },
});
