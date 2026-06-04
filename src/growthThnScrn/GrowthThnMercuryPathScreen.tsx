import React, {useCallback, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {GrowthThnDayPicker} from '../growthThnCpnnts/GrowthThnDayPicker';
import {useGrowthThnHabits} from '../growthThnCtx/GrowthThnHabitsContext';
import type {GrowthThnRootStackParamList} from '../growthThnNav/GrowthThnTypes';
import {growthThnFormatRepeatDays} from '../growthThnUtil/GrowthThnHabitUtils';
import {growthThnColors, growthThnMetrics} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_DEFAULT_DAYS = [0, 2, 4];

export function GrowthThnMercuryPathScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnRootStackParamList>>();
  const insets = useSafeAreaInsets();
  const {habits, growthThnAddHabit} = useGrowthThnHabits();

  const [growthThnHabitName, setGrowthThnHabitName] = useState('');
  const [growthThnSelectedDays, setGrowthThnSelectedDays] = useState<number[]>(
    GROWTH_THN_DEFAULT_DAYS,
  );

  const growthThnCanAddHabit = useMemo(() => {
    return (
      growthThnHabitName.trim().length > 0 && growthThnSelectedDays.length > 0
    );
  }, [growthThnHabitName, growthThnSelectedDays]);

  const growthThnCanContinue = habits.length > 0;

  const growthThnToggleDay = useCallback((dayIndex: number) => {
    setGrowthThnSelectedDays(prev => {
      if (prev.includes(dayIndex)) {
        return prev.filter(day => day !== dayIndex);
      }
      return [...prev, dayIndex].sort((a, b) => a - b);
    });
  }, []);

  const growthThnHandleAddHabit = useCallback(() => {
    if (!growthThnCanAddHabit) {
      return;
    }

    growthThnAddHabit(growthThnHabitName, growthThnSelectedDays);
    setGrowthThnHabitName('');
    setGrowthThnSelectedDays(GROWTH_THN_DEFAULT_DAYS);
  }, [growthThnAddHabit, growthThnCanAddHabit, growthThnHabitName, growthThnSelectedDays]);

  const growthThnHandleContinue = useCallback(() => {
    if (!growthThnCanContinue) {
      return;
    }
    navigation.replace('Main');
  }, [growthThnCanContinue, navigation]);

  return (
    <View style={styles.growthThnRoot}>
      <LinearGradient
        colors={[
          growthThnColors.backgroundGradientStart,
          growthThnColors.backgroundGradientEnd,
        ]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView
        style={styles.growthThnFlex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.growthThnScroll,
            {
              paddingTop: insets.top + 16,
              paddingBottom: Math.max(insets.bottom, 24),
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.growthThnIconWrap}>
            <Text style={styles.growthThnIcon}>⏱</Text>
          </View>

          <Text style={styles.growthThnTitle}>Start Your Mercury Path</Text>
          <Text style={styles.growthThnSubtitle}>
            Add your first habit and choose when it should repeat.
          </Text>

          {habits.map(habit => (
            <View key={habit.id} style={styles.growthThnHabitCard}>
              <View style={styles.growthThnHabitRow}>
                <View style={styles.growthThnCheck}>
                  <Text style={styles.growthThnCheckMark}>✓</Text>
                </View>
                <Text style={styles.growthThnHabitTitle}>{habit.title}</Text>
                <Text style={styles.growthThnHabitDays}>
                  {growthThnFormatRepeatDays(habit.repeatDays)}
                </Text>
              </View>
            </View>
          ))}

          <TextInput
            value={growthThnHabitName}
            onChangeText={setGrowthThnHabitName}
            placeholder="Enter habit name"
            placeholderTextColor={growthThnColors.textPlaceholder}
            style={[
              styles.growthThnInput,
              {marginTop: habits.length > 0 ? 24 : 32},
            ]}
          />

          <Text style={styles.growthThnRepeatLabel}>Repeat on</Text>
          <GrowthThnDayPicker
            selectedDays={growthThnSelectedDays}
            onToggleDay={growthThnToggleDay}
          />

          <Pressable
            onPress={growthThnHandleAddHabit}
            disabled={!growthThnCanAddHabit}
            style={[
              styles.growthThnSecondaryButton,
              growthThnCanAddHabit && styles.growthThnSecondaryButtonActive,
            ]}>
            <Text
              style={[
                styles.growthThnSecondaryButtonText,
                growthThnCanAddHabit && styles.growthThnSecondaryButtonTextActive,
              ]}>
              Add Habit
            </Text>
          </Pressable>

          <Pressable
            onPress={growthThnHandleContinue}
            disabled={!growthThnCanContinue}
            style={styles.growthThnContinuePressable}>
            {growthThnCanContinue ? (
              <LinearGradient
                colors={[growthThnColors.accentGold, growthThnColors.accentGoldDark]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.growthThnContinueButton}>
                <Text style={styles.growthThnContinueTextActive}>
                  Continue to App
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.growthThnContinueButton}>
                <Text style={styles.growthThnContinueText}>Continue to App</Text>
              </View>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {
    flex: 1,
    backgroundColor: growthThnColors.background,
  },
  growthThnFlex: {
    flex: 1,
  },
  growthThnScroll: {
    flexGrow: 1,
    paddingHorizontal: growthThnMetrics.screenPadding,
  },
  growthThnIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: growthThnColors.panel,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  growthThnIcon: {
    fontSize: 20,
    color: growthThnColors.accent,
  },
  growthThnTitle: {
    color: growthThnColors.text,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 39,
    marginTop: 24,
  },
  growthThnSubtitle: {
    color: growthThnColors.textMuted,
    fontSize: 15,
    lineHeight: 22.5,
    marginTop: 8,
  },
  growthThnHabitCard: {
    marginTop: 32,
    backgroundColor: growthThnColors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: growthThnColors.border,
    padding: 17,
  },
  growthThnHabitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  growthThnCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: growthThnColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnCheckMark: {
    color: growthThnColors.text,
    fontSize: 10,
    fontWeight: '700',
  },
  growthThnHabitTitle: {
    flex: 1,
    color: growthThnColors.text,
    fontSize: 13,
    fontWeight: '500',
  },
  growthThnHabitDays: {
    color: growthThnColors.textMutedDark,
    fontSize: 11,
  },
  growthThnInput: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: growthThnColors.borderStrong,
    backgroundColor: growthThnColors.panelInner,
    paddingHorizontal: 17,
    color: growthThnColors.text,
    fontSize: 15,
  },
  growthThnRepeatLabel: {
    marginTop: 16,
    marginBottom: 10,
    color: growthThnColors.accentGold,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  growthThnSecondaryButton: {
    marginTop: 20,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    backgroundColor: growthThnColors.panelInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnSecondaryButtonActive: {
    borderColor: growthThnColors.border,
  },
  growthThnSecondaryButtonText: {
    color: growthThnColors.textPlaceholder,
    fontSize: 15,
    fontWeight: '600',
  },
  growthThnSecondaryButtonTextActive: {
    color: growthThnColors.textMuted,
  },
  growthThnContinuePressable: {
    marginTop: 12,
    borderRadius: 14,
    overflow: 'hidden',
  },
  growthThnContinueButton: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    backgroundColor: growthThnColors.panelInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnContinueText: {
    color: growthThnColors.textPlaceholder,
    fontSize: 15,
    fontWeight: '600',
  },
  growthThnContinueTextActive: {
    color: growthThnColors.text,
    fontSize: 15,
    fontWeight: '600',
  },
});
