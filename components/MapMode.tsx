import React from 'react';
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
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mb-8 md:mb-12 text-center">
         <h3 className="text-2xl md:text-4xl font-black text-sky-900 mb-2 md:mb-3 tracking-tight">Your Quest Map</h3>
         <div className="flex items-center justify-center gap-2">
            {practiceType === 'mental' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold border border-purple-200">
                    <Brain className="w-3 h-3" /> Mental Mode Active
                </span>
            )}
            <p className="text-sm md:text-base text-sky-500 font-bold">Collect stars to become a Hero! 🚀</p>
         </div>
      </div>

      <div className="space-y-12 md:space-y-16">
        {currentLevel.stages.map((stage, sIdx) => (
          <div key={sIdx} className="space-y-4 md:space-y-6 relative">
            <div className="flex items-center gap-4 md:gap-6">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white border-4 border-white shadow-xl transform -rotate-6 shrink-0 ${practiceType === 'mental' ? 'bg-gradient-to-br from-purple-400 to-indigo-500' : 'bg-gradient-to-br from-yellow-300 to-yellow-500'}`}>
                {practiceType === 'mental' ? <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" /> : <Star className="w-6 h-6 md:w-8 md:h-8 fill-white" />}
              </div>
              <div>
                <h4 className="font-black text-lg md:text-2xl text-sky-900 leading-none mb-1">{stage.name}</h4>
                <p className="text-sky-400 font-bold text-xs md:text-sm">{stage.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3 md:gap-4">
              {Array.from({ length: stage.range[1] - stage.range[0] + 1 }).map((_, i) => {
                const idx = stage.range[0] + i;
                const isCompleted = levelProgress.completedIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => startExercise(idx)}
                    className={`aspect-square rounded-2xl md:rounded-3xl border-2 md:border-4 flex items-center justify-center font-black text-base md:text-lg transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-sm md:shadow-lg ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-white text-white rotate-3' 
                        : practiceType === 'mental'
                            ? 'bg-purple-50 border-purple-100 text-purple-300 hover:border-purple-300 hover:text-purple-600 hover:rotate-6'
                            : 'bg-white border-sky-100 text-sky-200 hover:border-pink-300 hover:text-pink-500 hover:rotate-6'
                    }`}
                  >
                    {isCompleted ? <PartyPopper className="w-5 h-5 md:w-7 md:h-7" /> : idx}
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