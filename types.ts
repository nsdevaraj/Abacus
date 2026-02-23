export enum Operation {
  ADD = 'addition',
  SUB = 'subtraction',
  MUL = 'multiplication',
  DIV = 'division',
  SQRT = 'square_root',
  FRACTION = 'fractions',
  PERCENT = 'percentage',
  BODMAS = 'bodmas',
  READING = 'reading',
  GRAMMAR = 'grammar',
  VOCAB = 'vocabulary',
  WRITING = 'creative_writing'
}

export interface LevelConfig {
  id: number;
  label?: string;
  title: string;
  abacusDesc: string;
  mentalDesc: string;
  operations: Operation[];
  digitRange?: [number, number];
  decimalPlaces?: number;
  allowNegative?: boolean;
  stages: StageConfig[];
}

export interface StageConfig {
  name: string;
  operations: Operation[];
  range: [number, number]; // index range within the 100 exercises e.g. [1, 25]
  description: string;
}

export interface Problem {
  id: string;
  expression: string; // For English: The question text
  answer: number | string;
  operation: Operation;
  index: number;
  levelId: number;
  type: 'math' | 'english';
  hint?: string;
  options?: string[];
}

// Backward compatibility alias (deprecated)
export type MathProblem = Problem;

export interface UserProgress {
  levelId: number;
  completedIndices: number[];
  completionDates: Record<number, string>; // exercise index → "DD/MM"
  coins: number;
  streak: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  solved: number;
  lastLevelId: number;
}

export type AppMode = 'map' | 'learn' | 'practice' | 'calendar' | 'courses' | 'profile';
