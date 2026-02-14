import { LevelConfig, Operation, MathProblem } from '../types';

export const SYLLABUS: LevelConfig[] = [
  {
    id: 1,
    title: "Foundation Abacus",
    abacusDesc: "Introduction to the abacus, bead values, fingering techniques, and 1-digit addition/subtraction (simple and 5-complement).",
    mentalDesc: "Basic visualization of 1-digit numbers.",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [1, 1],
    decimalPlaces: 0,
    allowNegative: false
  },
  {
    id: 2,
    title: "Basic Addition/Subtraction",
    abacusDesc: "2-digit addition and subtraction, introducing 10-complements.",
    mentalDesc: "Introduction to 1-digit visualization.",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [2, 2],
    decimalPlaces: 0,
    allowNegative: false
  },
  {
    id: 3,
    title: "Intermediate Addition/Subtraction",
    abacusDesc: "3-digit addition/subtraction, 10-complement application.",
    mentalDesc: "Increased rows for mental math.",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [3, 3],
    decimalPlaces: 0,
    allowNegative: false
  },
  {
    id: 4,
    title: "Introduction to Multiplication",
    abacusDesc: "4-digit addition/subtraction, multiplication (2-digit × 1-digit).",
    mentalDesc: "1 & 2 digit addition/subtraction.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL],
    digitRange: [1, 4], // Logic handles specific mult rules
    decimalPlaces: 0,
    allowNegative: false
  },
  {
    id: 5,
    title: "Introduction to Division",
    abacusDesc: "5-digit addition/subtraction, 3-digit × 1-digit multiplication, 3-digit / 1-digit division.",
    mentalDesc: "Introduction to multiplication.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
    digitRange: [1, 5],
    decimalPlaces: 0,
    allowNegative: false
  },
  {
    id: 6,
    title: "Advanced Multiplication & Decimals",
    abacusDesc: "3-digit decimal addition/subtraction, 4-digit × 1-digit multiplication, division.",
    mentalDesc: "2-digit calculations.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
    digitRange: [1, 5],
    decimalPlaces: 2,
    allowNegative: false
  },
  {
    id: 7,
    title: "Complex Operations",
    abacusDesc: "Negative calculations, 3-digit × 2-digit multiplication, 4-digit / 2-digit division, decimals.",
    mentalDesc: "Advanced multiplication.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
    digitRange: [2, 4],
    decimalPlaces: 2,
    allowNegative: true
  },
  {
    id: 8,
    title: "Final Mastery",
    abacusDesc: "4-5 digit calculations, square roots (3-4 digits), complex division, and mixed operations.",
    mentalDesc: "High-speed mental arithmetic, BODMAS rules, complex decimals.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.SQRT],
    digitRange: [3, 5],
    decimalPlaces: 3,
    allowNegative: true
  }
];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

export const generateProblem = (level: LevelConfig): MathProblem => {
  const op = level.operations[getRandomInt(0, level.operations.length - 1)];
  const isDecimal = level.decimalPlaces > 0;
  
  // Helpers
  const getNum = (digits: number) => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    if (isDecimal) {
      return getRandomFloat(min / 10, max / 10, level.decimalPlaces);
    }
    return getRandomInt(min, max);
  };

  let num1 = 0;
  let num2 = 0;
  let answer = 0;
  let expression = "";

  // Level specific overrides for multiplication/division sizes
  switch (op) {
    case Operation.ADD:
    case Operation.SUB: {
      const digits = level.id >= 4 ? level.id : level.digitRange[0]; // Scale digits with level for add/sub
      num1 = getNum(digits);
      num2 = getNum(digits);
      
      if (op === Operation.SUB && !level.allowNegative && num1 < num2) {
        [num1, num2] = [num2, num1]; // Swap to avoid negative
      }
      
      answer = op === Operation.ADD ? num1 + num2 : num1 - num2;
      expression = `${num1} ${op === Operation.ADD ? '+' : '-'} ${num2}`;
      break;
    }
    case Operation.MUL: {
      // Level 4: 2x1, Level 5: 3x1, Level 6: 4x1, Level 7: 3x2
      let d1 = 2; 
      let d2 = 1;
      if (level.id === 5) d1 = 3;
      if (level.id === 6) d1 = 4;
      if (level.id === 7) { d1 = 3; d2 = 2; }
      if (level.id === 8) { d1 = 4; d2 = 2; } // Just estimation for level 8

      num1 = getRandomInt(Math.pow(10, d1-1), Math.pow(10, d1)-1);
      num2 = getRandomInt(Math.pow(10, d2-1), Math.pow(10, d2)-1);
      
      // Decimals for higher levels
      if (level.id >= 6 && Math.random() > 0.5) {
         num1 = getRandomFloat(10, 100, 1);
      }

      answer = num1 * num2;
      expression = `${num1} × ${num2}`;
      break;
    }
    case Operation.DIV: {
       // Level 5: 3d / 1d, Level 7: 4d / 2d
       let d1 = 3;
       let d2 = 1;
       if (level.id >= 7) { d1 = 4; d2 = 2; }
       
       const divisor = getRandomInt(Math.pow(10, d2-1), Math.pow(10, d2)-1);
       const quotient = getRandomInt(Math.pow(10, d1-d2), Math.pow(10, d1-d2+1)-1); // Approx range
       
       // Clean division mostly
       num2 = divisor;
       num1 = divisor * quotient;
       answer = quotient;
       expression = `${num1} ÷ ${num2}`;
       break;
    }
    case Operation.SQRT: {
       const root = getRandomInt(10, 99);
       num1 = root * root;
       answer = root;
       expression = `√${num1}`;
       break;
    }
  }

  // Formatting for display
  if (isDecimal) {
      answer = parseFloat(answer.toFixed(level.decimalPlaces));
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    expression,
    answer,
    operation: op
  };
};