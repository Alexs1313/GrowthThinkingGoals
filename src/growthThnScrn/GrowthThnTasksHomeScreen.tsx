import React from 'react';
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

import {growthThnImages} from '../growthThnAssts';
import {GrowthThnTaskTimerRing} from '../growthThnCpnnts/GrowthThnTaskTimerRing';
import {useGrowthThnTasks} from '../growthThnCtx/GrowthThnTasksContext';
import type {GrowthThnTasksStackParamList} from '../growthThnNav/GrowthThnTasksStackTypes';
import {
  growthThnFormatFocusTime,
  growthThnFormatTimer,
} from '../growthThnUtil/GrowthThnTimeUtils';
import {
  growthThnColors,
  growthThnMetrics,
} from '../growthThnThm/GrowthThnTheme';

export function GrowthThnTasksHomeScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnTasksStackParamList>>();
  const insets = useSafeAreaInsets();
  const {
    advice,
    challenge,
    remainingSeconds,
    isRunning,
    completedTasks,
    totalFocusSeconds,
    streakDays,
    completedToday,
    growthThnStartTimer,
    growthThnPauseTimer,
    growthThnResetTimer,
    growthThnCompleteChallenge,
    growthThnChangeChallenge,
  } = useGrowthThnTasks();

  const growthThnElapsed = challenge.durationSeconds - remainingSeconds;
  const growthThnCanComplete = growthThnElapsed > 0;
  const growthThnCanShare = growthThnCanComplete;

  const growthThnOnShare = async () => {
    if (!growthThnCanShare) {
      return;
    }
    try {
      await Share.share({
        message: `${challenge.title} (${challenge.category})\n\n${
          challenge.description
        }\n\nFocus: ${growthThnFormatTimer(
          growthThnElapsed,
        )} / ${growthThnFormatTimer(challenge.durationSeconds)}`,
      });
    } catch {
      // user dismissed
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
        <Text style={styles.growthThnTitle}>Daily Boost</Text>
        <Text style={styles.growthThnSubtitle}>
          Your daily growth challenge awaits.
        </Text>

        <View style={styles.growthThnCard}>
          <Text style={styles.growthThnCardLabel}>ADVICE OF THE DAY</Text>
          <Text style={styles.growthThnAdviceQuote}>{advice.quote}</Text>
          {advice.author ? (
            <Text style={styles.growthThnAdviceAuthor}>— {advice.author}</Text>
          ) : null}
        </View>

        <View style={styles.growthThnCard}>
          <View style={styles.growthThnChallengeHeader}>
            <Text style={styles.growthThnCardLabel}>
              TODAY&apos;S CHALLENGE
            </Text>
            <View style={styles.growthThnTag}>
              <Text style={styles.growthThnTagText}>{challenge.category}</Text>
            </View>
          </View>
          <Text style={styles.growthThnChallengeTitle}>{challenge.title}</Text>
          <Text style={styles.growthThnChallengeDesc}>
            {challenge.description}
          </Text>

          <GrowthThnTaskTimerRing
            elapsedSeconds={growthThnElapsed}
            totalSeconds={challenge.durationSeconds}
          />

          <View style={styles.growthThnTimerActions}>
            {isRunning ? (
              <Pressable
                style={styles.growthThnPauseBtn}
                onPress={growthThnPauseTimer}>
                <Image source={require('../growthThnAssts/pause.png')} />
                <Text style={styles.growthThnPauseText}>Pause</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[
                  styles.growthThnStartBtn,
                  remainingSeconds === 0 && styles.growthThnStartBtnDisabled,
                ]}
                onPress={growthThnStartTimer}
                disabled={remainingSeconds === 0}>
                <Text style={styles.growthThnStartIcon}>▶</Text>
                <Text style={styles.growthThnStartText}>Start Timer</Text>
              </Pressable>
            )}
            <Pressable
              style={styles.growthThnResetBtn}
              onPress={growthThnResetTimer}>
              <Text style={styles.growthThnResetIcon}>↻</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          style={[
            styles.growthThnCompleteBtn,
            !growthThnCanComplete && styles.growthThnCompleteBtnDisabled,
          ]}
          onPress={growthThnCompleteChallenge}
          disabled={!growthThnCanComplete}>
          <Text
            style={[
              styles.growthThnCompleteIcon,
              !growthThnCanComplete && styles.growthThnActionMuted,
            ]}>
            ✓
          </Text>
          <Text
            style={[
              styles.growthThnCompleteText,
              !growthThnCanComplete && styles.growthThnActionMuted,
            ]}>
            Complete Task
          </Text>
        </Pressable>

        <View style={styles.growthThnSecondaryRow}>
          <Pressable
            style={styles.growthThnSecondaryBtn}
            onPress={growthThnChangeChallenge}>
            <Text style={styles.growthThnSecondaryIcon}>↻</Text>
            <Text style={styles.growthThnSecondaryText}>Change Task</Text>
          </Pressable>
          <Pressable
            style={[
              styles.growthThnSecondaryBtn,
              !growthThnCanShare && styles.growthThnSecondaryBtnDisabled,
            ]}
            onPress={growthThnOnShare}
            disabled={!growthThnCanShare}>
            <Image
              source={growthThnImages.share}
              style={[
                styles.growthThnShareIcon,
                !growthThnCanShare && styles.growthThnShareIconMuted,
              ]}
            />
            <Text
              style={[
                styles.growthThnSecondaryText,
                !growthThnCanShare && styles.growthThnActionMuted,
              ]}>
              Share Task
            </Text>
          </Pressable>
        </View>

        <View style={styles.growthThnStatsRow}>
          <View style={styles.growthThnStatCell}>
            <Text style={styles.growthThnStatValue}>
              ✓{'\u00A0'}
              {completedToday}
            </Text>
            <Text style={styles.growthThnStatLabel}>Done Today</Text>
          </View>
          <View style={styles.growthThnStatDivider} />
          <View style={styles.growthThnStatCell}>
            <Text style={styles.growthThnStatValue}>
              🔥{'\u00A0'}
              {streakDays}d
            </Text>
            <Text style={styles.growthThnStatLabel}>Streak</Text>
          </View>
          <View style={styles.growthThnStatDivider} />
          <View style={styles.growthThnStatCell}>
            <Text style={styles.growthThnStatValue}>
              🕐{'\u00A0'}
              {growthThnFormatFocusTime(totalFocusSeconds)}
            </Text>
            <Text style={styles.growthThnStatLabel}>Focus Time</Text>
          </View>
        </View>

        <Pressable
          style={styles.growthThnCompletedLink}
          onPress={() => navigation.navigate('CompletedTasks')}>
          <Text style={styles.growthThnCompletedIcon}>🕐</Text>
          <Text style={styles.growthThnCompletedLinkText}>Completed Tasks</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: growthThnColors.background,
  },
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
  growthThnCard: {
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.cardRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 16,
    gap: 10,
  },
  growthThnCardLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: growthThnColors.accentGold,
  },
  growthThnAdviceQuote: {
    fontSize: 16,
    lineHeight: 24,
    color: growthThnColors.text,
    fontStyle: 'italic',
  },
  growthThnAdviceAuthor: {
    fontSize: 14,
    color: growthThnColors.textMuted,
    marginTop: 4,
  },
  growthThnChallengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  growthThnTag: {
    backgroundColor: '#3d2810',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
  },
  growthThnTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: growthThnColors.accentOrange,
  },
  growthThnChallengeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnChallengeDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: growthThnColors.textMuted,
  },
  growthThnTimerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  growthThnStartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: growthThnColors.accent,
    borderRadius: growthThnMetrics.buttonRadius,
    paddingVertical: 14,
  },
  growthThnStartBtnDisabled: {
    opacity: 0.45,
  },
  growthThnStartIcon: {
    fontSize: 14,
    color: growthThnColors.accentYellow,
  },
  growthThnStartText: {
    fontSize: 16,
    fontWeight: '800',
    color: growthThnColors.accentYellow,
  },
  growthThnPauseBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.buttonRadius,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(61, 20, 20, 1)',
  },
  growthThnPauseIcon: {
    fontSize: 14,
    color: growthThnColors.accentGold,
  },
  growthThnPauseText: {
    fontSize: 16,
    fontWeight: '700',
    color: growthThnColors.accentGold,
  },
  growthThnResetBtn: {
    width: 52,
    height: 52,
    borderRadius: growthThnMetrics.buttonRadius,
    backgroundColor: growthThnColors.panel,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnResetIcon: {
    fontSize: 22,
    color: growthThnColors.textMuted,
  },
  growthThnCompleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: growthThnColors.accentSuccess,
    borderRadius: growthThnMetrics.buttonRadius,
    paddingVertical: 14,
  },
  growthThnCompleteBtnDisabled: {
    backgroundColor: growthThnColors.panel,
    borderWidth: 1,
    borderColor: growthThnColors.border,
  },
  growthThnCompleteIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnCompleteText: {
    fontSize: 16,
    fontWeight: '800',
    color: growthThnColors.text,
  },
  growthThnActionMuted: {
    color: growthThnColors.tabIdle,
  },
  growthThnSecondaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  growthThnSecondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.buttonRadius,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: growthThnColors.border,
  },
  growthThnSecondaryBtnDisabled: {
    opacity: 0.7,
  },
  growthThnSecondaryIcon: {
    fontSize: 16,
    color: growthThnColors.accentGold,
  },
  growthThnSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: growthThnColors.accentGold,
  },
  growthThnShareIcon: {
    width: 18,
    height: 18,
    tintColor: growthThnColors.accentGold,
  },
  growthThnShareIconMuted: {
    tintColor: growthThnColors.tabIdle,
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
  growthThnStatIcon: {
    fontSize: 14,
  },
  growthThnStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },
  growthThnStatLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: growthThnColors.textMuted,
  },
  growthThnCompletedLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: growthThnColors.panel,
    borderRadius: growthThnMetrics.buttonRadius,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    paddingVertical: 14,
  },
  growthThnCompletedIcon: {
    fontSize: 16,
  },
  growthThnCompletedLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: growthThnColors.accentGold,
  },
});
