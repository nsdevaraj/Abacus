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

const PATHS: Array<{ id: 'junior' | 'senior' | 'coding'; label: string }> = [
  { id: 'junior', label: 'Junior' },
  { id: 'senior', label: 'Senior' },
  { id: 'coding', label: 'Coding' },
];

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
  setLearningPath,
}) => {
  const currentSyllabus =
    learningPath === 'junior' ? JUNIOR_SYLLABUS :
    learningPath === 'senior' ? SENIOR_SYLLABUS :
    CODING_SYLLABUS;

  const progressMap = useMemo(() => {
    const map = new Map<number, UserProgress>();
    for (const item of progress) map.set(item.levelId, item);
    return map;
  }, [progress]);

  return (
    <>
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden transition-opacity ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-[82vw] max-w-[320px] lg:w-[300px] shrink-0
          bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          flex flex-col h-screen
          transition-transform duration-300 ease-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand head */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm">
                <Trophy className="w-[18px] h-[18px]" />
              </div>
              <div className="leading-tight">
                <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Abacus<span className="text-brand-600 dark:text-brand-400">Fun</span>
                </h1>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  Master Academy
                </p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close menu"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Path segmented control */}
          <div className="mt-4 flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {PATHS.map(opt => (
              <button
                key={opt.id}
                data-focus
                onClick={() => setLearningPath(opt.id)}
                className={`
                  flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all
                  ${learningPath === opt.id
                    ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Stat strip */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 text-sm font-bold tabular-nums">
              <Coins className="w-3.5 h-3.5" /> {globalCoins}
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200/70 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-sm font-bold tabular-nums">
              <Flame className="w-3.5 h-3.5" /> {globalStreak}
            </div>
          </div>
        </div>

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto scroll-area p-4 space-y-2">
          <p className="px-1 pb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Adventure map
          </p>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              data-focus
              onClick={() => { setMode('calendar'); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 border border-emerald-200/70 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wide transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" /> Daily log
            </button>
            <button
              data-focus
              onClick={handleShuffle}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-brand-50 hover:bg-brand-100 dark:bg-brand-500/10 dark:hover:bg-brand-500/20 border border-brand-200/70 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 text-[11px] font-bold uppercase tracking-wide transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" /> Shuffle
            </button>
          </div>

          {currentSyllabus.map(level => {
            const p = progressMap.get(level.id);
            const pct = p ? p.completedIndices.length : 0;
            const active = currentLevelId === level.id;
            return (
              <button
                key={level.id}
                data-focus
                onClick={() => {
                  setCurrentLevelId(level.id);
                  setMode('map');
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full text-left p-3 rounded-xl border transition-colors flex flex-col gap-1.5 relative
                  ${active
                    ? 'bg-brand-600 border-brand-700 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-brand-300 hover:bg-brand-50/40 dark:hover:bg-brand-500/5 text-slate-800 dark:text-slate-200'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9.5px] font-bold uppercase tracking-[0.14em] ${active ? 'text-brand-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {level.label || `Island ${level.id}`}
                  </span>
                  {pct === 100 && (
                    <Sparkles className={`w-3.5 h-3.5 ${active ? 'text-amber-200' : 'text-amber-500'}`} />
                  )}
                </div>
                <h3 className="font-semibold text-[13px] leading-snug pr-1">{level.title}</h3>
                <div className={`w-full h-1 rounded-full overflow-hidden ${active ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${active ? 'bg-white' : 'bg-brand-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className={`text-[10px] tabular-nums ${active ? 'text-brand-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {pct}% complete
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <button
            data-focus
            onClick={handleResetAll}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-500/10 text-slate-600 hover:text-rose-700 dark:text-slate-300 dark:hover:text-rose-300 text-[11px] font-bold uppercase tracking-wide transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Reset data
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
