import type {GrowthThnDiscLevel} from './GrowthThnDiscTypes';

export const growthThnDiscLevels: GrowthThnDiscLevel[] = [
  {id: 1, discCount: 3, difficulty: 'Starter', minMoves: 7},
  {id: 2, discCount: 4, difficulty: 'Easy', minMoves: 15},
  {id: 3, discCount: 5, difficulty: 'Medium', minMoves: 31},
  {id: 4, discCount: 6, difficulty: 'Hard', minMoves: 63},
  {id: 5, discCount: 7, difficulty: 'Expert', minMoves: 127},
  {id: 6, discCount: 8, difficulty: 'Master', minMoves: 255},
];

export function growthThnGetDiscLevel(levelId: number): GrowthThnDiscLevel {
  return (
    growthThnDiscLevels.find(level => level.id === levelId) ?? growthThnDiscLevels[0]
  );
}
