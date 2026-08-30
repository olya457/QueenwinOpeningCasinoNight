import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, Input, PrimaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {menuItems} from '../../data/menu';
import {useAppState} from '../../store/AppContext';

export function OrderRequestScreen({navigation}: any) {
  const {cart, updateCartItem, submitRequest, clearCart} = useAppState();
  const [note, setNote] = useState('');
  const orderItems = useMemo(
    () => menuItems.filter(item => cart[item.id]).map(item => ({...item, quantity: cart[item.id]})),
    [cart],
  );
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BackgroundScreen>
      <Card style={styles.notice}>
        <Text style={styles.noticeText}>This is a request sent to the venue for confirmation, not an automatically confirmed order.</Text>
      </Card>
      {orderItems.map(item => (
        <Card key={item.id} style={styles.orderRow}>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemMeta}>{item.category} · €{item.price} each</Text>
          </View>
          <View style={styles.counter}>
            <Pressable onPress={() => updateCartItem(item.id, item.quantity - 1)}><Text style={styles.counterButton}>−</Text></Pressable>
            <Text style={styles.count}>{item.quantity}</Text>
            <Pressable onPress={() => updateCartItem(item.id, item.quantity + 1)}><Text style={styles.counterButton}>+</Text></Pressable>
          </View>
          <Text style={styles.lineTotal}>€{item.price * item.quantity}</Text>
        </Card>
      ))}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>€{total}</Text>
      </View>
      <Input label="Table or Location Note" value={note} onChangeText={setNote} placeholder="e.g. Table 7 or Terrace seating" />
      <PrimaryButton
        label={`Send Order Request · €${total}`}
        onPress={() => {
          submitRequest({kind: 'order', title: 'Order Submitted', subtitle: `€${total}`});
          clearCart();
          navigation.replace('OrderSuccess', {total});
        }}
        disabled={orderItems.length === 0}
      />
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  notice: {
    backgroundColor: 'rgba(74,60,23,0.35)',
    borderColor: 'rgba(240,195,89,0.22)',
  },
  noticeText: {
    color: '#F0C359',
    lineHeight: 22,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
  itemMeta: {
    color: colors.muted,
    marginTop: 4,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterButton: {
    color: colors.accent,
    fontSize: 24,
    width: 20,
    textAlign: 'center',
  },
  count: {
    color: colors.text,
    fontWeight: '700',
    minWidth: 16,
    textAlign: 'center',
  },
  lineTotal: {
    color: colors.text,
    fontWeight: '700',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  totalValue: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '800',
  },
});
