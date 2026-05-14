import React from 'react';
import { 
  Menu, Ghost, Volume2, Gamepad2, Brain, BookOpen 
} from 'lucide-react';
import { LevelConfig, UserProgress, AppMode } from '../types';

interface HeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  currentLevel: LevelConfig;
  levelProgress: UserProgress;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (enabled: boolean) => void;
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  practiceType: 'visual' | 'mental';
  setPracticeType: (type: 'visual' | 'mental') => void;
}

const Header: React.FC<HeaderProps> = ({
  setMobileMenuOpen,
  currentLevel,
  levelProgress,
  isAudioEnabled,
  setIsAudioEnabled,
  mode,
  setMode,
  practiceType,
  setPracticeType
}) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shrink-0 gap-2 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 2xl:hidden active:scale-95 transition-transform"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-indigo-500/30 shrink-0">
          <Ghost className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base md:text-xl font-bold text-slate-900 dark:text-white leading-tight truncate pr-2">{currentLevel.title}</h2>
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-semibold mt-1 whitespace-nowrap">
            <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 px-2 md:px-2.5 py-0.5 rounded-full border border-indigo-200/70 dark:border-indigo-500/20">
               {levelProgress.completedIndices.length}% Mastered
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <button
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          className={`p-2 md:p-2.5 rounded-xl border transition-colors ${isAudioEnabled ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/15 dark:border-indigo-500/20 dark:text-indigo-300' : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'}`}
          aria-label="Toggle audio"
        >
          <Volume2 className="w-5 h-5" />
        </button>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/70 dark:border-slate-700">
          <button
            onClick={() => { setMode('map'); setPracticeType('visual'); }}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all flex items-center gap-1.5 text-xs md:text-sm font-semibold ${
              mode === 'map' && practiceType === 'visual' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> <span className="hidden sm:inline">Play</span>
          </button>
          <button
            onClick={() => {
              setMode('map');
              setPracticeType('mental');
              setIsAudioEnabled(true);
            }}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all flex items-center gap-1.5 text-xs md:text-sm font-semibold ${
              mode === 'map' && practiceType === 'mental' ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" /> <span className="hidden sm:inline">Mental</span>
          </button>
          <button
            onClick={() => setMode('learn')}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all flex items-center gap-1.5 text-xs md:text-sm font-semibold ${
              mode === 'learn' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Tips</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;