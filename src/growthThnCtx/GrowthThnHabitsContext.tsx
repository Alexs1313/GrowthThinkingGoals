import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {GrowthThnHabit} from '../growthThnData/GrowthThnHabitTypes';
import {growthThnIncrementHabitsCompleted} from '../growthThnStrg/GrowthThnStatsStorage';

type GrowthThnHabitsContextValue = {
  habits: GrowthThnHabit[];
  growthThnAddHabit: (title: string, repeatDays: number[]) => void;
  growthThnToggleHabitDoneToday: (habitId: string) => void;
  growthThnDeleteHabit: (habitId: string) => void;
};

const GrowthThnHabitsContext = createContext<GrowthThnHabitsContextValue | null>(
  null,
);

function growthThnCreateHabit(title: string, repeatDays: number[]): GrowthThnHabit {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(),
    repeatDays: [...repeatDays].sort((a, b) => a - b),
    createdAt: new Date().toISOString(),
    doneToday: false,
    streakDays: 1,
    completionRate: 8,
  };
}

export function GrowthThnHabitsProvider({children}: {children: ReactNode}) {
  const [habits, setHabits] = useState<GrowthThnHabit[]>([]);

  const growthThnAddHabit = useCallback((title: string, repeatDays: number[]) => {
    setHabits(prev => [...prev, growthThnCreateHabit(title, repeatDays)]);
  }, []);

  const growthThnToggleHabitDoneToday = useCallback((habitId: string) => {
    setHabits(prev => {
      const growthThnTarget = prev.find(habit => habit.id === habitId);
      if (growthThnTarget && !growthThnTarget.doneToday) {
        growthThnIncrementHabitsCompleted();
      }
      return prev.map(habit =>
        habit.id === habitId
          ? {...habit, doneToday: !habit.doneToday}
          : habit,
      );
    });
  }, []);

  const growthThnDeleteHabit = useCallback((habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
  }, []);

  const value = useMemo(
    () => ({
      habits,
      growthThnAddHabit,
      growthThnToggleHabitDoneToday,
      growthThnDeleteHabit,
    }),
    [habits, growthThnAddHabit, growthThnToggleHabitDoneToday, growthThnDeleteHabit],
  );

  return (
    <GrowthThnHabitsContext.Provider value={value}>
      {children}
    </GrowthThnHabitsContext.Provider>
  );
}

export function useGrowthThnHabits() {
  const context = useContext(GrowthThnHabitsContext);
  if (!context) {
    throw new Error('useGrowthThnHabits must be used within GrowthThnHabitsProvider');
  }
  return context;
}
