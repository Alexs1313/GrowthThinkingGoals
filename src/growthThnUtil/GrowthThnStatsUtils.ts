import type {GrowthThnCompletedTask} from '../growthThnData/GrowthThnTaskTypes';
import type {GrowthThnDiscRecordsMap} from '../growthThnData/GrowthThnDiscTypes';
import type {GrowthThnGoal} from '../growthThnData/GrowthThnGoalTypes';
import type {GrowthThnHabit} from '../growthThnData/GrowthThnHabitTypes';
import {growthThnGetTodayProgress} from './GrowthThnHabitUtils';

export function growthThnBuildSettingsStats(goals: GrowthThnGoal[]) {
  const growthThnCompleted = goals.filter(
    goal => goal.status === 'completed',
  ).length;
  const growthThnActive = goals.filter(goal => goal.status === 'active').length;
  return {
    goalsTotal: goals.length,
    goalsCompleted: growthThnCompleted,
    goalsActive: growthThnActive,
  };
}

export type GrowthThnGrowthRank = {
  title: string;
  label: string;
};

export type GrowthThnStatsSnapshot = {
  growthScore: number;
  rank: GrowthThnGrowthRank;
  habitStreak: number;
  habitsCompleted: number;
  tasksCompleted: number;
  focusMinutes: number;
  articlesRead: number;
  logicRecords: number;
  logicLevelReached: number | null;
  weeklyDayPercents: number[];
  weeklyPercent: number;
};

export function growthThnGetGrowthRank(score: number): GrowthThnGrowthRank {
  if (score >= 120) {
    return {title: 'Master', label: 'Master'};
  }
  if (score >= 70) {
    return {title: 'Achiever', label: 'Achiever'};
  }
  if (score >= 40) {
    return {title: 'Builder', label: 'Builder'};
  }
  if (score >= 20) {
    return {title: 'Explorer', label: 'Explorer'};
  }
  return {title: 'Newcomer', label: 'Newcomer'};
}

export function growthThnCalcGrowthScore(input: {
  habitsCompleted: number;
  tasksCompleted: number;
  focusMinutes: number;
  articlesRead: number;
  logicRecords: number;
  habitStreak: number;
}): number {
  return (
    5 +
    input.habitsCompleted * 2 +
    input.tasksCompleted * 3 +
    input.focusMinutes +
    input.articlesRead * 2 +
    input.logicRecords * 15 +
    Math.min(input.habitStreak, 14) * 2
  );
}

function growthThnGetWeekDateKeys(date = new Date()): string[] {
  const growthThnTodayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
  const growthThnWeekStart = new Date(date);
  growthThnWeekStart.setHours(0, 0, 0, 0);
  growthThnWeekStart.setDate(date.getDate() - growthThnTodayIndex);

  return Array.from({length: 7}, (_, index) => {
    const growthThnDay = new Date(growthThnWeekStart);
    growthThnDay.setDate(growthThnWeekStart.getDate() + index);
    return growthThnDay.toISOString().slice(0, 10);
  });
}

export function growthThnCalcWeeklyDayPercents(
  habits: GrowthThnHabit[],
  completedTasks: GrowthThnCompletedTask[],
  date = new Date(),
): number[] {
  const growthThnWeekKeys = growthThnGetWeekDateKeys(date);
  const growthThnTodayKey = date.toISOString().slice(0, 10);
  const growthThnTodayProgress = growthThnGetTodayProgress(habits);

  return growthThnWeekKeys.map(growthThnDayKey => {
    const growthThnHasTask = completedTasks.some(task =>
      task.completedAt.startsWith(growthThnDayKey),
    );

    if (growthThnDayKey === growthThnTodayKey && growthThnTodayProgress.total > 0) {
      const growthThnHabitPct = growthThnTodayProgress.percent;
      if (growthThnHasTask) {
        return Math.round((growthThnHabitPct + 100) / 2);
      }
      return growthThnHabitPct;
    }

    return growthThnHasTask ? 100 : 0;
  });
}

export function growthThnBuildStatsSnapshot(input: {
  habits: GrowthThnHabit[];
  completedTasks: GrowthThnCompletedTask[];
  totalFocusSeconds: number;
  taskStreakDays: number;
  habitsCompletedTotal: number;
  articlesRead: number;
  discRecords: GrowthThnDiscRecordsMap;
}): GrowthThnStatsSnapshot {
  const growthThnHabitStreak = input.habits.reduce(
    (max, habit) => Math.max(max, habit.streakDays),
    input.taskStreakDays,
  );
  const growthThnLogicIds = Object.keys(input.discRecords).map(Number);
  const growthThnLogicRecords = growthThnLogicIds.length;
  const growthThnLogicLevelReached =
    growthThnLogicIds.length > 0 ? Math.max(...growthThnLogicIds) : null;
  const growthThnFocusMinutes = Math.floor(input.totalFocusSeconds / 60);
  const growthThnWeeklyDayPercents = growthThnCalcWeeklyDayPercents(
    input.habits,
    input.completedTasks,
  );
  const growthThnWeeklyPercent =
    growthThnWeeklyDayPercents.length === 0
      ? 0
      : Math.round(
          growthThnWeeklyDayPercents.reduce((sum, v) => sum + v, 0) /
            growthThnWeeklyDayPercents.length,
        );

  const growthThnScoreInput = {
    habitsCompleted: input.habitsCompletedTotal,
    tasksCompleted: input.completedTasks.length,
    focusMinutes: growthThnFocusMinutes,
    articlesRead: input.articlesRead,
    logicRecords: growthThnLogicRecords,
    habitStreak: growthThnHabitStreak,
  };
  const growthScore = growthThnCalcGrowthScore(growthThnScoreInput);

  return {
    growthScore,
    rank: growthThnGetGrowthRank(growthScore),
    habitStreak: growthThnHabitStreak,
    habitsCompleted: input.habitsCompletedTotal,
    tasksCompleted: input.completedTasks.length,
    focusMinutes: growthThnFocusMinutes,
    articlesRead: input.articlesRead,
    logicRecords: growthThnLogicRecords,
    logicLevelReached: growthThnLogicLevelReached,
    weeklyDayPercents: growthThnWeeklyDayPercents,
    weeklyPercent: growthThnWeeklyPercent,
  };
}

export function growthThnFormatFocusMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const growthThnHours = Math.floor(minutes / 60);
  const growthThnMins = minutes % 60;
  return growthThnMins > 0
    ? `${growthThnHours}h ${growthThnMins}m`
    : `${growthThnHours}h`;
}
