import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, SecondaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';

export function OrderSuccessScreen({route, navigation}: any) {
  return (
    <BackgroundScreen contentContainerStyle={styles.content}>
      <View style={styles.check}><Text style={styles.checkMark}>✓</Text></View>
      <Text style={styles.title}>Order Submitted!</Text>
      <Text style={styles.text}>Your order request has been sent to the venue team. They will confirm your order before preparation begins.</Text>
      <Text style={styles.total}>Total: €{route.params?.total || 0}</Text>
      <SecondaryButton label="Back to Menu" onPress={() => navigation.popToTop()} />
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  check: {
    width: 70,
    height: 70,
    borderRadius: 999,
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(44,245,155,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: colors.accent,
    fontSize: 32,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
  },
  text: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  total: {
    color: colors.text,
    fontWeight: '700',
  },
});
