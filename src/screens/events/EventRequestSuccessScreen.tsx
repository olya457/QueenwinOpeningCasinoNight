import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, SecondaryButton} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';
import {useAppState} from '../../store/AppContext';

export function EventRequestSuccessScreen({navigation}: any) {
  const {lastRequest} = useAppState();

  return (
    <BackgroundScreen image={images.loaderBackground} contentContainerStyle={styles.content}>
      <View style={styles.check}><Text style={styles.checkMark}>✓</Text></View>
      <Text style={styles.title}>Request Sent!</Text>
      <Text style={styles.text}>Your request for {lastRequest?.title || 'the event'} has been submitted. Our team will confirm your attendance shortly.</Text>
      <SecondaryButton label="Back to Details" onPress={() => navigation.popToTop()} />
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
});
