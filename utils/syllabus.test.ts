
import { expect, test, describe } from "bun:test";
import { getProblemForIndex, ALL_LEVELS } from "./syllabus";
import { Operation } from "../types";

describe("Division Logic in getProblemForIndex", () => {
  const divisionLevels = ALL_LEVELS.filter(level =>
    level.stages.some(stage => stage.operations.includes(Operation.DIV))
  );

  test("should generate valid and clean division problems", () => {
    divisionLevels.forEach(level => {
      level.stages.forEach(stage => {
        if (stage.operations.includes(Operation.DIV)) {
          for (let i = stage.range[0]; i <= stage.range[1]; i++) {
            // Try enough seeds to ensure we get a DIV problem
            let divProblemCount = 0;
            for (let seedOffset = 0; seedOffset < 10 && divProblemCount < 3; seedOffset++) {
              const problem = getProblemForIndex(level, i, seedOffset);
              if (problem.operation === Operation.DIV) {
                divProblemCount++;
                const parts = problem.expression.split(' ÷ ');
                expect(parts.length).toBe(2);
                const num1 = parseFloat(parts[0]);
                const num2 = parseFloat(parts[1]);

                // 1. Correctness
                const expectedAnswer = num1 / num2;
                // We use a small epsilon for floating point comparison but expect it to be very clean
                expect(problem.answer).toBeCloseTo(expectedAnswer, 10);

                // 2. Cleanliness of dividend (num1)
                // num1 should not have crazy floating point artifacts in string form
                expect(parts[0]).not.toMatch(/\d\.\d{10,}/);

                // 3. Cleanliness of divisor (num2)
                expect(parts[1]).not.toMatch(/\d\.\d{10,}/);
                expect(num2).not.toBe(0);

                // 4. Precision of answer
                const precision = level.decimalPlaces || 0;
                const answerStr = problem.answer.toString();
                const decimalPart = answerStr.split('.')[1];
                if (decimalPart) {
                    expect(decimalPart.length).toBeLessThanOrEqual(precision);
                }
              }
            }
          }
        }
      });
    });
  });

  test("should align with syllabus requirements (Syllabus Alignment Check)", () => {
    // Junior Island 7: "Div up to 4÷1"
    const island7 = ALL_LEVELS.find(l => l.id === 7)!;
    const stage3 = island7.stages[2]; // Division (4÷1)

    let maxDividend = 0;
    let maxDivisorDigits = 0;
    for (let i = stage3.range[0]; i <= stage3.range[1]; i++) {
        const problem = getProblemForIndex(island7, i, 0);
        if (problem.operation === Operation.DIV) {
            const parts = problem.expression.split(' ÷ ');
            const n1 = parseFloat(parts[0]);
            const n2 = parseFloat(parts[1]);
            maxDividend = Math.max(maxDividend, n1);
            maxDivisorDigits = Math.max(maxDivisorDigits, n2.toString().replace('.', '').length);
        }
    }

    // Island 7 should produce dividends up to 4 digits (e.g. > 1000) for "4÷1"
    // and divisor should be an integer
    expect(maxDividend).toBeGreaterThan(1000);

    // Senior Island 4: "Division 2,3 and 4 digits ÷ 1 digits"
    const seniorIsland4 = ALL_LEVELS.find(l => l.id === 24)!;
    const s4Stage3 = seniorIsland4.stages[2];
    let s4MaxDividend = 0;
    for (let i = s4Stage3.range[0]; i <= s4Stage3.range[1]; i++) {
        const problem = getProblemForIndex(seniorIsland4, i, 0);
        if (problem.operation === Operation.DIV) {
            const parts = problem.expression.split(' ÷ ');
            s4MaxDividend = Math.max(s4MaxDividend, parseFloat(parts[0]));
        }
    }
    expect(s4MaxDividend).toBeGreaterThan(1000);
  });

  test("should have varied decimal quotients in high levels", () => {
    // Junior Island 10 has decimalPlaces: 5
    const island10 = ALL_LEVELS.find(l => l.id === 10)!;

    let hasHighPrecision = false;
    for (let seed = 0; seed < 100; seed++) {
        const problem = getProblemForIndex(island10, 80, seed); // Stage "Decimal Master"
        if (problem.operation === Operation.DIV) {
            const answerStr = problem.answer.toString();
            const decimalPart = answerStr.split('.')[1];
            if (decimalPart && decimalPart.length > 1) {
                hasHighPrecision = true;
                break;
            }
        }
    }
    // High levels should have quotients with more than 1 decimal place variety
    expect(hasHighPrecision).toBe(true);
  });
});
