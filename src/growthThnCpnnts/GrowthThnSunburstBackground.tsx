import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_RAY_COUNT = 12;

export function GrowthThnSunburstBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={[
          growthThnColors.backgroundGradientStart,
          growthThnColors.backgroundGradientEnd,
        ]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.growthThnOverlay} />
      {Array.from({length: GROWTH_THN_RAY_COUNT}).map((_, index) => (
        <View
          key={`growth-thn-burst-${index}`}
          style={[
            styles.growthThnBurstRay,
            {transform: [{rotate: `${index * (360 / GROWTH_THN_RAY_COUNT)}deg`}]},
          ]}
        />
      ))}
      <View style={styles.growthThnCornerSun}>
        <View style={styles.growthThnCornerSunCore} />
        {Array.from({length: 8}).map((_, index) => (
          <View
            key={`growth-thn-corner-ray-${index}`}
            style={[
              styles.growthThnCornerRay,
              {transform: [{rotate: `${index * 45}deg`}]},
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: growthThnColors.panelStrong,
  },
  growthThnBurstRay: {
    position: 'absolute',
    top: -120,
    left: -40,
    width: 220,
    height: 900,
    backgroundColor: 'rgba(90, 25, 25, 0.18)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 120,
  },
  growthThnCornerSun: {
    position: 'absolute',
    top: -90,
    left: -90,
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnCornerSunCore: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#c9a227',
  },
  growthThnCornerRay: {
    position: 'absolute',
    width: 28,
    height: 56,
    backgroundColor: '#a8841f',
    borderRadius: 4,
    top: -8,
  },
});
