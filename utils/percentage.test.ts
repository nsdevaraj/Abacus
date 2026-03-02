
import { expect, test, describe } from "bun:test";
import { getProblemForIndex, ALL_LEVELS } from "./syllabus";
import { Operation } from "../types";

describe("Percentage Operation in getProblemForIndex", () => {
  const percentageLevels = ALL_LEVELS.filter(level =>
    level.stages.some(stage => stage.operations.includes(Operation.PERCENT))
  );

  test("should have levels that use percentage", () => {
    expect(percentageLevels.length).toBeGreaterThan(0);
  });

  test("should generate valid percentage problems", () => {
    const validPercentages = [10, 20, 25, 50, 75];
    const generatedPercentages = new Set<number>();
    const generatedTotals = new Set<number>();

    percentageLevels.forEach(level => {
      level.stages.forEach(stage => {
        if (stage.operations.includes(Operation.PERCENT)) {
          // Check a sample of indices in the stage range to ensure coverage without excessive runtime
          const start = stage.range[0];
          const end = stage.range[1];
          const step = Math.max(1, Math.floor((end - start) / 10));

          for (let i = start; i <= end; i += step) {
            // Try different seeds to get good coverage
            for (let seedOffset = 0; seedOffset < 10; seedOffset++) {
              const problem = getProblemForIndex(level, i, seedOffset);

              if (problem.operation === Operation.PERCENT) {
                // 1. Verify expression format
                const match = problem.expression.match(/^(\d+)% of (\d+)$/);
                expect(match).not.toBeNull();

                const percent = parseInt(match![1]);
                const total = parseInt(match![2]);

                // 2. Verify percentage values
                expect(validPercentages).toContain(percent);
                generatedPercentages.add(percent);

                // 3. Verify total values
                expect(total % 40).toBe(0);
                expect(total).toBeGreaterThanOrEqual(40);
                expect(total).toBeLessThanOrEqual(400);
                generatedTotals.add(total);

                // 4. Verify answer calculation
                const expectedAnswer = (percent / 100) * total;
                expect(problem.answer).toBe(expectedAnswer);
              }
            }
          }
        }
      });
    });

    // Verify variety
    expect(generatedPercentages.size).toBe(validPercentages.length);
    expect(generatedTotals.size).toBeGreaterThan(1);
  });
});
