import { expect, test, describe } from "bun:test";
import { getProblemForIndex, ENGLISH_SYLLABUS } from "./syllabus";
import { Operation } from "../types";

describe("English Syllabus", () => {
  test("should generate reading comprehension problems", () => {
    const level = ENGLISH_SYLLABUS[0]; // Reading
    const problem = getProblemForIndex(level, 0, 0);
    expect(problem.operation).toBe(Operation.READING);
    expect(problem.type).toBe('english');
    expect(typeof problem.answer).toBe('string');
    expect(problem.expression).toContain("The quick brown fox");
  });

  test("should generate grammar problems", () => {
    const level = ENGLISH_SYLLABUS[1]; // Grammar
    const problem = getProblemForIndex(level, 0, 0);
    expect(problem.operation).toBe(Operation.GRAMMAR);
    expect(problem.type).toBe('english');
    expect(typeof problem.answer).toBe('string');
    expect(problem.expression).toContain("Identify the noun");
  });

  test("should generate vocabulary problems", () => {
    const level = ENGLISH_SYLLABUS[2]; // Vocab
    const problem = getProblemForIndex(level, 0, 0);
    expect(problem.operation).toBe(Operation.VOCAB);
    expect(problem.type).toBe('english');
    expect(typeof problem.answer).toBe('string');
  });

  test("should generate writing problems", () => {
    const level = ENGLISH_SYLLABUS[3]; // Writing
    const problem = getProblemForIndex(level, 0, 0);
    expect(problem.operation).toBe(Operation.WRITING);
    expect(problem.type).toBe('english');
    expect(typeof problem.answer).toBe('string');
  });

  test("should loop through content deterministically", () => {
    const level = ENGLISH_SYLLABUS[0];
    const problem0 = getProblemForIndex(level, 0, 0);
    const problem5 = getProblemForIndex(level, 5, 0); // Assuming 5 items in READING_CONTENT
    expect(problem0.expression).toBe(problem5.expression);
  });
});
