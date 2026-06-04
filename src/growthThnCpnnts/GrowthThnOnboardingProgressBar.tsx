import React from 'react';
import {StyleSheet, View} from 'react-native';

import {growthThnColors, growthThnMetrics} from '../growthThnThm/GrowthThnTheme';

type GrowthThnOnboardingProgressBarProps = {
  activeIndex: number;
  total?: number;
};

export function GrowthThnOnboardingProgressBar({
  activeIndex,
  total = growthThnMetrics.onboardingSteps,
}: GrowthThnOnboardingProgressBarProps) {
  return (
    <View style={styles.growthThnRow}>
      {Array.from({length: total}).map((_, index) => (
        <View
          key={`growth-thn-progress-${index}`}
          style={[
            styles.growthThnSegment,
            index === activeIndex && styles.growthThnSegmentActive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  growthThnSegment: {
    width: 8,
    height: 4,
    borderRadius: 4,
    backgroundColor: growthThnColors.progressInactive,
  },
  growthThnSegmentActive: {
    width: 24,
    backgroundColor: growthThnColors.progressActive,
  },
});
