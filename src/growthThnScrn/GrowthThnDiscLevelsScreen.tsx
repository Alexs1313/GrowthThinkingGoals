import React from 'react';
import {
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

import {useGrowthThnDisc} from '../growthThnCtx/GrowthThnDiscContext';
import {growthThnDiscLevels} from '../growthThnData/GrowthThnDiscLevelData';
import type {GrowthThnDiscStackParamList} from '../growthThnNav/GrowthThnDiscStackTypes';
import {growthThnDiscGetDifficultyStyle} from '../growthThnUtil/GrowthThnDiscGameUtils';
import {growthThnFormatTimer} from '../growthThnUtil/GrowthThnTimeUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnDiscLevelsScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnDiscStackParamList>>();
  const insets = useSafeAreaInsets();
  const {completedCount, bestMoves, bestSeconds, growthThnGetLevelRecord} =
    useGrowthThnDisc();

  const growthThnStatMoves =
    bestMoves !== null ? String(bestMoves) : '—';
  const growthThnStatTime =
    bestSeconds !== null ? growthThnFormatTimer(bestSeconds) : '—';

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
        <Text style={styles.growthThnTitle}>Disc Logic</Text>
        <Text style={styles.growthThnSubtitle}>
          Move carefully. Beat your record.
        </Text>

        <View style={styles.growthThnStatsRow}>
          <View style={styles.growthThnStatCell}>
            <Text style={styles.growthThnStatValue}>{completedCount}</Text>
            <Text style={styles.growthThnStatLabel}>Completed</Text>
          </View>
          <View style={styles.growthThnStatDivider} />
          <View style={styles.growthThnStatCell}>
            <Text style={styles.growthThnStatValue}>{growthThnStatMoves}</Text>
            <Text style={styles.growthThnStatLabel}>Best Moves</Text>
          </View>
          <View style={styles.growthThnStatDivider} />
          <View style={styles.growthThnStatCell}>
            <Text style={styles.growthThnStatValue}>{growthThnStatTime}</Text>
            <Text style={styles.growthThnStatLabel}>Best Time</Text>
          </View>
        </View>

        <View style={styles.growthThnGrid}>
          {growthThnDiscLevels.map(level => {
            const growthThnRecord = growthThnGetLevelRecord(level.id);
            const growthThnDifficulty = growthThnDiscGetDifficultyStyle(
              level.difficulty,
            );
            const growthThnHasRecord = Boolean(growthThnRecord);

            return (
              <View key={level.id} style={styles.growthThnLevelCard}>
                <View style={styles.growthThnLevelTop}>
                  <Text style={styles.growthThnLevelTitle}>Level {level.id}</Text>
                  {growthThnHasRecord ? (
                    <Text style={styles.growthThnTrophy}>🏆</Text>
                  ) : null}
                </View>
                <View
                  style={[
                    styles.growthThnTag,
                    {backgroundColor: growthThnDifficulty.backgroundColor},
                  ]}>
                  <Text
                    style={[
                      styles.growthThnTagText,
                      {color: growthThnDifficulty.color},
                    ]}>
                    {level.difficulty}
                  </Text>
                </View>
                <Text style={styles.growthThnRecordLabel}>Best Record</Text>
                <Text style={styles.growthThnRecordValue}>
                  {growthThnRecord
                    ? `${growthThnRecord.bestMoves} moves · ${growthThnFormatTimer(growthThnRecord.bestSeconds)}`
                    : '—'}
                </Text>
                <Pressable
                  style={styles.growthThnPlayBtn}
                  onPress={() =>
                    navigation.navigate('DiscGame', {levelId: level.id})
                  }>
                  <Text style={styles.growthThnPlayText}>
                    {growthThnHasRecord ? 'Beat Record' : 'Play Level'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <View style={styles.growthThnHowToCard}>
          <Text style={styles.growthThnHowToLabel}>HOW TO PLAY</Text>
          <Text style={styles.growthThnHowToText}>
            Tap the top disc to pick it up, then tap another column to place it.
            Move all discs to column 3. Build from bottom to top: largest disc
            at the bottom, smallest on top. A larger disc cannot sit on a smaller
            one.
          </Text>
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
  growthThnStatsRow: {
    flexDirection: 'row',
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    paddingVertical: 16,
  },
  growthThnStatCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  growthThnStatDivider: {
    width: 1,
    backgroundColor: growthThnColors.border,
    marginVertical: 4,
  },
  growthThnStatValue: {
    fontSize: 20,
    fontWeight: '800',
    color: growthThnColors.text,
    fontVariant: ['tabular-nums'],
  },
  growthThnStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: growthThnColors.textMuted,
  },
  growthThnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  growthThnLevelCard: {
    width: '48%',
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 14,
    gap: 8,
  },
  growthThnLevelTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  growthThnLevelTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnTrophy: {
    fontSize: 16,
  },
  growthThnTag: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  growthThnTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  growthThnRecordLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: growthThnColors.textMutedDark,
    marginTop: 2,
  },
  growthThnRecordValue: {
    fontSize: 12,
    fontWeight: '700',
    color: growthThnColors.accentGold,
    minHeight: 16,
  },
  growthThnPlayBtn: {
    marginTop: 4,
    backgroundColor: growthThnColors.accent,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  growthThnPlayText: {
    fontSize: 13,
    fontWeight: '800',
    color: growthThnColors.accentYellow,
  },
  growthThnHowToCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
    gap: 8,
    marginTop: 4,
  },
  growthThnHowToLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: growthThnColors.accentGold,
  },
  growthThnHowToText: {
    fontSize: 14,
    lineHeight: 20,
    color: growthThnColors.textMuted,
  },
});
