import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../constants/theme';

export function BackgroundScreen({
  children,
  scrollable = true,
  contentContainerStyle,
  image,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  image?: any;
}) {
  const {height} = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;
  const compact = height < 760;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, compact && styles.scrollContentCompact, contentContainerStyle]}
      showsVerticalScrollIndicator={false}>
      <Animated.View style={{opacity, transform: [{translateY}]}}>
        {children}
      </Animated.View>
    </ScrollView>
  ) : (
    <Animated.View
      style={[
        styles.fixedContent,
        compact && styles.fixedContentCompact,
        contentContainerStyle,
        {opacity, transform: [{translateY}]},
      ]}>
      {children}
    </Animated.View>
  );

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.flex}>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.flex}>{content}</SafeAreaView>
    </ImageBackground>
  );
}

export function SectionTitle({eyebrow, title, right}: {eyebrow?: string; title: string; right?: React.ReactNode}) {
  const {height} = useWindowDimensions();
  const compact = height < 760;

  return (
    <View style={styles.sectionHeader}>
      <View style={{flex: 1}}>
        {eyebrow ? <Text style={[styles.eyebrow, compact && styles.eyebrowCompact]}>{eyebrow}</Text> : null}
        <Text style={[styles.title, compact && styles.titleCompact]}>{title}</Text>
      </View>
      {right}
    </View>
  );
}

export function Pill({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  const {height} = useWindowDimensions();
  const compact = height < 760;

  return (
    <Pressable onPress={onPress} style={[styles.pill, compact && styles.pillCompact, active && styles.pillActive]}>
      <Text style={[styles.pillText, compact && styles.pillTextCompact, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Card({children, style}: {children: React.ReactNode; style?: StyleProp<ViewStyle>}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({label, onPress, disabled}: {label: string; onPress: () => void; disabled?: boolean}) {
  const {height} = useWindowDimensions();
  const compact = height < 760;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({pressed}) => [
        styles.primaryButton,
        compact && styles.primaryButtonCompact,
        disabled && styles.disabledButton,
        pressed && styles.primaryButtonPressed,
      ]}>
      <Text style={[styles.primaryButtonText, compact && styles.primaryButtonTextCompact]}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({label, onPress}: {label: string; onPress: () => void}) {
  const {height} = useWindowDimensions();
  const compact = height < 760;

  return (
    <Pressable onPress={onPress} style={[styles.secondaryButton, compact && styles.secondaryButtonCompact]}>
      <Text style={[styles.secondaryButtonText, compact && styles.secondaryButtonTextCompact]}>{label}</Text>
    </Pressable>
  );
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
}) {
  const clearedRef = useRef(false);

  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          if (!clearedRef.current) {
            onChangeText('');
            clearedRef.current = true;
          }
        }}
        placeholder={placeholder}
        placeholderTextColor="#66738D"
        multiline={multiline}
        keyboardType={keyboardType}
        style={[styles.input, multiline && styles.inputMultiline]}
      />
    </View>
  );
}

export function ChoiceGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.choiceGroup}>
        {options.map(option => {
          const active = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={[styles.choiceItem, active && styles.choiceItemActive]}>
              <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: colors.background},
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(4,10,20,0.74)',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 150,
    gap: 16,
  },
  scrollContentCompact: {
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 126,
    gap: 14,
  },
  fixedContent: {
    flex: 1,
    paddingBottom: 32,
  },
  fixedContentCompact: {
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 4,
  },
  eyebrowCompact: {
    fontSize: 10,
    marginBottom: 2,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  titleCompact: {
    fontSize: 16,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  pillCompact: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillActive: {
    backgroundColor: colors.accentSoft,
    borderColor: 'rgba(44,245,155,0.32)',
  },
  pillText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '500',
  },
  pillTextCompact: {
    fontSize: 11,
  },
  pillTextActive: {
    color: colors.accent,
  },
  card: {
    backgroundColor: 'rgba(18,28,46,0.92)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 16,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    minHeight: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 8,
  },
  primaryButtonCompact: {
    minHeight: 50,
    borderRadius: 14,
  },
  disabledButton: {
    opacity: 0.55,
  },
  primaryButtonPressed: {
    opacity: 0.72,
  },
  primaryButtonText: {
    color: '#08101A',
    fontSize: 16,
    fontWeight: '800',
  },
  primaryButtonTextCompact: {
    fontSize: 15,
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  secondaryButtonCompact: {
    minHeight: 46,
    borderRadius: 14,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButtonTextCompact: {
    fontSize: 14,
  },
  inputWrap: {
    gap: 8,
  },
  inputLabel: {
    color: colors.muted,
    fontSize: 12,
  },
  input: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: 14,
  },
  inputMultiline: {
    minHeight: 90,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  choiceGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  choiceItem: {
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  choiceItemActive: {
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderColor: 'rgba(44,245,155,0.24)',
  },
  choiceText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  choiceTextActive: {
    color: colors.accent,
    fontWeight: '700',
  },
});
