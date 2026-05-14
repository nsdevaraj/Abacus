export enum Operation {
  ADD = 'addition',
  SUB = 'subtraction',
  MUL = 'multiplication',
  DIV = 'division',
  SQRT = 'square_root',
  FRACTION = 'fractions',
  PERCENT = 'percentage',
  BODMAS = 'bodmas',
  CODING = 'coding'
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
  expression: string;
  answer: number | string;
  operation: Operation;
  index: number;
  levelId: number;
  type: 'math' | 'coding';
  hint?: string;
  options?: string[];
  codingDetails?: {
    title: string;
    concepts: string;       // Level summary / Scratch block categories used
    projectId?: string;
    url?: string;
    // New story-based fields for the Scratch curriculum
    scenario?: string;      // The mission / story description
    category?: string;      // Primary Scratch block category for this story
    blocks?: string[];      // Suggested Scratch blocks the learner should use
    hints?: string[];       // Progressive hints, revealed one at a time
    stageName?: string;     // Stage name within the level
    levelTitle?: string;    // Level title
  };
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

export type AppMode = 'map' | 'learn' | 'practice' | 'calendar' | 'profile';
