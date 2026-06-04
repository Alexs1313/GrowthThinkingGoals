export type GrowthThnHabit = {
  id: string;
  title: string;
  repeatDays: number[];
  createdAt: string;
  doneToday: boolean;
  streakDays: number;
  completionRate: number;
};

export const growthThnWeekDayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export const growthThnWeekDayNames = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;

export const growthThnWeekDayNamesShort = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;
