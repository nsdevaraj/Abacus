export enum Operation {
  ADD = 'addition',
  SUB = 'subtraction',
  MUL = 'multiplication',
  DIV = 'division',
  SQRT = 'square_root'
}

export interface LevelConfig {
  id: number;
  title: string;
  abacusDesc: string;
  mentalDesc: string;
  operations: Operation[];
  digitRange: [number, number]; // Min/Max digits per operand
  decimalPlaces: number;
  allowNegative: boolean;
}

export interface MathProblem {
  id: string;
  expression: string;
  answer: number;
  operation: Operation;
}

export interface AbacusState {
  columns: number[]; // Array of values 0-9 for each column
}
