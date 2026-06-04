import React, {useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GrowthThnDeleteHabitModal} from '../growthThnCpnnts/GrowthThnDeleteHabitModal';
import {useGrowthThnHabits} from '../growthThnCtx/GrowthThnHabitsContext';
import type {GrowthThnHabitsStackParamList} from '../growthThnNav/GrowthThnHabitsStackTypes';
import {growthThnFormatRepeatDaysBullet} from '../growthThnUtil/GrowthThnHabitUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnAllHabitsScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnHabitsStackParamList>>();
  const insets = useSafeAreaInsets();
  const {habits, growthThnDeleteHabit} = useGrowthThnHabits();

  const [growthThnDeleteId, setGrowthThnDeleteId] = useState<string | null>(
    null,
  );

  const growthThnConfirmDelete = () => {
    if (growthThnDeleteId) {
      growthThnDeleteHabit(growthThnDeleteId);
      setGrowthThnDeleteId(null);
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
          {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24},
        ]}
        showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.growthThnBack}>
          <Text style={styles.growthThnBackText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.growthThnTitle}>All Habits</Text>
        <Text style={styles.growthThnSubtitle}>
          {habits.length} habit{habits.length === 1 ? '' : 's'} tracked
        </Text>

        {habits.length === 0 ? (
          <View style={styles.growthThnEmptyCard}>
            <Text style={styles.growthThnEmptyIcon}>🌱</Text>
            <Text style={styles.growthThnEmptyText}>
              No habits yet. Add your first one!
            </Text>
          </View>
        ) : (
          habits.map(habit => (
            <View key={habit.id} style={styles.growthThnCard}>
              <View style={styles.growthThnCardTop}>
                <View style={styles.growthThnCardTitleBlock}>
                  <Text style={styles.growthThnCardTitle}>{habit.title}</Text>
                  <Text style={styles.growthThnCardMeta}>
                    {growthThnFormatRepeatDaysBullet(habit.repeatDays)}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setGrowthThnDeleteId(habit.id)}
                  style={styles.growthThnDeleteIcon}>
                  <Image source={require('../growthThnAssts/delete.png')} />
                </Pressable>
              </View>
              <View style={styles.growthThnStatsRow}>
                <Text style={styles.growthThnStat}>
                  🔥 {habit.streakDays}d streak
                </Text>
                <Text style={styles.growthThnStat}>
                  ↗ {habit.completionRate}% rate
                </Text>
              </View>
              <View style={styles.growthThnProgressTrack}>
                <LinearGradient
                  colors={[
                    growthThnColors.accentOrange,
                    growthThnColors.accentGold,
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    styles.growthThnProgressFill,
                    {width: `${Math.min(habit.completionRate, 100)}%`},
                  ]}
                />
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <GrowthThnDeleteHabitModal
        visible={growthThnDeleteId !== null}
        onCancel={() => setGrowthThnDeleteId(null)}
        onConfirm={growthThnConfirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {flex: 1},
  growthThnScroll: {
    paddingHorizontal: growthThnMetrics.screenPadding,
    gap: 16,
  },
  growthThnBack: {alignSelf: 'flex-start', paddingVertical: 8},
  growthThnBackText: {
    color: growthThnColors.accentGold,
    fontSize: 16,
    fontWeight: '600',
  },
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  growthThnSubtitle: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    marginBottom: 8,
  },
  growthThnEmptyCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  growthThnEmptyIcon: {fontSize: 28},
  growthThnEmptyText: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    textAlign: 'center',
  },
  growthThnCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
    gap: 12,
  },
  growthThnCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  growthThnCardTitleBlock: {flex: 1, gap: 4},
  growthThnCardTitle: {
    color: growthThnColors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  growthThnCardMeta: {
    color: growthThnColors.textMutedDark,
    fontSize: 12,
  },
  growthThnDeleteIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3a1010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnDeleteIconText: {fontSize: 14},
  growthThnStatsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  growthThnStat: {
    color: growthThnColors.accentGold,
    fontSize: 12,
    fontWeight: '600',
  },
  growthThnProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: growthThnColors.panelInner,
    overflow: 'hidden',
  },
  growthThnProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
