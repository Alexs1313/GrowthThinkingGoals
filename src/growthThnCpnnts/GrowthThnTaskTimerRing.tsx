import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {growthThnFormatTimer} from '../growthThnUtil/GrowthThnTimeUtils';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_RING_SIZE = 200;

type GrowthThnTaskTimerRingProps = {
  elapsedSeconds: number;
  totalSeconds: number;
};

export function GrowthThnTaskTimerRing({
  elapsedSeconds,
  totalSeconds,
}: GrowthThnTaskTimerRingProps) {
  return (
    <View style={styles.growthThnWrap}>
      <Image
        source={require('../growthThnAssts/circle.png')}
        style={styles.growthThnCircle}
        resizeMode="contain"
      />
      <View style={styles.growthThnCenter}>
        <Text style={styles.growthThnElapsed}>
          {growthThnFormatTimer(elapsedSeconds)}
        </Text>
        <Text style={styles.growthThnTotal}>
          / {growthThnFormatTimer(totalSeconds)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnWrap: {
    width: GROWTH_THN_RING_SIZE,
    height: GROWTH_THN_RING_SIZE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  growthThnCircle: {
    position: 'absolute',
  },
  growthThnCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnElapsed: {
    fontSize: 22,
    fontWeight: '700',
    color: growthThnColors.text,
    fontVariant: ['tabular-nums'],
  },
  growthThnTotal: {
    fontSize: 9,
    fontWeight: '400',
    color: growthThnColors.textMuted,
    marginTop: 2,
    fontVariant: ['tabular-nums'],
  },
});
