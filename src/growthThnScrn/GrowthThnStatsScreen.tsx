import React, {useCallback, useMemo, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useGrowthThnDisc} from '../growthThnCtx/GrowthThnDiscContext';
import {useGrowthThnHabits} from '../growthThnCtx/GrowthThnHabitsContext';
import {useGrowthThnTasks} from '../growthThnCtx/GrowthThnTasksContext';
import {
  growthThnLoadArticlesReadIds,
  growthThnLoadHabitsCompletedTotal,
} from '../growthThnStrg/GrowthThnStatsStorage';
import {
  growthThnBuildStatsSnapshot,
  growthThnFormatFocusMinutes,
} from '../growthThnUtil/GrowthThnStatsUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type GrowthThnStatCardConfig = {
  icon: string;
  label: string;
  value: string;
  sub?: string;
};

export function GrowthThnStatsScreen() {
  const insets = useSafeAreaInsets();
  const {habits} = useGrowthThnHabits();
  const {completedTasks, totalFocusSeconds, streakDays} = useGrowthThnTasks();
  const {records} = useGrowthThnDisc();

  const [growthThnHabitsCompletedTotal, setGrowthThnHabitsCompletedTotal] =
    useState(0);
  const [growthThnArticlesRead, setGrowthThnArticlesRead] = useState(0);

  const growthThnRefreshStorage = useCallback(() => {
    growthThnLoadHabitsCompletedTotal().then(setGrowthThnHabitsCompletedTotal);
    growthThnLoadArticlesReadIds().then(ids =>
      setGrowthThnArticlesRead(ids.length),
    );
  }, []);

  useFocusEffect(
    useCallback(() => {
      growthThnRefreshStorage();
    }, [growthThnRefreshStorage]),
  );

  const growthThnStats = useMemo(
    () =>
      growthThnBuildStatsSnapshot({
        habits,
        completedTasks,
        totalFocusSeconds,
        taskStreakDays: streakDays,
        habitsCompletedTotal: growthThnHabitsCompletedTotal,
        articlesRead: growthThnArticlesRead,
        discRecords: records,
      }),
    [
      habits,
      completedTasks,
      totalFocusSeconds,
      streakDays,
      growthThnHabitsCompletedTotal,
      growthThnArticlesRead,
      records,
    ],
  );

  const growthThnStatCards: GrowthThnStatCardConfig[] = [
    {
      icon: '🔥',
      label: 'Habit Streak',
      value: `${growthThnStats.habitStreak}d`,
    },
    {
      icon: '🎯',
      label: 'Habits Completed',
      value: String(growthThnStats.habitsCompleted),
    },
    {
      icon: '⚡',
      label: 'Tasks Completed',
      value: String(growthThnStats.tasksCompleted),
    },
    {
      icon: '🕐',
      label: 'Focus Time',
      value: growthThnFormatFocusMinutes(growthThnStats.focusMinutes),
    },
    {
      icon: '📖',
      label: 'Articles Read',
      value: String(growthThnStats.articlesRead),
    },
    {
      icon: '🏆',
      label: 'Logic Records',
      value: String(growthThnStats.logicRecords),
      sub:
        growthThnStats.logicLevelReached !== null
          ? `Level ${growthThnStats.logicLevelReached} reached`
          : undefined,
    },
  ];

  return (
    <View style={styles.growthThnRoot}>
      <LinearGradient
        colors={[
          growthThnColors.backgroundGradientStart,
          growthThnColors.backgroundGradientEnd,
        ]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={[
          styles.growthThnScroll,
          {
            paddingTop: insets.top + 8,
            paddingBottom: insets.bottom + growthThnMetrics.tabHeight + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.growthThnTitle}>Your Growth</Text>
        <Text style={styles.growthThnSubtitle}>
          Track the progress you are building every day.
        </Text>

        <View style={styles.growthThnScoreCard}>
          <View style={styles.growthThnScoreLeft}>
            <LinearGradient
              colors={['#D4900A', '#9A5A00']}
              style={styles.growthThnScoreIcon}>
              <Image source={require('../growthThnAssts/str.png')} />
            </LinearGradient>
            <View style={styles.growthThnScoreCopy}>
              <Text style={styles.growthThnScoreLabel}>GROWTH SCORE</Text>
              <Text style={styles.growthThnScoreValue}>
                {growthThnStats.growthScore}
              </Text>
              <Text style={styles.growthThnScoreRank}>
                {growthThnStats.rank.title}
              </Text>
            </View>
          </View>
          <Image source={require('../growthThnAssts/arrow.png')} />
        </View>

        <View style={styles.growthThnCard}>
          <View style={styles.growthThnWeeklyHeader}>
            <Text style={styles.growthThnCardLabel}>WEEKLY PROGRESS</Text>
            <Text style={styles.growthThnWeeklyPct}>
              {growthThnStats.weeklyPercent}% completion
            </Text>
          </View>
          <View style={styles.growthThnWeekRow}>
            {GROWTH_THN_WEEK_LABELS.map((label, index) => {
              const growthThnPct = growthThnStats.weeklyDayPercents[index] ?? 0;
              const growthThnBarH = Math.max(4, (growthThnPct / 100) * 72);
              return (
                <View
                  key={`growth-thn-week-${label}-${index}`}
                  style={styles.growthThnWeekCell}>
                  <View style={styles.growthThnBarTrack}>
                    <View
                      style={[styles.growthThnBarFill, {height: growthThnBarH}]}
                    />
                  </View>
                  <Text style={styles.growthThnWeekLabel}>{label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.growthThnGrid}>
          {growthThnStatCards.map(card => (
            <View key={card.label} style={styles.growthThnStatCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.growthThnStatIcon}>{card.icon}</Text>
                <Text style={styles.growthThnStatValue}>{card.value}</Text>
              </View>
              <Text style={styles.growthThnStatLabel}>{card.label}</Text>
              {card.sub ? (
                <Text style={styles.growthThnStatSub}>{card.sub}</Text>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {flex: 1},
  growthThnScroll: {
    paddingHorizontal: growthThnMetrics.screenPadding,
    gap: 16,
  },
  growthThnTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnSubtitle: {
    fontSize: 14,
    color: growthThnColors.textMuted,
    marginBottom: 4,
  },
  growthThnScoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
  },
  growthThnScoreLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  growthThnScoreIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: growthThnColors.accentYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnScoreIconText: {
    fontSize: 26,
    color: growthThnColors.accentGoldDark,
  },
  growthThnScoreCopy: {
    gap: 2,
  },
  growthThnScoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: growthThnColors.textMuted,
  },
  growthThnScoreValue: {
    fontSize: 32,
    fontWeight: '800',
    color: growthThnColors.text,
    lineHeight: 36,
  },
  growthThnScoreRank: {
    fontSize: 15,
    fontWeight: '600',
    color: growthThnColors.accentGold,
  },
  growthThnTrend: {
    fontSize: 22,
    fontWeight: '700',
    color: growthThnColors.accentGold,
  },
  growthThnCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
    gap: 16,
  },
  growthThnWeeklyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  growthThnCardLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: growthThnColors.textMuted,
  },
  growthThnWeeklyPct: {
    fontSize: 12,
    fontWeight: '600',
    color: growthThnColors.textMutedDark,
  },
  growthThnWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 6,
  },
  growthThnWeekCell: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  growthThnBarTrack: {
    width: '100%',
    height: 72,
    borderRadius: 6,
    backgroundColor: growthThnColors.panelInner,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  growthThnBarFill: {
    width: '100%',
    backgroundColor: '#7A0000',
    borderRadius: 6,
  },
  growthThnWeekLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: growthThnColors.textMutedDark,
  },
  growthThnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  growthThnStatCard: {
    width: '48%',
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 14,
    gap: 4,
    minHeight: 108,
    justifyContent: 'space-between',
  },
  growthThnStatIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  growthThnStatValue: {
    fontSize: 22,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnStatLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: growthThnColors.textMuted,
  },
  growthThnStatSub: {
    fontSize: 11,
    fontWeight: '600',
    color: growthThnColors.accentGold,
    marginTop: 2,
  },
});
