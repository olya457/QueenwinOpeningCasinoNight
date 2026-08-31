import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, PrimaryButton, SecondaryButton, SectionTitle} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';

export function PassHomeScreen({navigation}: any) {
  const [promoVisible, setPromoVisible] = useState(false);

  return (
    <>
      <BackgroundScreen image={images.loaderBackground}>
        <SectionTitle eyebrow="OPENING NIGHT" title="Welcome Night Pass" />
        <Card style={styles.heroCard}>
          <View style={styles.badges}>
            <View style={styles.goldBadge}><Text style={styles.goldBadgeText}>App Welcome Benefit</Text></View>
            <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>Available</Text></View>
          </View>
          <Text style={styles.heroTitle}>Welcome Night Pass</Text>
          <Text style={styles.heroText}>
            Install the app and unlock a special welcome reward for your future hotel stay, plus quick access to events, services, menu, parking, and offers.
          </Text>
          <View style={styles.infoPanel}>
            <InfoButton label="BENEFIT" value="10% Hotel Discount" onPress={() => setPromoVisible(true)} />
            <InfoButton label="FORMAT" value="Promo Code" onPress={() => navigation.navigate('FullPass')} />
            <InfoButton label="ACCESS" value="Instant in App" onPress={() => navigation.navigate('GuestHelp')} />
            <InfoButton label="REWARD" value="App Download" onPress={() => setPromoVisible(true)} />
          </View>
          <View style={styles.buttonRow}>
            <View style={{flex: 1}}><PrimaryButton label="Get Promo Code" onPress={() => setPromoVisible(true)} /></View>
            <View style={{flex: 1}}><SecondaryButton label="View Details" onPress={() => navigation.navigate('FullPass')} /></View>
          </View>
          <View style={styles.buttonRow}>
            <View style={{flex: 1}}><SecondaryButton label="Entry Rules" onPress={() => navigation.navigate('EntryRules')} /></View>
            <View style={{flex: 1}}><SecondaryButton label="Guest Help" onPress={() => navigation.navigate('GuestHelp')} /></View>
          </View>
        </Card>
        <Card>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Opening Night Schedule</Text>
            <View style={styles.todayBadge}><Text style={styles.todayBadgeText}>Tonight</Text></View>
          </View>
          {[
            ['6:00 PM', 'Welcome Cocktail Reception', 'Lobby Lounge'],
            ['7:00 PM', 'Grand Opening Ceremony', 'Grand Ballroom'],
            ['9:00 PM', 'Main Event Opening', 'Main Hall'],
            ['12:00 AM', 'Midnight Champagne Toast', 'Grand Ballroom'],
          ].map(item => (
            <View key={item[0]} style={styles.scheduleRow}>
              <Text style={styles.time}>{item[0]}</Text>
              <View style={{flex: 1}}>
                <Text style={[styles.scheduleTitle, item[1] === 'Grand Opening Ceremony' && {color: colors.accent}]}>{item[1]}</Text>
                <Text style={styles.schedulePlace}>{item[2]}</Text>
              </View>
            </View>
          ))}
        </Card>
        <Card style={styles.helpCard}>
          <Text style={styles.cardTitle}>Guest Help</Text>
          <Text style={styles.helpText}>Need help with entry, event timing, menu orders, service requests, parking, or offers?</Text>
          <PrimaryButton label="Start Help Chat" onPress={() => navigation.navigate('GuestHelp')} />
        </Card>
      </BackgroundScreen>

      <Modal transparent visible={promoVisible} animationType="fade" onRequestClose={() => setPromoVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEyebrow}>THANK YOU FOR INSTALLING</Text>
            <Text style={styles.modalTitle}>10% Off Hotel Stay</Text>
            <Text style={styles.modalText}>
              Use this promo code when booking your Queenwin hotel stay and receive a 10% discount as an app welcome reward.
            </Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>QUEENWIN10</Text>
            </View>
            <Text style={styles.modalNote}>Valid for direct hotel bookings and subject to availability.</Text>
            <PrimaryButton label="Got It" onPress={() => setPromoVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}

function InfoButton({label, value, onPress}: {label: string; value: string; onPress: () => void}) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.infoBox, pressed && styles.infoBoxPressed]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderColor: 'rgba(126,89,255,0.35)',
    backgroundColor: 'rgba(32,23,54,0.86)',
  },
  badges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  goldBadge: {
    backgroundColor: 'rgba(240,195,89,0.16)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  goldBadgeText: {
    color: '#F0C359',
    fontSize: 12,
    fontWeight: '600',
  },
  activeBadge: {
    backgroundColor: 'rgba(44,245,155,0.13)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeBadgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 28,
  },
  heroText: {
    color: colors.muted,
    marginTop: 10,
    lineHeight: 23,
  },
  infoPanel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 18,
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
  infoBoxPressed: {
    opacity: 0.8,
    borderColor: 'rgba(44,245,155,0.28)',
    backgroundColor: 'rgba(44,245,155,0.1)',
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
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
  todayBadge: {
    backgroundColor: 'rgba(240,195,89,0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  todayBadgeText: {
    color: '#F0C359',
    fontSize: 12,
  },
  scheduleRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  time: {
    color: colors.muted,
    width: 56,
  },
  scheduleTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  schedulePlace: {
    color: colors.muted,
    marginTop: 2,
  },
  helpCard: {
    backgroundColor: 'rgba(31,27,61,0.88)',
  },
  helpText: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4,10,20,0.72)',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  modalCard: {
    backgroundColor: '#121C2E',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(126,89,255,0.24)',
    padding: 22,
  },
  modalEyebrow: {
    color: colors.accent,
    letterSpacing: 2.5,
    fontSize: 11,
    fontWeight: '700',
  },
  modalTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 12,
  },
  modalText: {
    color: colors.muted,
    marginTop: 10,
    lineHeight: 23,
  },
  codeBox: {
    marginTop: 18,
    marginBottom: 12,
    borderRadius: 18,
    paddingVertical: 18,
    backgroundColor: 'rgba(44,245,155,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(44,245,155,0.24)',
  },
  codeText: {
    color: colors.accent,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
  },
  modalNote: {
    color: colors.muted,
    marginBottom: 18,
    lineHeight: 21,
  },
});
