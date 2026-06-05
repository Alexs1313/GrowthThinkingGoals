import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GrowthThnOnboardingPrimaryButton} from '../growthThnCpnnts/GrowthThnOnboardingPrimaryButton';
import {GrowthThnOnboardingProgressBar} from '../growthThnCpnnts/GrowthThnOnboardingProgressBar';
import {growthThnOnboardingSteps} from '../growthThnData/GrowthThnOnboardingSteps';
import type {GrowthThnRootStackParamList} from '../growthThnNav/GrowthThnTypes';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';
import {GrowthThnBackgroundLayout} from '../growthThnCpnnts/GrowthThnBackgroundLayout';

export function GrowthThnOnboardingScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnRootStackParamList>>();
  const insets = useSafeAreaInsets();
  const [growthThnStepIndex, setGrowthThnStepIndex] = useState(0);

  const growthThnStep = growthThnOnboardingSteps[growthThnStepIndex];
  const growthThnIsLastStep =
    growthThnStepIndex === growthThnOnboardingSteps.length - 1;

  const growthThnFinishOnboarding = useCallback(() => {
    navigation.replace('MercuryPath');
  }, [navigation]);

  const growthThnHandlePrimary = useCallback(() => {
    if (growthThnIsLastStep) {
      growthThnFinishOnboarding();
      return;
    }
    setGrowthThnStepIndex(prev => prev + 1);
  }, [growthThnFinishOnboarding, growthThnIsLastStep]);

  const growthThnHandleSkip = useCallback(() => {
    growthThnFinishOnboarding();
  }, [growthThnFinishOnboarding]);

  return (
    <GrowthThnBackgroundLayout contentContainerStyle={styles.growthThnInner}>
      <View style={[styles.growthThnInner]}>
        <View style={styles.growthThnHeader}>
          <GrowthThnOnboardingProgressBar activeIndex={growthThnStepIndex} />
          <Pressable onPress={growthThnHandleSkip} hitSlop={12}>
            <Text style={styles.growthThnSkip}>Skip</Text>
          </Pressable>
        </View>

        <View style={styles.growthThnArtArea}>
          <Image source={growthThnStep.illustration} resizeMode="contain" />
        </View>

        <View style={styles.growthThnFooter}>
          <Text style={styles.growthThnTitle}>{growthThnStep.title}</Text>
          <Text style={styles.growthThnDescription}>
            {growthThnStep.description}
          </Text>
          <GrowthThnOnboardingPrimaryButton
            label={growthThnStep.primaryLabel}
            onPress={growthThnHandlePrimary}
          />
        </View>
      </View>
    </GrowthThnBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: growthThnColors.background,
  },
  growthThnInner: {
    flex: 1,
    paddingBottom: 20,
  },
  growthThnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 44,
    marginBottom: 8,
  },
  growthThnSkip: {
    color: growthThnColors.textMutedDark,
    fontSize: 13,
    fontWeight: '500',
  },
  growthThnArtArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  growthThnIllustration: {
    width: '100%',
    maxWidth: 320,
    height: '100%',
    maxHeight: 360,
  },
  growthThnFooter: {
    paddingHorizontal: 8,
    paddingBottom: 24,
    gap: 12,
  },
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
  },
  growthThnDescription: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
});
