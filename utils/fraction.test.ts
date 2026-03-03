
import { expect, test, describe } from "bun:test";
import { getProblemForIndex, ALL_LEVELS } from "./syllabus";
import { Operation } from "../types";

describe("Fraction Operation in getProblemForIndex", () => {
  const fractionLevels = ALL_LEVELS.filter(level =>
    level.stages.some(stage => stage.operations.includes(Operation.FRACTION))
  );

  test("should have levels that use fraction", () => {
    expect(fractionLevels.length).toBeGreaterThan(0);
    const fractionLevelIds = fractionLevels.map(l => l.id);
    expect(fractionLevelIds).toContain(9);
    expect(fractionLevelIds).toContain(26);
    expect(fractionLevelIds).toContain(27);
  });

  test("should generate valid fraction problems for Senior Island 6 (Decimal of num/den)", () => {
    const level26 = ALL_LEVELS.find(l => l.id === 26)!;
    const validDenominators = [2, 4, 5, 8, 10];
    const stage = level26.stages.find(s => s.operations.includes(Operation.FRACTION))!;

    for (let i = stage.range[0]; i <= stage.range[1]; i++) {
      for (let seedOffset = 0; seedOffset < 5; seedOffset++) {
        const problem = getProblemForIndex(level26, i, seedOffset);
        if (problem.operation === Operation.FRACTION) {
          // Verify expression format
          const match = problem.expression.match(/^Decimal of (\d+)\/(\d+)$/);
          expect(match).not.toBeNull();

          const num = parseInt(match![1]);
          const den = parseInt(match![2]);

          // Verify values
          expect(validDenominators).toContain(den);
          expect(num).toBeGreaterThanOrEqual(1);
          expect(num).toBeLessThan(den);

          // Verify answer (taking rounding into account if it exists in current implementation)
          const expectedAnswer = Number((num / den).toFixed(level26.decimalPlaces || 0));
          expect(problem.answer).toBe(expectedAnswer);
        }
      }
    }
  });

  test("should generate valid fraction problems for other levels (num/den of total)", () => {
    const otherFractionLevels = fractionLevels.filter(l => l.id !== 26);
    const validDenominators = [2, 4, 5, 10];

    otherFractionLevels.forEach(level => {
      level.stages.forEach(stage => {
        if (stage.operations.includes(Operation.FRACTION)) {
          // Use a sample of indices to keep it fast
          const start = stage.range[0];
          const end = stage.range[1];
          const step = Math.max(1, Math.floor((end - start) / 5));

          for (let i = start; i <= end; i += step) {
            for (let seedOffset = 0; seedOffset < 5; seedOffset++) {
              const problem = getProblemForIndex(level, i, seedOffset);
              if (problem.operation === Operation.FRACTION) {
                // Verify expression format
                const match = problem.expression.match(/^(\d+)\/(\d+) of (\d+)$/);
                expect(match).not.toBeNull();

                const num = parseInt(match![1]);
                const den = parseInt(match![2]);
                const total = parseInt(match![3]);

                // Verify values
                expect(validDenominators).toContain(den);
                expect(num).toBeGreaterThanOrEqual(1);
                expect(num).toBeLessThan(den);
                expect(total % den).toBe(0);

                // Verify answer
                const expectedValue = (num / den) * total;
                const expectedAnswer = Number(expectedValue.toFixed(level.decimalPlaces || 0));
                expect(problem.answer).toBe(expectedAnswer);
              }
            }
          }
        }
      });
    });
  });
});
