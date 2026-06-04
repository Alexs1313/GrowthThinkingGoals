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
import type {GrowthThnHabitsStackParamList} from '../growthThnNav/GrowthThnHabitsStackTypes';
import {growthThnColors, growthThnMetrics} from '../growthThnThm/GrowthThnTheme';

const GROWTH_THN_DEFAULT_DAYS = [0, 2, 4];

export function GrowthThnCreateHabitScreen() {
  const navigation =
    useNavigation<StackNavigationProp<GrowthThnHabitsStackParamList>>();
  const insets = useSafeAreaInsets();
  const {growthThnAddHabit} = useGrowthThnHabits();

  const [growthThnHabitName, setGrowthThnHabitName] = useState('');
  const [growthThnSelectedDays, setGrowthThnSelectedDays] = useState<number[]>(
    GROWTH_THN_DEFAULT_DAYS,
  );

  const growthThnCanSave = useMemo(() => {
    return growthThnHabitName.trim().length > 0 && growthThnSelectedDays.length > 0;
  }, [growthThnHabitName, growthThnSelectedDays]);

  const growthThnToggleDay = useCallback((dayIndex: number) => {
    setGrowthThnSelectedDays(prev => {
      if (prev.includes(dayIndex)) {
        return prev.filter(day => day !== dayIndex);
      }
      return [...prev, dayIndex].sort((a, b) => a - b);
    });
  }, []);

  const growthThnHandleSave = useCallback(() => {
    if (!growthThnCanSave) {
      return;
    }
    growthThnAddHabit(growthThnHabitName, growthThnSelectedDays);
    navigation.goBack();
  }, [growthThnAddHabit, growthThnCanSave, growthThnHabitName, growthThnSelectedDays, navigation]);

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
            {paddingTop: insets.top + 8, paddingBottom: insets.bottom + 24},
          ]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.growthThnBack}>
            <Text style={styles.growthThnBackText}>‹ Back</Text>
          </Pressable>

          <Text style={styles.growthThnTitle}>Create New Habit</Text>
          <Text style={styles.growthThnSubtitle}>
            Build consistency one day at a time.
          </Text>

          <Text style={styles.growthThnLabel}>Habit name</Text>
          <TextInput
            value={growthThnHabitName}
            onChangeText={setGrowthThnHabitName}
            placeholder="Habit name"
            placeholderTextColor={growthThnColors.textPlaceholder}
            style={styles.growthThnInput}
          />

          <Text style={styles.growthThnLabel}>Repeat on</Text>
          <GrowthThnDayPicker
            selectedDays={growthThnSelectedDays}
            onToggleDay={growthThnToggleDay}
          />

          <Pressable
            onPress={growthThnHandleSave}
            disabled={!growthThnCanSave}
            style={styles.growthThnSavePressable}>
            {growthThnCanSave ? (
              <LinearGradient
                colors={[growthThnColors.accent, growthThnColors.accentDark]}
                style={styles.growthThnSaveButton}>
                <Text style={styles.growthThnSaveTextActive}>Save Habit</Text>
              </LinearGradient>
            ) : (
              <View style={styles.growthThnSaveButton}>
                <Text style={styles.growthThnSaveText}>Save Habit</Text>
              </View>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRoot: {flex: 1},
  growthThnFlex: {flex: 1},
  growthThnScroll: {
    paddingHorizontal: growthThnMetrics.screenPadding,
    gap: 12,
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
    lineHeight: 22,
    marginBottom: 16,
  },
  growthThnLabel: {
    color: growthThnColors.accentGold,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    marginTop: 8,
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
  growthThnSavePressable: {
    marginTop: 24,
    borderRadius: 14,
    overflow: 'hidden',
  },
  growthThnSaveButton: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    backgroundColor: growthThnColors.panelInner,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnSaveText: {
    color: growthThnColors.textPlaceholder,
    fontSize: 15,
    fontWeight: '600',
  },
  growthThnSaveTextActive: {
    color: growthThnColors.accentYellow,
    fontSize: 15,
    fontWeight: '700',
  },
});
