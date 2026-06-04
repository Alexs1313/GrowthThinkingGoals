import type {GrowthThnDiscDifficulty} from '../growthThnData/GrowthThnDiscTypes';

export type GrowthThnDiscPegs = [number[], number[], number[]];

/** Third column (peg labeled "3") — win when all discs are here. */
export const GROWTH_THN_DISC_GOAL_PEG = 2;

/** Stack bottom = largest (discCount), top = smallest (1). */
export function growthThnDiscInitPegs(discCount: number): GrowthThnDiscPegs {
  const growthThnStack = Array.from(
    {length: discCount},
    (_, i) => discCount - i,
  );
  return [growthThnStack, [], []];
}

export function growthThnDiscGetTopDisc(
  pegs: GrowthThnDiscPegs,
  pegIndex: number,
): number | null {
  const growthThnStack = pegs[pegIndex];
  return growthThnStack.length > 0
    ? growthThnStack[growthThnStack.length - 1]
    : null;
}

export function growthThnDiscCanMove(
  pegs: GrowthThnDiscPegs,
  fromPeg: number,
  toPeg: number,
): boolean {
  if (fromPeg === toPeg) {
    return false;
  }
  const growthThnDisc = growthThnDiscGetTopDisc(pegs, fromPeg);
  if (growthThnDisc === null) {
    return false;
  }
  const growthThnTarget = growthThnDiscGetTopDisc(pegs, toPeg);
  return growthThnTarget === null || growthThnTarget > growthThnDisc;
}

export function growthThnDiscMove(
  pegs: GrowthThnDiscPegs,
  fromPeg: number,
  toPeg: number,
): GrowthThnDiscPegs | null {
  if (!growthThnDiscCanMove(pegs, fromPeg, toPeg)) {
    return null;
  }
  const growthThnNext: GrowthThnDiscPegs = [
    [...pegs[0]],
    [...pegs[1]],
    [...pegs[2]],
  ];
  const growthThnDisc = growthThnNext[fromPeg].pop()!;
  growthThnNext[toPeg].push(growthThnDisc);
  return growthThnNext;
}

export function growthThnDiscIsComplete(
  pegs: GrowthThnDiscPegs,
  discCount: number,
): boolean {
  const growthThnGoal = pegs[GROWTH_THN_DISC_GOAL_PEG];
  if (growthThnGoal.length !== discCount) {
    return false;
  }
  for (let i = 0; i < growthThnGoal.length - 1; i++) {
    if (growthThnGoal[i] <= growthThnGoal[i + 1]) {
      return false;
    }
  }
  return (
    growthThnGoal[0] === discCount &&
    growthThnGoal[growthThnGoal.length - 1] === 1
  );
}

export function growthThnDiscIsBetterRecord(
  moves: number,
  seconds: number,
  record?: {bestMoves: number; bestSeconds: number},
): boolean {
  if (!record) {
    return true;
  }
  if (moves < record.bestMoves) {
    return true;
  }
  return moves === record.bestMoves && seconds < record.bestSeconds;
}

export function growthThnDiscGetDifficultyStyle(
  difficulty: GrowthThnDiscDifficulty,
): {backgroundColor: string; color: string} {
  switch (difficulty) {
    case 'Starter':
      return {backgroundColor: '#0f2a14', color: '#22c55e'};
    case 'Easy':
      return {backgroundColor: '#0f1a2e', color: '#60a5fa'};
    case 'Medium':
      return {backgroundColor: '#2a2208', color: '#ffd700'};
    case 'Hard':
      return {backgroundColor: '#2a0c0c', color: '#f87171'};
    case 'Expert':
      return {backgroundColor: '#1f0808', color: '#dc2626'};
    case 'Master':
      return {backgroundColor: '#140606', color: '#991b1b'};
    default:
      return {backgroundColor: '#2a0c0c', color: growthThnColorsFallback()};
  }
}

function growthThnColorsFallback(): string {
  return '#ffd700';
}

export function growthThnDiscGetDiscColor(
  discSize: number,
  discCount: number,
): string {
  const growthThnColors = [
    '#ffff00',
    '#ffc933',
    '#ff9f1a',
    '#ff6b1a',
    '#ef4444',
    '#c41500',
    '#8b1a1a',
    '#4a1515',
  ];
  const growthThnRatio = discCount <= 1 ? 0 : (discSize - 1) / (discCount - 1);
  const growthThnIndex = Math.min(
    growthThnColors.length - 1,
    Math.round(growthThnRatio * (growthThnColors.length - 1)),
  );
  return growthThnColors[growthThnIndex];
}

export function growthThnDiscGetDiscWidth(
  discSize: number,
  discCount: number,
  boardWidth: number,
): number {
  const growthThnMin = boardWidth * 0.28;
  const growthThnMax = boardWidth * 0.92;
  const growthThnRatio = discCount <= 1 ? 0 : (discSize - 1) / (discCount - 1);
  return growthThnMin + (growthThnMax - growthThnMin) * growthThnRatio;
}

/** Max discs on the hardest level — peg/rod height is fixed to this. */
export const GROWTH_THN_DISC_MAX_COUNT = 8;

export const GROWTH_THN_DISC_ITEM_HEIGHT = 14;
export const GROWTH_THN_DISC_STACK_GAP = 2;
export const GROWTH_THN_DISC_PEG_BASE_H = 10;

export function growthThnDiscStackStep(): number {
  return GROWTH_THN_DISC_ITEM_HEIGHT + GROWTH_THN_DISC_STACK_GAP;
}

/** Peg column height — identical on every level. */
export function growthThnCalcFixedPegAreaHeight(): number {
  const growthThnStep = growthThnDiscStackStep();
  const growthThnStackTopPad = 12;
  return (
    GROWTH_THN_DISC_PEG_BASE_H +
    growthThnStackTopPad +
    GROWTH_THN_DISC_MAX_COUNT * growthThnStep
  );
}

/** Vertical rod above the base — identical on every peg and level. */
export function growthThnCalcFixedRodHeight(): number {
  return growthThnCalcFixedPegAreaHeight() - GROWTH_THN_DISC_PEG_BASE_H;
}
