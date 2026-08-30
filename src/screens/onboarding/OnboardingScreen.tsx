import React, {useState} from 'react';
import {Dimensions, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {PrimaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {onboardingSlides} from '../../data/onboarding';
import {useAppState} from '../../store/AppContext';

export function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const {completeOnboarding} = useAppState();
  const slide = onboardingSlides[index];

  const next = () => {
    if (index === onboardingSlides.length - 1) {
      completeOnboarding();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <ImageBackground source={slide.image} style={styles.screen} resizeMode="cover">
      <View style={styles.content}>
        <Pressable onPress={completeOnboarding} style={styles.skip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>{slide.eyebrow}</Text>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.pagination}>
            {onboardingSlides.map((item, itemIndex) => (
              <View key={item.id} style={[styles.dot, itemIndex === index && styles.dotActive]} />
            ))}
          </View>
          <PrimaryButton label={index === onboardingSlides.length - 1 ? 'Get Started' : 'Continue'} onPress={next} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 88,
    justifyContent: 'space-between',
  },
  skip: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  skipText: {
    color: colors.muted,
    fontSize: 16,
  },
  copy: {
    marginTop: Dimensions.get('window').height * 0.24,
    transform: [{translateY: -80}],
    alignItems: 'center',
    gap: 14,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 14,
    letterSpacing: 3,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    color: '#A8B1C7',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 320,
  },
  bottom: {
    gap: 22,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    width: 26,
    backgroundColor: colors.accent,
  },
});
