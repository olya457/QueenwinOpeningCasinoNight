import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';

const rules = [
  'A valid pass may be requested by guest service staff at any entry point.',
  'Smart elegant dress code is recommended for all opening night guests.',
  'Guests should arrive before the main opening show at 8:00 PM.',
  'Service requests are prepared and confirmed by the venue team.',
  'Parking requests require selecting an available parking space in the app.',
  'Menu orders are submitted for venue confirmation before preparation.',
  'Guests should follow venue staff instructions during all opening night activities.',
];

export function EntryRulesScreen() {
  return (
    <BackgroundScreen image={images.loaderBackground}>
      <Text style={styles.subtitle}>Please review these guidelines before your arrival for Welcome Night Pass.</Text>
      {rules.map((rule, index) => (
        <Card key={rule}>
          <View style={styles.ruleRow}>
            <View style={styles.ruleIcon}><Text style={styles.ruleIconText}>{['✦', '⬡', '◉', '◐', '◎', '◑', '●'][index]}</Text></View>
            <Text style={styles.ruleText}>{rule}</Text>
          </View>
        </Card>
      ))}
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    color: colors.muted,
    lineHeight: 22,
  },
  ruleRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  ruleIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(44,245,155,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleIconText: {
    color: colors.accent,
    fontSize: 16,
  },
  ruleText: {
    color: colors.text,
    flex: 1,
    lineHeight: 24,
    fontSize: 16,
  },
});
