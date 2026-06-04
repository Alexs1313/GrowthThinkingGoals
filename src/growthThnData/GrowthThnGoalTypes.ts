export type GrowthThnGoalStatus = 'active' | 'completed' | 'paused';

export type GrowthThnGoal = {
  id: string;
  title: string;
  status: GrowthThnGoalStatus;
  createdAt: string;
};
