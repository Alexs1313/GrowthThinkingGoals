import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_CENTER = 64;
const GROWTH_THN_RAY_H = 19;
const GROWTH_THN_RAY_W = 3;
const GROWTH_THN_RAY_DISTANCE = GROWTH_THN_CENTER / 2 + GROWTH_THN_RAY_H / 2 + 2;
const GROWTH_THN_SUN_SIZE = GROWTH_THN_CENTER + GROWTH_THN_RAY_H * 2 + 16;

export function GrowthThnSunLoader() {
  const growthThnSpin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const growthThnLoop = Animated.loop(
      Animated.timing(growthThnSpin, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    growthThnLoop.start();
    return () => growthThnLoop.stop();
  }, [growthThnSpin]);

  const growthThnRotate = growthThnSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const growthThnColor = growthThnSpin.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      growthThnColors.sunYellow,
      growthThnColors.sunOrange,
      growthThnColors.sunYellow,
    ],
  });

  const growthThnRays = Array.from({length: 8}, (_, index) => {
    const growthThnAngle = (index * Math.PI * 2) / 8 - Math.PI / 2;
    return {
      x:
        GROWTH_THN_SUN_SIZE / 2 +
        Math.cos(growthThnAngle) * GROWTH_THN_RAY_DISTANCE -
        GROWTH_THN_RAY_W / 2,
      y:
        GROWTH_THN_SUN_SIZE / 2 +
        Math.sin(growthThnAngle) * GROWTH_THN_RAY_DISTANCE -
        GROWTH_THN_RAY_H / 2,
      rotation: (growthThnAngle * 180) / Math.PI + 90,
    };
  });

  return (
    <View style={styles.growthThnWrap}>
      <Animated.View
        style={[
          styles.growthThnSun,
          {transform: [{rotate: growthThnRotate}]},
        ]}>
        <Animated.View
          style={[
            styles.growthThnCenter,
            {
              left: GROWTH_THN_SUN_SIZE / 2 - GROWTH_THN_CENTER / 2,
              top: GROWTH_THN_SUN_SIZE / 2 - GROWTH_THN_CENTER / 2,
              backgroundColor: growthThnColor,
              shadowColor: growthThnColors.sunYellow,
            },
          ]}
        />
        {growthThnRays.map((ray, index) => (
          <Animated.View
            key={`growth-thn-ray-${index}`}
            style={[
              styles.growthThnRay,
              {
                left: ray.x,
                top: ray.y,
                backgroundColor: growthThnColor,
                shadowColor: growthThnColors.sunYellow,
                transform: [{rotate: `${ray.rotation}deg`}],
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnWrap: {
    width: GROWTH_THN_SUN_SIZE,
    height: GROWTH_THN_SUN_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnSun: {
    width: GROWTH_THN_SUN_SIZE,
    height: GROWTH_THN_SUN_SIZE,
  },
  growthThnCenter: {
    position: 'absolute',
    width: GROWTH_THN_CENTER,
    height: GROWTH_THN_CENTER,
    borderRadius: GROWTH_THN_CENTER / 2,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 8,
  },
  growthThnRay: {
    position: 'absolute',
    width: GROWTH_THN_RAY_W,
    height: GROWTH_THN_RAY_H,
    borderRadius: GROWTH_THN_RAY_W / 2,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 4,
  },
});
