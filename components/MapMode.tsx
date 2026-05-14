import React, { useMemo } from 'react';
import { Brain, Star, PartyPopper } from 'lucide-react';
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
  startExercise
}) => {
  const completedSet = useMemo(() => new Set(levelProgress.completedIndices), [levelProgress.completedIndices]);

  const stageIndices = useMemo(() => {
    return currentLevel.stages.map(stage => {
      const indices = [];
      for (let i = stage.range[0]; i <= stage.range[1]; i++) {
        indices.push(i);
      }
      return indices;
    });
  }, [currentLevel.stages]);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mb-8 md:mb-12 text-center">
         <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tight">Your Quest Map</h3>
         <div className="flex items-center justify-center gap-2 flex-wrap">
            {practiceType === 'mental' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 text-xs font-semibold border border-violet-200/70 dark:border-violet-500/20">
                    <Brain className="w-3 h-3" /> Mental Mode
                </span>
            )}
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">Collect stars to become a Hero</p>
         </div>
      </div>

      <div className="space-y-10 md:space-y-14">
        {currentLevel.stages.map((stage, sIdx) => (
          <div key={sIdx} className="space-y-4 md:space-y-6 relative">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${practiceType === 'mental' ? 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-violet-500/30' : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30'}`}>
                {practiceType === 'mental' ? <Brain className="w-6 h-6 md:w-7 md:h-7 text-white" /> : <Star className="w-6 h-6 md:w-7 md:h-7 fill-white" />}
              </div>
              <div>
                <h4 className="font-bold text-lg md:text-2xl text-slate-900 dark:text-white leading-tight mb-0.5">{stage.name}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-xs md:text-sm">{stage.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5 md:gap-3">
              {stageIndices[sIdx].map((idx) => {
                const isCompleted = completedSet.has(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => startExercise(idx)}
                    className={`aspect-square rounded-2xl border flex items-center justify-center font-bold text-base md:text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                      isCompleted
                        ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-500/30'
                        : practiceType === 'mental'
                            ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-300 shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 shadow-sm'
                    }`}
                  >
                    {isCompleted ? (
                      <div className="flex flex-col items-center leading-none">
                        <PartyPopper className="w-4 h-4 md:w-5 md:h-5" />
                        {levelProgress.completionDates?.[idx] && (
                          <span className="text-[8px] md:text-[10px] font-semibold opacity-90 mt-0.5">
                            {levelProgress.completionDates[idx]}
                          </span>
                        )}
                      </div>
                    ) : idx}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapMode;