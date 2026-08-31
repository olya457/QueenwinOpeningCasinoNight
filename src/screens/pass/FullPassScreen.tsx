import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, PrimaryButton, SecondaryButton} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';

export function FullPassScreen({navigation}: any) {
  return (
    <BackgroundScreen image={images.loaderBackground} contentContainerStyle={styles.content}>
      <Card style={styles.notice}>
        <Text style={styles.noticeText}>Your app welcome reward is ready to use during direct hotel booking.</Text>
      </Card>
      <Card style={styles.promoCard}>
        <Text style={styles.brand}>QUEENWIN</Text>
        <Text style={styles.title}>Welcome Night Pass</Text>
        <Text style={styles.discount}>10% OFF</Text>
        <Text style={styles.description}>
          Thank you for downloading the Queenwin app. You have unlocked a special accommodation discount for your hotel stay.
        </Text>
        <View style={styles.codeWrap}>
          <Text style={styles.codeLabel}>PROMO CODE</Text>
          <Text style={styles.codeValue}>QUEENWIN10</Text>
        </View>
        <View style={styles.grid}>
          <InfoBox label="APPLIES TO" value="Hotel Stay" />
          <InfoBox label="BOOKING TYPE" value="Direct Booking" />
          <InfoBox label="DISCOUNT" value="10%" />
          <InfoBox label="REWARD" value="App Download" />
        </View>
        <View style={styles.validity}>
          <Text style={styles.validityText}>Use during booking and show the app if requested by staff.</Text>
        </View>
      </Card>
      <View style={styles.buttons}>
        <View style={{flex: 1}}><SecondaryButton label="Entry Rules" onPress={() => navigation.navigate('EntryRules')} /></View>
        <View style={{flex: 1}}><PrimaryButton label="Guest Help" onPress={() => navigation.navigate('GuestHelp')} /></View>
      </View>
    </BackgroundScreen>
  );
}

function InfoBox({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    backgroundColor: 'rgba(19,68,55,0.54)',
    borderColor: 'rgba(44,245,155,0.24)',
  },
  content: {
    paddingBottom: 188,
  },
  noticeText: {
    color: colors.accent,
    textAlign: 'center',
    fontSize: 15,
  },
  promoCard: {
    backgroundColor: 'rgba(40,24,66,0.94)',
    borderColor: 'rgba(126,89,255,0.32)',
    gap: 16,
    marginBottom: 18,
  },
  brand: {
    color: colors.muted,
    textAlign: 'center',
    letterSpacing: 4,
    fontSize: 12,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 28,
  },
  discount: {
    color: colors.accent,
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 42,
  },
  description: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  codeWrap: {
    borderRadius: 18,
    paddingVertical: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  codeLabel: {
    color: colors.muted,
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 2,
  },
  codeValue: {
    color: colors.text,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoBox: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    gap: 6,
    marginBottom: 10,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  infoValue: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 15,
  },
  validity: {
    backgroundColor: 'rgba(21,76,60,0.55)',
    borderRadius: 12,
    padding: 12,
  },
  validityText: {
    color: colors.accent,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
    marginBottom: 24,
  },
});
