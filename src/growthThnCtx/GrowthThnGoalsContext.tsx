import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {GrowthThnGoal} from '../growthThnData/GrowthThnGoalTypes';

type GrowthThnGoalsContextValue = {
  goals: GrowthThnGoal[];
  reloadGoals: () => Promise<void>;
};

const GrowthThnGoalsContext = createContext<GrowthThnGoalsContextValue | null>(null);

export function GrowthThnGoalsProvider({children}: {children: ReactNode}) {
  const [goals, setGoals] = useState<GrowthThnGoal[]>([]);

  const reloadGoals = useCallback(async () => {
    setGoals([]);
  }, []);

  const value = useMemo(
    () => ({
      goals,
      reloadGoals,
    }),
    [goals, reloadGoals],
  );

  return (
    <GrowthThnGoalsContext.Provider value={value}>{children}</GrowthThnGoalsContext.Provider>
  );
}

export function useGrowthThnGoals() {
  const context = useContext(GrowthThnGoalsContext);
  if (!context) {
    throw new Error('useGrowthThnGoals must be used within GrowthThnGoalsProvider');
  }
  return context;
}
