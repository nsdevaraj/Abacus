
import { UserProgress, LevelConfig } from '../types';

const syllabusSize = 1000;
const progressSize = 1000;

const mockSyllabus: any[] = Array.from({ length: syllabusSize }, (_, i) => ({
  id: i,
  title: `Level ${i}`,
}));

const mockProgress: any[] = Array.from({ length: progressSize }, (_, i) => ({
  levelId: i,
  completedIndices: Array.from({ length: Math.floor(Math.random() * 100) }, (_, j) => j),
}));

function originalLogic(syllabus: any[], progress: any[]) {
  const results = [];
  for (const level of syllabus) {
    const p = progress.find(item => item.levelId === level.id);
    const completion = p ? p.completedIndices.length : 0;
    results.push({ id: level.id, completion });
  }
  return results;
}

function optimizedLogic(syllabus: any[], progress: any[]) {
  const progressMap = new Map();
  for (const item of progress) {
    progressMap.set(item.levelId, item);
  }

  const results = [];
  for (const level of syllabus) {
    const p = progressMap.get(level.id);
    const completion = p ? p.completedIndices.length : 0;
    results.push({ id: level.id, completion });
  }
  return results;
}

const ITERATIONS = 100;

console.log(`Benchmarking with syllabusSize=${syllabusSize}, progressSize=${progressSize}, iterations=${ITERATIONS}`);

const startOriginal = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  originalLogic(mockSyllabus, mockProgress);
}
const endOriginal = performance.now();
console.log(`Original Logic: ${(endOriginal - startOriginal).toFixed(4)}ms`);

const startOptimized = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  optimizedLogic(mockSyllabus, mockProgress);
}
const endOptimized = performance.now();
console.log(`Optimized Logic: ${(endOptimized - startOptimized).toFixed(4)}ms`);

const speedup = (endOriginal - startOriginal) / (endOptimized - startOptimized);
console.log(`Speedup: ${speedup.toFixed(2)}x`);
