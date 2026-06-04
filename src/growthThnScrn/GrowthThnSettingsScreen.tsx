import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {GrowthThnBackgroundLayout} from '../growthThnCpnnts/GrowthThnBackgroundLayout';
import {useGrowthThnGoals} from '../growthThnCtx/GrowthThnGoalsContext';
import {growthThnBuildSettingsStats} from '../growthThnUtil/GrowthThnStatsUtils';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnSettingsScreen() {
  const {goals} = useGrowthThnGoals();
  const stats = useMemo(() => growthThnBuildSettingsStats(goals), [goals]);

  return (
    <GrowthThnBackgroundLayout>
      <View style={styles.growthThnRoot}>
        <Text style={styles.growthThnTitle}>Settings</Text>
        <Text style={styles.growthThnSectionLabel}>Statistics</Text>
        <View style={styles.growthThnStatsRow}>
          <View style={styles.growthThnStatCard}>
            <Text style={[styles.growthThnStatValue, styles.growthThnStatValueAccent]}>
              {stats.goalsTotal}
            </Text>
            <Text style={styles.growthThnStatLabel}>Goals</Text>
          </View>
          <View style={styles.growthThnStatCard}>
            <Text style={[styles.growthThnStatValue, styles.growthThnStatValueYellow]}>
              {stats.goalsCompleted}
            </Text>
            <Text style={styles.growthThnStatLabel}>Completed</Text>
          </View>
          <View style={styles.growthThnStatCard}>
            <Text style={[styles.growthThnStatValue, styles.growthThnStatValueMuted]}>
              {stats.goalsActive}
            </Text>
            <Text style={styles.growthThnStatLabel}>Active</Text>
          </View>
        </View>
      </View>
    </GrowthThnBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    gap: 16,
  },
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  growthThnSectionLabel: {
    color: growthThnColors.textMuted,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  growthThnStatsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  growthThnStatCard: {
    flex: 1,
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  growthThnStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  growthThnStatValueAccent: {
    color: growthThnColors.accent,
  },
  growthThnStatValueYellow: {
    color: growthThnColors.accentYellow,
  },
  growthThnStatValueMuted: {
    color: growthThnColors.text,
  },
  growthThnStatLabel: {
    color: growthThnColors.textMuted,
    fontSize: 12,
  },
});
