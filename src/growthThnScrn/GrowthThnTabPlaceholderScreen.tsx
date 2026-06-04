import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {GrowthThnBackgroundLayout} from '../growthThnCpnnts/GrowthThnBackgroundLayout';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

type GrowthThnTabPlaceholderScreenProps = {
  title: string;
  subtitle: string;
};

export function GrowthThnTabPlaceholderScreen({
  title,
  subtitle,
}: GrowthThnTabPlaceholderScreenProps) {
  return (
    <GrowthThnBackgroundLayout>
      <View style={styles.growthThnRoot}>
        <Text style={styles.growthThnTitle}>{title}</Text>
        <Text style={styles.growthThnSubtitle}>{subtitle}</Text>
      </View>
    </GrowthThnBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  growthThnSubtitle: {
    color: growthThnColors.textMuted,
    fontSize: 16,
    lineHeight: 22,
  },
});
