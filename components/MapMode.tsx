import React, { useMemo } from 'react';
import { Brain, Star, Check } from 'lucide-react';
import { LevelConfig, UserProgress } from '../types';

interface MapModeProps {
  practiceType: 'visual' | 'mental';
  currentLevel: LevelConfig;
  levelProgress: UserProgress;
  startExercise: (index: number) => void;
}

const MapMode: React.FC<MapModeProps> = ({
  practiceType,
  currentLevel,
  levelProgress,
  startExercise,
}) => {
  const completedSet = useMemo(
    () => new Set(levelProgress.completedIndices),
    [levelProgress.completedIndices]
  );

  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      {/* Heading */}
      <div className="mb-8 md:mb-12">
        <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-500 dark:text-slate-400 mb-2">
          {currentLevel.label || `Island ${currentLevel.id}`}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {currentLevel.title}
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
          {currentLevel.abacusDesc}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {practiceType === 'mental' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold bg-violet-50 text-violet-700 border-violet-200/70 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20">
              <Brain className="w-3 h-3" /> Mental mode
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20 whitespace-nowrap">
            <Star className="w-3 h-3" /> {levelProgress.completedIndices.length}/100 mastered
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            {currentLevel.stages.length} stages
          </span>
        </div>
      </div>

      {/* Stages */}
      <div className="space-y-10 md:space-y-12">
        {currentLevel.stages.map((stage, sIdx) => {
          const indices: number[] = [];
          for (let i = stage.range[0]; i <= stage.range[1]; i++) indices.push(i);
          const doneInStage = indices.filter(i => completedSet.has(i)).length;

          return (
            <section key={sIdx}>
              <div className="flex items-start gap-4 mb-5">
                <div className="
                  w-11 h-11 md:w-12 md:h-12 rounded-2xl
                  bg-brand-50 dark:bg-brand-500/15
                  text-brand-700 dark:text-brand-300
                  border border-brand-200/70 dark:border-brand-500/20
                  flex items-center justify-center font-bold text-base shrink-0
                ">
                  {sIdx + 1}
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white leading-tight">
                    {stage.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums hidden sm:block">
                  {doneInStage}/{indices.length}
                </div>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 md:gap-2.5">
                {indices.map(idx => {
                  const done = completedSet.has(idx);
                  return (
                    <button
                      key={idx}
                      data-focus
                      onClick={() => startExercise(idx)}
                      className={`
                        aspect-square rounded-xl flex items-center justify-center
                        font-bold text-sm md:text-base tabular-nums
                        transition-all duration-150
                        ${done
                          ? 'bg-emerald-500 hover:bg-emerald-600 border border-emerald-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-300 hover:bg-brand-50/40 dark:hover:bg-brand-500/5'
                        }
                      `}
                    >
                      {done ? <Check className="w-4 h-4" strokeWidth={3} /> : idx}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default MapMode;
