import type {GrowthThnHabit} from '../growthThnData/GrowthThnHabitTypes';
import {growthThnWeekDayNamesShort} from '../growthThnData/GrowthThnHabitTypes';

export function growthThnFormatRepeatDays(repeatDays: number[]): string {
  return [...repeatDays]
    .sort((a, b) => a - b)
    .map(day => growthThnWeekDayNamesShort[day])
    .join(', ');
}

export function growthThnFormatRepeatDaysBullet(repeatDays: number[]): string {
  return [...repeatDays]
    .sort((a, b) => a - b)
    .map(day => growthThnWeekDayNamesShort[day])
    .join(' · ');
}

export function growthThnGetTodayIndex(date = new Date()): number {
  const growthThnDay = date.getDay();
  return growthThnDay === 0 ? 6 : growthThnDay - 1;
}

export function growthThnIsHabitScheduledToday(
  habit: GrowthThnHabit,
  todayIndex = growthThnGetTodayIndex(),
): boolean {
  return habit.repeatDays.includes(todayIndex);
}

export function growthThnGetTodayHabits(
  habits: GrowthThnHabit[],
  todayIndex = growthThnGetTodayIndex(),
): GrowthThnHabit[] {
  return habits.filter(habit => growthThnIsHabitScheduledToday(habit, todayIndex));
}

export function growthThnGetTodayProgress(habits: GrowthThnHabit[]) {
  const growthThnTodayHabits = growthThnGetTodayHabits(habits);
  const growthThnDone = growthThnTodayHabits.filter(habit => habit.doneToday).length;
  const growthThnTotal = growthThnTodayHabits.length;
  const growthThnPercent =
    growthThnTotal === 0 ? 0 : Math.round((growthThnDone / growthThnTotal) * 100);

  return {
    done: growthThnDone,
    total: growthThnTotal,
    percent: growthThnPercent,
    habits: growthThnTodayHabits,
  };
}

export type GrowthThnWeekDayItem = {
  label: string;
  date: number;
  dayIndex: number;
  isToday: boolean;
};

export function growthThnGetCurrentWeek(date = new Date()): GrowthThnWeekDayItem[] {
  const growthThnTodayIndex = growthThnGetTodayIndex(date);
  const growthThnWeekStart = new Date(date);
  growthThnWeekStart.setDate(date.getDate() - growthThnTodayIndex);

  return Array.from({length: 7}, (_, index) => {
    const growthThnDayDate = new Date(growthThnWeekStart);
    growthThnDayDate.setDate(growthThnWeekStart.getDate() + index);
    return {
      label: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index],
      date: growthThnDayDate.getDate(),
      dayIndex: index,
      isToday: index === growthThnTodayIndex,
    };
  });
}

export function growthThnFormatTodayHeading(date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}
