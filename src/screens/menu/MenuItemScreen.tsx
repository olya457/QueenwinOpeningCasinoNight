import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, PrimaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {menuItems} from '../../data/menu';
import {useAppState} from '../../store/AppContext';

export function MenuItemScreen({route}: any) {
  const item = menuItems.find(entry => entry.id === route.params.itemId);
  const [count, setCount] = useState(1);
  const {addToCart, cart} = useAppState();
  if (!item) {
    return null;
  }

  const cartQuantity = cart[item.id] || 0;

  return (
    <BackgroundScreen contentContainerStyle={styles.scrollContent}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.tags}>
          <View style={styles.tag}><Text style={styles.tagText}>{item.category}</Text></View>
          {item.tags.map(tag => (
            <View key={tag} style={styles.tagGreen}><Text style={styles.tagGreenText}>{tag}</Text></View>
          ))}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>€{item.price}</Text>
        {cartQuantity > 0 ? (
          <View style={styles.savedBadge}>
            <Text style={styles.savedBadgeText}>Saved in order · {cartQuantity}</Text>
          </View>
        ) : null}
        <Text style={styles.description}>{item.description}</Text>
        <Card style={styles.infoCard}><Text style={styles.label}>Ingredients</Text><Text style={styles.value}>{item.ingredients}</Text></Card>
        <Card style={styles.infoCard}><Text style={styles.label}>Allergens</Text><Text style={styles.value}>{item.allergens}</Text></Card>
        <Card style={styles.infoCard}><Text style={styles.label}>Serving</Text><Text style={styles.value}>{item.serving}</Text></Card>
        <Card style={styles.quantityCard}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityControls}>
            <Pressable onPress={() => setCount(current => Math.max(1, current - 1))} style={styles.qtyButton}><Text style={styles.qtyText}>−</Text></Pressable>
            <Text style={styles.count}>{count}</Text>
            <Pressable onPress={() => setCount(current => current + 1)} style={styles.qtyButton}><Text style={styles.qtyText}>+</Text></Pressable>
          </View>
        </Card>
        <PrimaryButton
          label={cartQuantity > 0 ? `Add ${count} More — €${item.price * count}` : `Add to Order — €${item.price * count}`}
          onPress={() => addToCart(item.id, count)}
        />
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 80,
  },
  image: {
    width: '100%',
    height: 210,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 32,
    gap: 10,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: colors.muted,
    fontSize: 11,
  },
  tagGreen: {
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagGreenText: {
    color: colors.accent,
    fontSize: 11,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
  },
  price: {
    color: colors.accent,
    fontSize: 24,
    fontWeight: '800',
  },
  savedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(44,245,155,0.24)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  savedBadgeText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    lineHeight: 24,
    marginBottom: 6,
  },
  infoCard: {
    flexDirection: 'row',
    gap: 14,
  },
  label: {
    color: colors.muted,
    width: 82,
  },
  value: {
    color: colors.text,
    flex: 1,
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityLabel: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: colors.text,
    fontSize: 18,
  },
  count: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
});
