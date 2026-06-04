export type GrowthThnDailyAdvice = {
  quote: string;
  author?: string;
};

export type GrowthThnDailyChallenge = {
  id: string;
  title: string;
  category: string;
  description: string;
  durationSeconds: number;
};

export type GrowthThnCompletedTask = {
  id: string;
  title: string;
  category: string;
  focusedSeconds: number;
  completedAt: string;
};
