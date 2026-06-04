import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {growthThnWeekDayLabels} from '../growthThnData/GrowthThnHabitTypes';
import {growthThnColors} from '../growthThnThm/GrowthThnTheme';

type GrowthThnDayPickerProps = {
  selectedDays: number[];
  onToggleDay: (dayIndex: number) => void;
};

export function GrowthThnDayPicker({
  selectedDays,
  onToggleDay,
}: GrowthThnDayPickerProps) {
  return (
    <View style={styles.growthThnRow}>
      {growthThnWeekDayLabels.map((label, index) => {
        const growthThnActive = selectedDays.includes(index);

        if (growthThnActive) {
          return (
            <Pressable
              key={`growth-thn-day-${label}-${index}`}
              onPress={() => onToggleDay(index)}
              style={styles.growthThnDayPressable}>
              <LinearGradient
                colors={[growthThnColors.accent, growthThnColors.accentDark]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.growthThnDayActive}>
                <Text style={styles.growthThnDayActiveText}>{label}</Text>
              </LinearGradient>
            </Pressable>
          );
        }

        return (
          <Pressable
            key={`growth-thn-day-${label}-${index}`}
            onPress={() => onToggleDay(index)}
            style={styles.growthThnDayIdle}>
            <Text style={styles.growthThnDayIdleText}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  growthThnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  growthThnDayPressable: {
    flex: 1,
  },
  growthThnDayActive: {
    height: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnDayActiveText: {
    color: growthThnColors.accentYellow,
    fontSize: 11,
    fontWeight: '700',
  },
  growthThnDayIdle: {
    flex: 1,
    height: 36,
    borderRadius: 14,
    backgroundColor: growthThnColors.panelInner,
    borderWidth: 1,
    borderColor: growthThnColors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  growthThnDayIdleText: {
    color: growthThnColors.textMutedDark,
    fontSize: 11,
    fontWeight: '700',
  },
});
