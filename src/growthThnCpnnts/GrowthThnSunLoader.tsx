import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_DOT_SIZE = 20;
const GROWTH_THN_DOT_GAP = 6;
const GROWTH_THN_SPINNER_SIZE = 100;
const GROWTH_THN_FADE_MS = 1000;
const GROWTH_THN_DOT_DELAYS = [0, 330, 660];

function GrowthThnDot({delay}: {delay: number}) {
  const growthThnOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const growthThnFade = Animated.loop(
      Animated.sequence([
        Animated.timing(growthThnOpacity, {
          toValue: 0,
          duration: GROWTH_THN_FADE_MS * 0.6,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(growthThnOpacity, {
          toValue: 1,
          duration: GROWTH_THN_FADE_MS * 0.4,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const growthThnTimeout = setTimeout(() => {
      growthThnFade.start();
    }, delay);

    return () => {
      clearTimeout(growthThnTimeout);
      growthThnFade.stop();
    };
  }, [delay, growthThnOpacity]);

  return (
    <Animated.View
      style={[styles.growthThnDot, {opacity: growthThnOpacity}]}
    />
  );
}

export function GrowthThnSunLoader() {
  return (
    <View style={styles.growthThnSpinner}>
      {GROWTH_THN_DOT_DELAYS.map((delay, index) => (
        <GrowthThnDot key={`growth-thn-dot-${index}`} delay={delay} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnSpinner: {
    width: GROWTH_THN_SPINNER_SIZE,
    height: GROWTH_THN_SPINNER_SIZE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: GROWTH_THN_DOT_GAP,
  },
  growthThnDot: {
    width: GROWTH_THN_DOT_SIZE,
    height: GROWTH_THN_DOT_SIZE,
    borderRadius: GROWTH_THN_DOT_SIZE / 2,
    backgroundColor: growthThnColors.accent,
  },
});
