import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useGrowthThnHabits} from '../growthThnCtx/GrowthThnHabitsContext';
import type {GrowthThnHabitsStackParamList} from '../growthThnNav/GrowthThnHabitsStackTypes';
import {
  growthThnFormatHabitsTodayShareMessage,
  growthThnFormatRepeatDaysBullet,
  growthThnFormatTodayHeading,
  growthThnGetCurrentWeek,
  growthThnGetTodayProgress,
} from '../growthThnUtil/GrowthThnHabitUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnHabitsHomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnHabitsStackParamList>>();
  const insets = useSafeAreaInsets();
  const {habits, growthThnToggleHabitDoneToday} = useGrowthThnHabits();

  const growthThnWeek = useMemo(() => growthThnGetCurrentWeek(), []);
  const growthThnProgress = useMemo(
    () => growthThnGetTodayProgress(habits),
    [habits],
  );

  const growthThnMotivation =
    growthThnProgress.total === 0
      ? "Let's get started!"
      : growthThnProgress.percent === 100
      ? 'Great job today!'
      : 'Keep going!';

  const growthThnOnShare = async () => {
    try {
      await Share.share({
        message: growthThnFormatHabitsTodayShareMessage(
          growthThnProgress,
          growthThnMotivation,
        ),
      });
    } catch {
   
    }
  };

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
        <View style={styles.growthThnHeaderRow}>
          <View style={styles.growthThnHeaderText}>
            <Text style={styles.growthThnTitle}>Today's Growth</Text>
            <Text style={styles.growthThnSubtitle}>
              Small actions build stronger days.
            </Text>
          </View>
          <Pressable
            onPress={growthThnOnShare}
            style={styles.growthThnShare}
            accessibilityRole="button"
            accessibilityLabel="Share today's habits">
            <Image source={require('../growthThnAssts/share.png')} />
          </Pressable>
        </View>

        <View style={styles.growthThnCard}>
          <Text style={styles.growthThnCardLabel}>THIS WEEK</Text>
          <View style={styles.growthThnWeekRow}>
            {growthThnWeek.map(day => (
              <View
                key={`growth-thn-week-${day.dayIndex}`}
                style={styles.growthThnWeekCell}>
                <Text
                  style={[
                    styles.growthThnWeekDay,
                    day.isToday && styles.growthThnWeekDayToday,
                  ]}>
                  {day.label}
                </Text>
                <View
                  style={[
                    styles.growthThnWeekDateWrap,
                    day.isToday && styles.growthThnWeekDateToday,
                  ]}>
                  <Text
                    style={[
                      styles.growthThnWeekDate,
                      day.isToday && styles.growthThnWeekDateTextToday,
                    ]}>
                    {day.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.growthThnCard}>
          <View style={styles.growthThnProgressRow}>
            <View style={styles.growthThnRing}>
              <Text style={styles.growthThnRingText}>
                {growthThnProgress.percent}%
              </Text>
            </View>
            <View style={styles.growthThnProgressCopy}>
              <Text style={styles.growthThnProgressTitle}>
                {growthThnProgress.done}/{growthThnProgress.total} Habits Done
              </Text>
              <Text style={styles.growthThnProgressSub}>
                {growthThnMotivation}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.growthThnSectionHeader}>
          <Text style={styles.growthThnSectionLabel}>TODAY'S HABITS</Text>
          <Text style={styles.growthThnSectionDate}>
            {growthThnFormatTodayHeading()}
          </Text>
        </View>

        {growthThnProgress.habits.length === 0 ? (
          <View style={styles.growthThnEmptyCard}>
            <Text style={styles.growthThnEmptyText}>
              No habits scheduled for today.
            </Text>
          </View>
        ) : (
          growthThnProgress.habits.map(habit => (
            <Pressable
              key={habit.id}
              onPress={() => growthThnToggleHabitDoneToday(habit.id)}
              style={[
                styles.growthThnHabitCard,
                habit.doneToday && styles.growthThnHabitCardDone,
              ]}>
              <View
                style={[
                  styles.growthThnHabitCheck,
                  habit.doneToday && styles.growthThnHabitCheckDone,
                ]}>
                {habit.doneToday ? (
                  <Text style={styles.growthThnHabitCheckMark}>✓</Text>
                ) : null}
              </View>
              <View style={styles.growthThnHabitBody}>
                <Text style={styles.growthThnHabitTitle}>{habit.title}</Text>
                <Text style={styles.growthThnHabitMeta}>
                  {growthThnFormatRepeatDaysBullet(habit.repeatDays)}
                </Text>
              </View>
              {habit.doneToday ? (
                <Text style={styles.growthThnDoneLabel}>Done ✓</Text>
              ) : null}
            </Pressable>
          ))
        )}

        <Pressable
          style={styles.growthThnAddButton}
          onPress={() => navigation.navigate('CreateHabit')}>
          <LinearGradient
            colors={[growthThnColors.accent, growthThnColors.accentDark]}
            style={styles.growthThnAddGradient}>
            <Text style={styles.growthThnAddText}>+ Add New Habit</Text>
          </LinearGradient>
        </Pressable>

        <Pressable
          style={styles.growthThnAllButton}
          onPress={() => navigation.navigate('AllHabits')}>
          <Text style={styles.growthThnAllIcon}>⌁</Text>
          <Text style={styles.growthThnAllText}>All Habits</Text>
        </Pressable>
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
  growthThnHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  growthThnHeaderText: {flex: 1, gap: 6},
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  growthThnSubtitle: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  growthThnShare: {
    width: 36,
    height: 36,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E1414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnShareIcon: {
    color: growthThnColors.accentGold,
    fontSize: 16,
  },
  growthThnCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
    gap: 12,
  },
  growthThnCardLabel: {
    color: growthThnColors.accentGold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  growthThnWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  growthThnWeekCell: {alignItems: 'center', gap: 6, flex: 1},
  growthThnWeekDay: {
    color: growthThnColors.textMutedDark,
    fontSize: 11,
    fontWeight: '600',
  },
  growthThnWeekDayToday: {color: growthThnColors.accentGold},
  growthThnWeekDateWrap: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnWeekDateToday: {
    borderWidth: 2,
    borderColor: growthThnColors.accent,
  },
  growthThnWeekDate: {
    color: growthThnColors.textMutedDark,
    fontSize: 12,
    fontWeight: '600',
  },
  growthThnWeekDateTextToday: {color: growthThnColors.text},
  growthThnProgressRow: {flexDirection: 'row', alignItems: 'center', gap: 16},
  growthThnRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: growthThnColors.accentOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnRingText: {
    color: growthThnColors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  growthThnProgressCopy: {flex: 1, gap: 4},
  growthThnProgressTitle: {
    color: growthThnColors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  growthThnProgressSub: {
    color: growthThnColors.textMuted,
    fontSize: 14,
  },
  growthThnSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  growthThnSectionLabel: {
    color: growthThnColors.accentGold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  growthThnSectionDate: {
    color: growthThnColors.textMutedDark,
    fontSize: 12,
  },
  growthThnEmptyCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 28,
    alignItems: 'center',
  },
  growthThnEmptyText: {
    color: growthThnColors.textMuted,
    fontSize: 15,
  },
  growthThnHabitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
  },
  growthThnHabitCardDone: {
    backgroundColor: '#2a0c0c',
    borderColor: growthThnColors.borderStrong,
  },
  growthThnHabitCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    backgroundColor: growthThnColors.panelInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnHabitCheckDone: {
    backgroundColor: growthThnColors.accent,
    borderColor: growthThnColors.accent,
  },
  growthThnHabitCheckMark: {
    color: growthThnColors.accentYellow,
    fontSize: 12,
    fontWeight: '700',
  },
  growthThnHabitBody: {flex: 1, gap: 4},
  growthThnHabitTitle: {
    color: growthThnColors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  growthThnHabitMeta: {
    color: growthThnColors.textMutedDark,
    fontSize: 12,
  },
  growthThnDoneLabel: {
    color: growthThnColors.accentGold,
    fontSize: 12,
    fontWeight: '600',
  },
  growthThnAddButton: {borderRadius: 16, overflow: 'hidden', marginTop: 8},
  growthThnAddGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnAddText: {
    color: growthThnColors.accentYellow,
    fontSize: 16,
    fontWeight: '700',
  },
  growthThnAllButton: {
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(46, 20, 20, 1)',
    backgroundColor: growthThnColors.panel,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  growthThnAllIcon: {
    color: growthThnColors.accentGold,
    fontSize: 18,
  },
  growthThnAllText: {
    color: growthThnColors.accentGold,
    fontSize: 16,
    fontWeight: '700',
  },
});
