
import { LevelConfig, Operation, MathProblem, StageConfig } from '../types';

export const JUNIOR_SYLLABUS: LevelConfig[] = [
  {
    id: 1,
    label: "Island 1",
    title: "Abacus & Finger Theory",
    abacusDesc: "Introduction to beads and +/- 5 combinations. 1 to 99 numbers.",
    mentalDesc: "Visualizing 1-digit simple addition/subtraction.",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [1, 2],
    decimalPlaces: 0,
    allowNegative: false,
    stages: [
      { name: "Bead Basics", operations: [Operation.ADD], range: [1, 25], description: "Simple 1-digit addition." },
      { name: "+5 Combinations", operations: [Operation.ADD], range: [26, 50], description: "Test Week 1 focus." },
      { name: "-5 Combinations", operations: [Operation.SUB], range: [51, 75], description: "Test Week 2 focus." },
      { name: "2-Digit Simple", operations: [Operation.ADD, Operation.SUB], range: [76, 100], description: "10-99 range basics." }
    ]
  },
  {
    id: 2,
    label: "Island 2",
    title: "+10 Combinations",
    abacusDesc: "Mastering the carry rule with 10-complements. 1 to 99 range.",
    mentalDesc: "Fast 1-digit +/- 5 visualization.",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [1, 2],
    decimalPlaces: 0,
    allowNegative: false,
    stages: [
      { name: "Friends of 10 (+)", operations: [Operation.ADD], range: [1, 33], description: "Test Week 3 focus." },
      { name: "Advanced +10", operations: [Operation.ADD], range: [34, 66], description: "Test Week 4 focus." },
      { name: "2-Digit Integration", operations: [Operation.ADD, Operation.SUB], range: [67, 100], description: "Test Week 5 focus." }
    ]
  },
  {
    id: 3,
    label: "Island 3",
    title: "-10 Combinations",
    abacusDesc: "Mastering borrowing with 10-complements. 1 to 99 range.",
    mentalDesc: "Mixed +/- 5 combinations mental practice.",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [1, 2],
    decimalPlaces: 0,
    allowNegative: false,
    stages: [
      { name: "Friends of 10 (-)", operations: [Operation.SUB], range: [1, 40], description: "Test Week 6 focus." },
      { name: "-10 Logic", operations: [Operation.SUB], range: [41, 80], description: "Test Week 7 focus." },
      { name: "2-Digit Mastery", operations: [Operation.ADD, Operation.SUB], range: [81, 100], description: "Test Week 8 focus." }
    ]
  },
  {
    id: 4,
    label: "Island 4",
    title: "Combination Fusion",
    abacusDesc: "Integrating all +/- 5 and +10 combinations. Numbers 1-99.",
    mentalDesc: "1 & 2 digit mental theory (non-combination).",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [1, 2],
    decimalPlaces: 0,
    allowNegative: false,
    stages: [
      { name: "Fused Theory", operations: [Operation.ADD, Operation.SUB], range: [1, 50], description: "All combinations mix." },
      { name: "Mental Prep", operations: [Operation.ADD, Operation.SUB], range: [51, 100], description: "Non-combination speed focus." }
    ]
  },
  {
    id: 5,
    label: "Island 5",
    title: "Intro to Multiplication",
    abacusDesc: "Double combinations (-10, +6 to +9, -6 to -9). Multiplication 2x1.",
    mentalDesc: "Mental +/- 5, +/- 10 combinations.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL],
    digitRange: [1, 2],
    decimalPlaces: 0,
    allowNegative: false,
    stages: [
      { name: "Double Combinations", operations: [Operation.ADD, Operation.SUB], range: [1, 40], description: "Complex +/- 6-9 moves." },
      { name: "Mult Basics (2x1)", operations: [Operation.MUL], range: [41, 70], description: "Tables 1-9 focus." },
      { name: "Mixed Mental", operations: [Operation.ADD, Operation.SUB], range: [71, 100], description: "Level 5 mental theory." }
    ]
  },
  {
    id: 6,
    label: "Island 6",
    title: "Decimals & Large Mult",
    abacusDesc: "2 & 3 digit combinations. Decimals (3 digits). Mult up to 4x1.",
    mentalDesc: "2-digit all combinations mental add/sub.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL],
    digitRange: [2, 4],
    decimalPlaces: 2,
    allowNegative: false,
    stages: [
      { name: "3-Digit Add/Sub", operations: [Operation.ADD, Operation.SUB], range: [1, 30], description: "All combinations." },
      { name: "Decimal Intro", operations: [Operation.ADD, Operation.SUB], range: [31, 60], description: "3-digit decimal focus." },
      { name: "Advanced Mult", operations: [Operation.MUL], range: [61, 100], description: "2x1, 3x1, and 4x1 logic." }
    ]
  },
  {
    id: 7,
    label: "Island 7",
    title: "Division Journey",
    abacusDesc: "Up to 4-digit combinations. Decimals (4 digits). Mult 2x2. Div up to 4÷1.",
    mentalDesc: "2 & 3 digit mental theory with decimals.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
    digitRange: [2, 4],
    decimalPlaces: 3,
    allowNegative: false,
    stages: [
      { name: "4-Digit Mastery", operations: [Operation.ADD, Operation.SUB], range: [1, 25], description: "All combinations." },
      { name: "Mult 2x2", operations: [Operation.MUL], range: [26, 50], description: "Grid multiplication." },
      { name: "Division (4÷1)", operations: [Operation.DIV], range: [51, 75], description: "Basic quotient moves." },
      { name: "Decimal Flow", operations: [Operation.ADD, Operation.SUB], range: [76, 100], description: "4-digit decimal focus." }
    ]
  },
  {
    id: 8,
    label: "Island 8",
    title: "Mastery Operations",
    abacusDesc: "Mult 3x2. Div up to 4÷2. 3 & 4 digit complex combinations.",
    mentalDesc: "Mental 4-digit decimals and 2x2 mult.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
    digitRange: [3, 4],
    decimalPlaces: 4,
    allowNegative: true,
    stages: [
      { name: "Complex Mix", operations: [Operation.ADD, Operation.SUB], range: [1, 30], description: "High speed 4-digit." },
      { name: "Mult 3x2", operations: [Operation.MUL], range: [31, 60], description: "Larger factors." },
      { name: "Div (4÷2)", operations: [Operation.DIV], range: [61, 100], description: "Multi-digit divisor logic." }
    ]
  },
  {
    id: 9,
    label: "Island 9",
    title: "Fractions & BODMAS",
    abacusDesc: "4 & 5 digit add/sub. Mult 4x2. Div up to 5÷2. Fractions & BODMAS.",
    mentalDesc: "Mental 2x2 and 3x2 multiplication.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.FRACTION, Operation.BODMAS],
    digitRange: [4, 5],
    decimalPlaces: 0,
    allowNegative: true,
    stages: [
      { name: "5-Digit Precision", operations: [Operation.ADD, Operation.SUB], range: [1, 25], description: "Massive bead control." },
      { name: "Div 5÷2", operations: [Operation.DIV], range: [26, 50], description: "Elite division." },
      { name: "Fraction Intro", operations: [Operation.FRACTION], range: [51, 75], description: "Conversions & basic add." },
      { name: "Order of Ops", operations: [Operation.BODMAS], range: [76, 100], description: "Brackets and priority." }
    ]
  },
  {
    id: 10,
    label: "Island 10",
    title: "Percentages & Combined",
    abacusDesc: "3x3 Mult, 4x2 Mult. 5-digit decimals. Fractions combined. Percentages.",
    mentalDesc: "Mental decimal mult/div and fractions.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.FRACTION, Operation.PERCENT],
    digitRange: [4, 5],
    decimalPlaces: 5,
    allowNegative: true,
    stages: [
      { name: "Mult 3x3", operations: [Operation.MUL], range: [1, 30], description: "Ultimate multiplication." },
      { name: "Percentage Path", operations: [Operation.PERCENT], range: [31, 60], description: "Interest and ratios." },
      { name: "Decimal Master", operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV], range: [61, 100], description: "Decimal complexity." }
    ]
  },
  {
    id: 11,
    label: "Island 11",
    title: "Grand Mastery",
    abacusDesc: "5÷2 Div. Square Roots (3 & 4 digits). Combined operations.",
    mentalDesc: "Mixed calculations with BODMAS rule.",
    operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.SQRT, Operation.BODMAS],
    digitRange: [4, 5],
    decimalPlaces: 5,
    allowNegative: true,
    stages: [
      { name: "Root Seeker", operations: [Operation.SQRT], range: [1, 40], description: "3 & 4 digit roots." },
      { name: "Elite BODMAS", operations: [Operation.BODMAS], range: [41, 100], description: "The final mental test." }
    ]
  }
];

export const SENIOR_SYLLABUS: LevelConfig[] = [
  {
    id: 21,
    label: "Island 1",
    title: "Abacus & Finger Theory",
    abacusDesc: "Abacus & Finger Theory, Addition & subtraction, 1 to 99 numbers, +5 combination - 5 combinations and + 10 combinations",
    mentalDesc: "Addition & subtraction, 1 & 2 digits (non combination), Lower and upper beads",
    operations: [Operation.ADD, Operation.SUB],
    digitRange: [1, 2],
    decimalPlaces: 0,
    allowNegative: false,
    stages: [
        { name: "Basics", operations: [Operation.ADD, Operation.SUB], range: [1, 50], description: "1 to 99 numbers, +5/-5 combinations" },
        { name: "+10 Combinations", operations: [Operation.ADD], range: [51, 100], description: "+10 combinations" }
    ]
  },
  {
      id: 22,
      label: "Island 2",
      title: "Level 1",
      abacusDesc: "Addition & subtraction (-10 combinations, +6 to +9 and -6 to -9 double combinations). Multiplication 2 digits x 1 digit (with tables 1 to 9)",
      mentalDesc: "Addition & subtraction, 1 & 2 digits, +5 combination, -5 combination (+10 combinations)",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL],
      digitRange: [1, 2],
      decimalPlaces: 0,
      allowNegative: false,
      stages: [
          { name: "-10 & Double", operations: [Operation.ADD, Operation.SUB], range: [1, 50], description: "-10 and double combinations" },
          { name: "Multiplication", operations: [Operation.MUL], range: [51, 100], description: "2 digits x 1 digit" }
      ]
  },
  {
      id: 23,
      label: "Island 3",
      title: "Level 2",
      abacusDesc: "Addition & subtraction 2 & 3digits all combinations, Decimals 3 digits decimal addition and subtraction. Multiplication 2 digits x 1digit, 3digits x 1 digit and 4 digit x1 digit.",
      mentalDesc: "Addition & subtraction 2 digits all combinations, Multiplication 2 digits x 1digit, 3digits x 1 digit",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL],
      digitRange: [2, 3],
      decimalPlaces: 3,
      allowNegative: false,
      stages: [
          { name: "Add/Sub Mixed", operations: [Operation.ADD, Operation.SUB], range: [1, 40], description: "2 & 3 digits all combinations" },
          { name: "Decimals", operations: [Operation.ADD, Operation.SUB], range: [41, 70], description: "3 digits decimal addition and subtraction" },
          { name: "Multiplication", operations: [Operation.MUL], range: [71, 100], description: "2x1, 3x1, 4x1" }
      ]
  },
  {
      id: 24,
      label: "Island 4",
      title: "Level 3",
      abacusDesc: "Addition & subtraction 2 3 & 4 digits all combinations, decimals 4 digits all combinations. Multiplication 3 & 4 digits x 1 digit, 2 digits x 2 digits. Division 2,3 and 4 digits ÷ 1 digits.",
      mentalDesc: "Addition & subtraction 2 & 3 digits all combinations, decimals 3 digits all combinations. Multiplication 2,3 and 4 digits x 1 digit",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
      digitRange: [2, 4],
      decimalPlaces: 4,
      allowNegative: false,
      stages: [
          { name: "Large Add/Sub", operations: [Operation.ADD, Operation.SUB], range: [1, 30], description: "2, 3 & 4 digits all combinations" },
          { name: "Multiplication", operations: [Operation.MUL], range: [31, 60], description: "3x1, 4x1, 2x2" },
          { name: "Division", operations: [Operation.DIV], range: [61, 100], description: "2,3,4 digits ÷ 1 digit" }
      ]
  },
  {
      id: 25,
      label: "Island 5",
      title: "Level 4",
      abacusDesc: "Addition & subtraction (3 & 4 digits all combinations). Multiplication (2x2 digits, 3×2 digits). Division 3÷1 digits, 4÷1 digit, 3÷2 digits and 4÷2digits",
      mentalDesc: "Addition & subtraction (2&3 digits all combinations). Decimal 4 digits all combinations. Multiplication 3 x 1 digit,4×1 digit 2 x 2 digits. Division 2÷1 digit, 3÷1digit, 4÷1digit",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV],
      digitRange: [3, 4],
      decimalPlaces: 0,
      allowNegative: false,
      stages: [
          { name: "Add/Sub", operations: [Operation.ADD, Operation.SUB], range: [1, 30], description: "3 & 4 digits all combinations" },
          { name: "Multiplication", operations: [Operation.MUL], range: [31, 60], description: "2x2, 3x2 digits" },
          { name: "Division", operations: [Operation.DIV], range: [61, 100], description: "3÷1, 4÷1, 3÷2, 4÷2" }
      ]
  },
  {
      id: 26,
      label: "Island 6",
      title: "Level 5",
      abacusDesc: "Addition & subtraction (4 & 5 digits all combinations). Multiplication 4 x 2 digits. Division 3÷2 digits, 4÷2 digits and 5÷2 digits. Fractions Conversion. BODMAS",
      mentalDesc: "Addition & subtraction (2&3 digits all combinations). Decimal 4 digits all combinations. Multiplication 2x2 digits, 3×2 digits. Division 4÷1 digit, 3÷2. Fractions conversion. Simple addition and subtraction",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.FRACTION, Operation.BODMAS],
      digitRange: [4, 5],
      decimalPlaces: 0,
      allowNegative: true,
      stages: [
          { name: "Large Ops", operations: [Operation.ADD, Operation.SUB], range: [1, 25], description: "4 & 5 digits all combinations" },
          { name: "Mul/Div", operations: [Operation.MUL, Operation.DIV], range: [26, 50], description: "4x2 Mul, 3÷2, 4÷2, 5÷2 Div" },
          { name: "Fractions", operations: [Operation.FRACTION], range: [51, 75], description: "Fractions Conversion" },
          { name: "BODMAS", operations: [Operation.BODMAS], range: [76, 100], description: "BODMAS" }
      ]
  },
  {
      id: 27,
      label: "Island 7",
      title: "Level 6",
      abacusDesc: "Addition & subtraction (4 and 5 digits all combinations). Decimal 5 digits all combinations. Multiplication 3×3 digits, 4×2 digits. Division 4÷2 digits, 5÷2 digits. Fractions combined operations. Percentage",
      mentalDesc: "Addition & subtraction 2×3 digits all combinations. Decimal 5 digits all combinations. Multiplication 3 x 2 digits. Division 4÷1digits, 3÷2 digits. Decimal additions subtractions. Decimal multiplication. Decimal divisions. Fractions",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.FRACTION, Operation.PERCENT],
      digitRange: [4, 5],
      decimalPlaces: 5,
      allowNegative: true,
      stages: [
          { name: "Decimal Mastery", operations: [Operation.ADD, Operation.SUB], range: [1, 30], description: "Decimal 5 digits all combinations" },
          { name: "Advanced Mul/Div", operations: [Operation.MUL, Operation.DIV], range: [31, 60], description: "3x3, 4x2 Mul; 4÷2, 5÷2 Div" },
          { name: "Fractions & %", operations: [Operation.FRACTION, Operation.PERCENT], range: [61, 100], description: "Fractions combined, Percentage" }
      ]
  },
  {
      id: 28,
      label: "Island 8",
      title: "Level 7",
      abacusDesc: "Addition & subtraction 4 and 5 digits all combinations. Division 5÷2 digits. Square roots 3 and 4 digits combined operations",
      mentalDesc: "Addition & subtraction (3 and 4 digits all combinations). Mixed calculations (÷, -, x, +) with bodmas rule. Decimal 5 digits all combinations. Multiplication 3×2 digits. Division 4÷1 digits, 3÷2 digits. Decimal additions subtractions. Decimal multiplication. Decimal divisions. Fractions",
      operations: [Operation.ADD, Operation.SUB, Operation.MUL, Operation.DIV, Operation.SQRT, Operation.BODMAS],
      digitRange: [4, 5],
      decimalPlaces: 5,
      allowNegative: true,
      stages: [
          { name: "Final Add/Sub", operations: [Operation.ADD, Operation.SUB], range: [1, 30], description: "4 and 5 digits all combinations" },
          { name: "Div & Roots", operations: [Operation.DIV, Operation.SQRT], range: [31, 70], description: "Division 5÷2 digits, Square roots" },
          { name: "Mixed Ops", operations: [Operation.BODMAS], range: [71, 100], description: "Mixed calculations with bodmas rule" }
      ]
  }
];

export const ALL_LEVELS = [...JUNIOR_SYLLABUS, ...SENIOR_SYLLABUS];

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const getProblemForIndex = (level: LevelConfig, index: number, masterSeed: number = 0): MathProblem => {
  const stage = level.stages.find(s => index >= s.range[0] && index <= s.range[1]) || level.stages[0];
  const seed = masterSeed + level.id * 10000 + index; // Seed incorporating masterSeed
  const rand = seededRandom(seed);
  
  const op = stage.operations[Math.floor(rand * stage.operations.length)];
  let num1 = 0, num2 = 0, answer = 0, expression = "";

  switch (op) {
    case Operation.ADD:
    case Operation.SUB: {
      const isDecimal = level.decimalPlaces > 0 && (
        index > 30 ||
        stage.name.toLowerCase().includes('decimal') ||
        stage.description.toLowerCase().includes('decimal')
      );
      const dMin = level.digitRange[0];
      const dMax = level.digitRange[1];
      const d = dMin + Math.floor(seededRandom(seed + 1) * (dMax - dMin + 1));
      const rangeVal = Math.pow(10, d);

      num1 = Math.floor(seededRandom(seed + 2) * (rangeVal - rangeVal/10)) + rangeVal/10;
      num2 = Math.floor(seededRandom(seed + 3) * (rangeVal - rangeVal/10)) + rangeVal/10;

      if (isDecimal) {
        num1 = Number((num1 / 10).toFixed(level.decimalPlaces));
        num2 = Number((num2 / 10).toFixed(level.decimalPlaces));
      }

      if (op === Operation.SUB && !level.allowNegative && num1 < num2) {
        [num1, num2] = [num2, num1];
      }

      answer = op === Operation.ADD ? num1 + num2 : num1 - num2;
      if (isDecimal) {
        answer = Number(answer.toFixed(level.decimalPlaces));
      }
      expression = `${num1} ${op === Operation.ADD ? '+' : '-'} ${num2}`;
      break;
    }

    case Operation.MUL: {
      if (level.decimalPlaces > 0) {
         num1 = Math.floor(seededRandom(seed + 1) * 90) + 10;
         num2 = Math.floor(seededRandom(seed + 2) * 90) + 10;
         num1 = Number((num1 / 10).toFixed(level.decimalPlaces));
         num2 = Number((num2 / 10).toFixed(level.decimalPlaces));
         answer = Number((num1 * num2).toFixed(level.decimalPlaces));
         expression = `${num1} × ${num2}`;
      } else {
         // Check for Advanced Multiplication levels (3x3)
         if (level.id >= 10 || level.id >= 27) {
            num1 = Math.floor(seededRandom(seed + 1) * 900) + 100;
            num2 = Math.floor(seededRandom(seed + 2) * 900) + 100;
         }
         // Check for Intermediate Multiplication levels (2x2 or 3x1)
         else if (level.id >= 7 || level.id >= 24) {
            const is2x2 = seededRandom(seed + 5) > 0.5;
            num1 = Math.floor(seededRandom(seed + 1) * 90) + 10;
            num2 = is2x2 ? Math.floor(seededRandom(seed + 2) * 90) + 10 : Math.floor(seededRandom(seed + 3) * 9) + 1;
         }
         // Basic 2x1 Multiplication
         else {
            num1 = Math.floor(seededRandom(seed + 1) * 90) + 10;
            num2 = Math.floor(seededRandom(seed + 2) * 8) + 2;
         }
         answer = num1 * num2;
         expression = `${num1} × ${num2}`;
      }
      break;
    }

    case Operation.DIV: {
      if (level.decimalPlaces > 0) {
          const divisor = Math.floor(seededRandom(seed + 1) * 90) + 10;
          const quot = Math.floor(seededRandom(seed + 2) * 90) + 10;

          num2 = Number((divisor / 10).toFixed(1));
          const tempAnswer = Number((quot / 10).toFixed(level.decimalPlaces));

          num1 = Number((num2 * tempAnswer).toFixed(level.decimalPlaces + 1));
          answer = tempAnswer;
          expression = `${num1} ÷ ${num2}`;
      } else {
          num2 = Math.floor(seededRandom(seed + 1) * 8) + 2;
          // Check for Advanced Division levels (multi-digit divisor)
          if (level.id >= 8 || level.id >= 25) {
            num2 = Math.floor(seededRandom(seed + 3) * 90) + 10;
          }
          const quotient = Math.floor(seededRandom(seed + 2) * 45) + 5;
          num1 = num2 * quotient;
          answer = quotient;
          expression = `${num1} ÷ ${num2}`;
      }
      break;
    }

    case Operation.SQRT: {
      const root = Math.floor(seededRandom(seed + 1) * 90) + 10;
      num1 = root * root;
      answer = root;
      expression = `√${num1}`;
      break;
    }

    case Operation.FRACTION: {
      if (level.id === 26) {
          const den = [2, 4, 5, 8, 10][Math.floor(seededRandom(seed + 1) * 5)];
          const num = Math.floor(seededRandom(seed + 2) * (den - 1)) + 1;
          expression = `Decimal of ${num}/${den}`;
          answer = num / den;
      } else {
          const den = [2, 4, 5, 10][Math.floor(seededRandom(seed + 1) * 4)];
          const num = Math.floor(seededRandom(seed + 2) * (den - 1)) + 1;
          const total = Math.floor(seededRandom(seed + 3) * 10) * den + den;
          answer = (num / den) * total;
          expression = `${num}/${den} of ${total}`;
      }
      break;
    }

    case Operation.PERCENT: {
      const percent = [10, 20, 25, 50, 75][Math.floor(seededRandom(seed + 1) * 5)];
      const total = (Math.floor(seededRandom(seed + 2) * 10) + 1) * 40;
      answer = (percent / 100) * total;
      expression = `${percent}% of ${total}`;
      break;
    }

    case Operation.BODMAS: {
      const n1 = Math.floor(seededRandom(seed + 1) * 20) + 1;
      const n2 = Math.floor(seededRandom(seed + 2) * 10) + 1;
      const n3 = Math.floor(seededRandom(seed + 3) * 5) + 1;
      expression = `(${n1} + ${n2}) × ${n3}`;
      answer = (n1 + n2) * n3;
      break;
    }

    default: {
      // Fallback to a simple addition problem if operation is not handled
      num1 = Math.floor(seededRandom(seed + 1) * 9) + 1;
      num2 = Math.floor(seededRandom(seed + 2) * 9) + 1;
      answer = num1 + num2;
      expression = `${num1} + ${num2}`;
      break;
    }
  }

  return {
    id: `${level.id}-${index}-${seed}`,
    expression,
    answer: Number(answer.toFixed(level.decimalPlaces || 0)),
    operation: op,
    index,
    levelId: level.id
  };
};
