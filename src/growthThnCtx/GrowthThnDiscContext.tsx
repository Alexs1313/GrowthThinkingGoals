import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type {
  GrowthThnDiscLevelRecord,
  GrowthThnDiscRecordsMap,
} from '../growthThnData/GrowthThnDiscTypes';
import {
  growthThnLoadDiscRecords,
  growthThnSaveDiscRecords,
} from '../growthThnStrg/GrowthThnDiscStorage';
import {growthThnDiscIsBetterRecord} from '../growthThnUtil/GrowthThnDiscGameUtils';

type GrowthThnDiscContextValue = {
  records: GrowthThnDiscRecordsMap;
  completedCount: number;
  bestMoves: number | null;
  bestSeconds: number | null;
  growthThnGetLevelRecord: (levelId: number) => GrowthThnDiscLevelRecord | undefined;
  growthThnSaveLevelResult: (
    levelId: number,
    moves: number,
    seconds: number,
  ) => boolean;
};

const GrowthThnDiscContext = createContext<GrowthThnDiscContextValue | null>(null);

function growthThnCalcGlobalStats(records: GrowthThnDiscRecordsMap) {
  const growthThnEntries = Object.values(records);
  if (growthThnEntries.length === 0) {
    return {completedCount: 0, bestMoves: null, bestSeconds: null};
  }
  return {
    completedCount: growthThnEntries.length,
    bestMoves: Math.min(...growthThnEntries.map(r => r.bestMoves)),
    bestSeconds: Math.min(...growthThnEntries.map(r => r.bestSeconds)),
  };
}

export function GrowthThnDiscProvider({children}: {children: React.ReactNode}) {
  const [records, setRecords] = useState<GrowthThnDiscRecordsMap>({});

  useEffect(() => {
    growthThnLoadDiscRecords().then(setRecords);
  }, []);

  const growthThnGetLevelRecord = useCallback(
    (levelId: number) => records[levelId],
    [records],
  );

  const growthThnSaveLevelResult = useCallback(
    (levelId: number, moves: number, seconds: number) => {
      const growthThnExisting = records[levelId];
      const growthThnIsNew = growthThnDiscIsBetterRecord(
        moves,
        seconds,
        growthThnExisting,
      );
      if (!growthThnIsNew) {
        return false;
      }
      const growthThnNext = {
        ...records,
        [levelId]: {bestMoves: moves, bestSeconds: seconds},
      };
      setRecords(growthThnNext);
      growthThnSaveDiscRecords(growthThnNext);
      return true;
    },
    [records],
  );

  const {completedCount, bestMoves, bestSeconds} = useMemo(
    () => growthThnCalcGlobalStats(records),
    [records],
  );

  const value = useMemo(
    () => ({
      records,
      completedCount,
      bestMoves,
      bestSeconds,
      growthThnGetLevelRecord,
      growthThnSaveLevelResult,
    }),
    [
      records,
      completedCount,
      bestMoves,
      bestSeconds,
      growthThnGetLevelRecord,
      growthThnSaveLevelResult,
    ],
  );

  return (
    <GrowthThnDiscContext.Provider value={value}>
      {children}
    </GrowthThnDiscContext.Provider>
  );
}

export function useGrowthThnDisc() {
  const growthThnCtx = useContext(GrowthThnDiscContext);
  if (!growthThnCtx) {
    throw new Error('useGrowthThnDisc must be used within GrowthThnDiscProvider');
  }
  return growthThnCtx;
}
