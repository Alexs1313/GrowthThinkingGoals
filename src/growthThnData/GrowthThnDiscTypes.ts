export type GrowthThnDiscDifficulty =
  | 'Starter'
  | 'Easy'
  | 'Medium'
  | 'Hard'
  | 'Expert'
  | 'Master';

export type GrowthThnDiscLevel = {
  id: number;
  discCount: number;
  difficulty: GrowthThnDiscDifficulty;
  minMoves: number;
};

export type GrowthThnDiscLevelRecord = {
  bestMoves: number;
  bestSeconds: number;
};

export type GrowthThnDiscRecordsMap = Record<number, GrowthThnDiscLevelRecord>;
