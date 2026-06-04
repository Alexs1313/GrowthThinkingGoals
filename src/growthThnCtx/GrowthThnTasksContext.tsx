import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  growthThnPickDailyAdvice,
  growthThnPickDailyChallenge,
  growthThnPickRandomChallenge,
} from '../growthThnData/GrowthThnTaskData';
import type {
  GrowthThnCompletedTask,
  GrowthThnDailyAdvice,
  GrowthThnDailyChallenge,
} from '../growthThnData/GrowthThnTaskTypes';

type GrowthThnTasksContextValue = {
  advice: GrowthThnDailyAdvice;
  challenge: GrowthThnDailyChallenge;
  remainingSeconds: number;
  isRunning: boolean;
  completedTasks: GrowthThnCompletedTask[];
  totalFocusSeconds: number;
  streakDays: number;
  completedToday: number;
  growthThnStartTimer: () => void;
  growthThnPauseTimer: () => void;
  growthThnResetTimer: () => void;
  growthThnCompleteChallenge: () => void;
  growthThnChangeChallenge: () => void;
};

const GrowthThnTasksContext = createContext<GrowthThnTasksContextValue | null>(
  null,
);

function growthThnCalcStreak(completed: GrowthThnCompletedTask[]): number {
  if (completed.length === 0) {
    return 0;
  }
  const growthThnDays = new Set(
    completed.map(item => item.completedAt.slice(0, 10)),
  );
  let growthThnStreak = 0;
  const growthThnCursor = new Date();
  growthThnCursor.setHours(0, 0, 0, 0);
  while (true) {
    const growthThnKey = growthThnCursor.toISOString().slice(0, 10);
    if (!growthThnDays.has(growthThnKey)) {
      break;
    }
    growthThnStreak += 1;
    growthThnCursor.setDate(growthThnCursor.getDate() - 1);
  }
  return growthThnStreak;
}

export function GrowthThnTasksProvider({children}: {children: React.ReactNode}) {
  const [advice] = useState(() => growthThnPickDailyAdvice());
  const [challenge, setChallenge] = useState(() => growthThnPickDailyChallenge());
  const [remainingSeconds, setRemainingSeconds] = useState(
    () => challenge.durationSeconds,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<GrowthThnCompletedTask[]>(
    [],
  );
  const [totalFocusSeconds, setTotalFocusSeconds] = useState(0);
  const growthThnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isRunning) {
      if (growthThnIntervalRef.current) {
        clearInterval(growthThnIntervalRef.current);
        growthThnIntervalRef.current = null;
      }
      return;
    }

    growthThnIntervalRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (growthThnIntervalRef.current) {
        clearInterval(growthThnIntervalRef.current);
        growthThnIntervalRef.current = null;
      }
    };
  }, [isRunning]);

  const growthThnStartTimer = useCallback(() => {
    if (remainingSeconds <= 0) {
      return;
    }
    setIsRunning(true);
  }, [remainingSeconds]);

  const growthThnPauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const growthThnResetTimer = useCallback(() => {
    setIsRunning(false);
    setRemainingSeconds(challenge.durationSeconds);
  }, [challenge.durationSeconds]);

  const growthThnCompleteChallenge = useCallback(() => {
    const growthThnFocused = challenge.durationSeconds - remainingSeconds;
    if (growthThnFocused > 0) {
      setTotalFocusSeconds(prev => prev + growthThnFocused);
    }
    setCompletedTasks(prev => [
      {
        id: `${challenge.id}-${Date.now()}`,
        title: challenge.title,
        category: challenge.category,
        focusedSeconds: growthThnFocused,
        completedAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setIsRunning(false);
    setRemainingSeconds(challenge.durationSeconds);
  }, [challenge, remainingSeconds]);

  const growthThnChangeChallenge = useCallback(() => {
    const growthThnNext = growthThnPickRandomChallenge(challenge.id);
    setChallenge(growthThnNext);
    setIsRunning(false);
    setRemainingSeconds(growthThnNext.durationSeconds);
  }, [challenge.id]);

  const streakDays = useMemo(
    () => growthThnCalcStreak(completedTasks),
    [completedTasks],
  );

  const completedToday = useMemo(() => {
    const growthThnToday = new Date().toISOString().slice(0, 10);
    return completedTasks.filter(
      item => item.completedAt.slice(0, 10) === growthThnToday,
    ).length;
  }, [completedTasks]);

  const value = useMemo(
    () => ({
      advice,
      challenge,
      remainingSeconds,
      isRunning,
      completedTasks,
      totalFocusSeconds,
      streakDays,
      completedToday,
      growthThnStartTimer,
      growthThnPauseTimer,
      growthThnResetTimer,
      growthThnCompleteChallenge,
      growthThnChangeChallenge,
    }),
    [
      advice,
      challenge,
      remainingSeconds,
      isRunning,
      completedTasks,
      totalFocusSeconds,
      streakDays,
      completedToday,
      growthThnStartTimer,
      growthThnPauseTimer,
      growthThnResetTimer,
      growthThnCompleteChallenge,
      growthThnChangeChallenge,
    ],
  );

  return (
    <GrowthThnTasksContext.Provider value={value}>
      {children}
    </GrowthThnTasksContext.Provider>
  );
}

export function useGrowthThnTasks() {
  const growthThnCtx = useContext(GrowthThnTasksContext);
  if (!growthThnCtx) {
    throw new Error('useGrowthThnTasks must be used within GrowthThnTasksProvider');
  }
  return growthThnCtx;
}
