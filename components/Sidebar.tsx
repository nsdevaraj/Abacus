import React, { useMemo } from 'react';
import { 
  X, Trophy, Coins, Flame, Shuffle, Sparkles, Trash2, Calendar
} from 'lucide-react';
import { JUNIOR_SYLLABUS, SENIOR_SYLLABUS, CODING_SYLLABUS } from '../utils/syllabus';
import { UserProgress, AppMode } from '../types';

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  globalCoins: number;
  globalStreak: number;
  handleShuffle: () => void;
  progress: UserProgress[];
  currentLevelId: number;
  setCurrentLevelId: (id: number) => void;
  setMode: (mode: AppMode) => void;
  handleResetAll: () => void;
  learningPath: 'junior' | 'senior' | 'coding';
  setLearningPath: (path: 'junior' | 'senior' | 'coding') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  globalCoins,
  globalStreak,
  handleShuffle,
  progress,
  currentLevelId,
  setCurrentLevelId,
  setMode,
  handleResetAll,
  learningPath,
  setLearningPath
}) => {
  const currentSyllabus = learningPath === 'junior' ? JUNIOR_SYLLABUS : learningPath === 'senior' ? SENIOR_SYLLABUS : CODING_SYLLABUS;

  const progressMap = useMemo(() => {
    const map = new Map<number, UserProgress>();
    for (const item of progress) {
      map.set(item.levelId, item);
    }
    return map;
  }, [progress]);

  return (
    <aside className={`
        fixed 2xl:relative inset-y-0 left-0 z-40
        w-[80vw] max-w-sm 2xl:w-80
        bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
        border-r border-slate-200/70 dark:border-slate-800 flex flex-col shadow-2xl 2xl:shadow-sm
        h-screen shrink-0 transition-transform duration-300 ease-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full 2xl:translate-x-0'}
    `}>
      <div className="px-6 pt-6 pb-5 md:px-7 md:pt-7 md:pb-6 border-b border-slate-200/70 dark:border-slate-800 flex flex-col items-center gap-5 relative">
        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 2xl:hidden transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 self-start">
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-2xl shadow-md shadow-indigo-500/30">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Abacus<span className="text-indigo-600">Fun</span>
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Master Academy</span>
          </div>
        </div>

        <div className="w-full flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
                onClick={() => setLearningPath('junior')}
                className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                    learningPath === 'junior'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
                Junior
            </button>
            <button
                onClick={() => setLearningPath('senior')}
                className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                    learningPath === 'senior'
                    ? 'bg-white dark:bg-slate-700 text-pink-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
                Senior
            </button>
            <button
                onClick={() => setLearningPath('coding')}
                className={`flex-1 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                    learningPath === 'coding'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
                Coding
            </button>
        </div>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 flex items-center justify-center gap-2 bg-amber-50 dark:bg-amber-500/10 px-3 py-2 rounded-xl text-amber-700 dark:text-amber-300 font-bold border border-amber-200/70 dark:border-amber-500/20">
            <Coins className="w-4 h-4" /> {globalCoins}
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-500/10 px-3 py-2 rounded-xl text-rose-700 dark:text-rose-300 font-bold border border-rose-200/70 dark:border-rose-500/20">
            <Flame className="w-4 h-4" /> {globalStreak}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5 pb-6">
        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em] px-2 pt-1 pb-2">Adventure Map</p>

        <div className="space-y-2 mb-4">
          <button
            onClick={() => {
              setMode('calendar');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-xl border border-emerald-200/70 dark:border-emerald-500/20 transition-colors font-semibold text-xs uppercase tracking-wider group"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Daily Log
          </button>
          <button
            onClick={handleShuffle}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-xl border border-indigo-200/70 dark:border-indigo-500/20 transition-colors font-semibold text-xs uppercase tracking-wider group"
          >
            <Shuffle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Shuffle Quests
          </button>
        </div>

        {currentSyllabus.map((level) => {
          const p = progressMap.get(level.id);
          const completion = p ? p.completedIndices.length : 0;
          const active = currentLevelId === level.id;

          return (
            <button
              key={level.id}
              onClick={() => {
                setCurrentLevelId(level.id);
                setMode('map');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 border flex flex-col gap-1 relative overflow-hidden ${
                active
                  ? 'bg-gradient-to-br from-indigo-600 to-violet-600 border-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-800/60 border-slate-200/70 dark:border-slate-700 hover:border-indigo-300 hover:bg-indigo-50/40 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                 <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                   {level.label || `Island ${level.id}`}
                 </span>
                 {completion === 100 && <Sparkles className={`w-4 h-4 ${active ? 'text-amber-200' : 'text-amber-500'} animate-spin-slow`} />}
              </div>
              <h3 className="font-semibold text-sm leading-snug pr-2">{level.title}</h3>
              <div className={`w-full h-1.5 rounded-full mt-1.5 overflow-hidden ${active ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'}`}>
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-full ${active ? 'bg-white' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`}
                  style={{ width: `${completion}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-200/70 dark:border-slate-800">
        <button
          onClick={handleResetAll}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200/70 dark:border-rose-500/20 transition-colors font-semibold text-[11px] uppercase tracking-wider group"
        >
          <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
          Reset All Data
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;