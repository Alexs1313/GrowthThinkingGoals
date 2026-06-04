import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

type GrowthThnOnboardingPrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export function GrowthThnOnboardingPrimaryButton({
  label,
  onPress,
}: GrowthThnOnboardingPrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.growthThnPressable,
        pressed && styles.growthThnPressed,
      ]}>
      <LinearGradient
        colors={[growthThnColors.accent, growthThnColors.accentDark]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.growthThnButton}>
        <Text style={styles.growthThnLabel}>{label}</Text>
        <Text style={styles.growthThnArrow}>→</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  growthThnPressable: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: growthThnColors.accent,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  growthThnPressed: {
    opacity: 0.92,
  },
  growthThnButton: {
    height: 54,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  growthThnLabel: {
    color: growthThnColors.accentYellow,
    fontSize: 16,
    fontWeight: '700',
  },
  growthThnArrow: {
    color: growthThnColors.accentYellow,
    fontSize: 18,
    fontWeight: '700',
  },
});
