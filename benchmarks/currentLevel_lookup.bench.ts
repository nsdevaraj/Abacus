
import { ALL_LEVELS } from '../utils/syllabus';

const ITERATIONS = 1000000;
const currentLevelId = 28; // Last level in Senior syllabus to make it "worst case" for .find()

function benchmarkFind() {
    console.log(`Benchmarking .find() over ${ALL_LEVELS.length} elements, ${ITERATIONS} iterations...`);
    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
        const currentLevel = ALL_LEVELS.find(l => l.id === currentLevelId) || ALL_LEVELS[0];
    }
    const end = performance.now();
    console.log(`Total time: ${(end - start).toFixed(4)}ms`);
    console.log(`Average time per call: ${((end - start) / ITERATIONS * 1000).toFixed(4)}us`);
}

benchmarkFind();
