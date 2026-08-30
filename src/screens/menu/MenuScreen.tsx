import React, {useMemo, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, Pill, PrimaryButton, SectionTitle, SecondaryButton} from '../../components/ui';
import {menuItems} from '../../data/menu';
import {colors} from '../../constants/theme';
import {useAppState} from '../../store/AppContext';

const filters = ['All', 'Starters', 'Main Courses', 'Signature Dishes'];

export function MenuScreen({navigation}: any) {
  const [activeFilter, setActiveFilter] = useState('All');
  const {addToCart, cart} = useAppState();
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const filteredItems = useMemo(
    () => (activeFilter === 'All' ? menuItems : menuItems.filter(item => item.category === activeFilter)),
    [activeFilter],
  );

  return (
    <BackgroundScreen>
      <SectionTitle
        eyebrow="OPENING NIGHT"
        title="Menu"
        right={cartCount > 0 ? <View style={styles.counter}><Text style={styles.counterText}>{cartCount} items</Text></View> : null}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}>
        {filters.map(filter => (
          <Pill key={filter} label={filter} active={filter === activeFilter} onPress={() => setActiveFilter(filter)} />
        ))}
      </ScrollView>
      {filteredItems.map(item => {
        const cartQuantity = cart[item.id] || 0;

        return (
          <Card key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.badges}>
              <View style={styles.badgeGroup}>
                <View style={styles.greyBadge}><Text style={styles.greyBadgeText}>{item.category}</Text></View>
                {item.tags.map(tag => (
                  <View key={tag} style={styles.greenBadge}><Text style={styles.greenBadgeText}>{tag}</Text></View>
                ))}
              </View>
              {cartQuantity > 0 ? (
                <View style={styles.addedBadge}>
                  <Text style={styles.addedBadgeText}>Added {cartQuantity}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.actionRow}>
              <Text style={styles.price}>€{item.price}</Text>
              <View style={styles.buttons}>
                <View style={{width: 82}}><SecondaryButton label="Details" onPress={() => navigation.navigate('MenuItem', {itemId: item.id})} /></View>
                <View style={{width: 108}}>
                  <PrimaryButton
                    label={cartQuantity > 0 ? 'Added +1' : '+ Add'}
                    onPress={() => addToCart(item.id)}
                  />
                </View>
              </View>
            </View>
          </Card>
        );
      })}
      {cartCount > 0 ? <PrimaryButton label={`Open Order · ${cartCount}`} onPress={() => navigation.navigate('OrderRequest')} /> : null}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  counter: {
    backgroundColor: 'rgba(44,245,155,0.13)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  counterText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 12,
  },
  filters: {
    flexDirection: 'row',
    gap: 10,
    paddingRight: 8,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  greyBadge: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  greyBadgeText: {
    color: colors.muted,
    fontSize: 11,
  },
  greenBadge: {
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  greenBadgeText: {
    color: colors.accent,
    fontSize: 11,
  },
  addedBadge: {
    marginLeft: 10,
    backgroundColor: 'rgba(44,245,155,0.14)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addedBadgeText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  description: {
    color: colors.muted,
    paddingHorizontal: 14,
    paddingTop: 8,
    lineHeight: 22,
  },
  actionRow: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
});
