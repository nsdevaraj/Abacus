
export enum Operation {
  ADD = 'addition',
  SUB = 'subtraction',
  MUL = 'multiplication',
  DIV = 'division',
  SQRT = 'square_root',
  FRACTION = 'fractions',
  PERCENT = 'percentage',
  BODMAS = 'bodmas'
}

export interface LevelConfig {
  id: number;
  label?: string;
  title: string;
  abacusDesc: string;
  mentalDesc: string;
  operations: Operation[];
  digitRange: [number, number];
  decimalPlaces: number;
  allowNegative: boolean;
  stages: StageConfig[];
}

export interface StageConfig {
  name: string;
  operations: Operation[];
  range: [number, number]; // index range within the 100 exercises e.g. [1, 25]
  description: string;
}

export interface MathProblem {
  id: string;
  expression: string;
  answer: number;
  operation: Operation;
  index: number;
  levelId: number;
}

export interface UserProgress {
  levelId: number;
  completedIndices: number[];
  coins: number;
  streak: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  solved: number;
  lastLevelId: number;
}
