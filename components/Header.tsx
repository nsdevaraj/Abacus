import React from 'react';
import {
  Menu, Trophy, Volume2, VolumeX, Gamepad2, Brain, BookOpen, Sun, Moon
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
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
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
  setPracticeType,
  darkMode,
  setDarkMode,
}) => {
  const modeButtons = [
    {
      id: 'play',
      label: 'Play',
      icon: Gamepad2,
      onClick: () => { setMode('map'); setPracticeType('visual'); },
      active: mode === 'map' && practiceType === 'visual',
    },
    {
      id: 'mental',
      label: 'Mental',
      icon: Brain,
      onClick: () => { setMode('map'); setPracticeType('mental'); setIsAudioEnabled(true); },
      active: mode === 'map' && practiceType === 'mental',
    },
    {
      id: 'tips',
      label: 'Tips',
      icon: BookOpen,
      onClick: () => setMode('learn'),
      active: mode === 'learn',
    },
  ];

  return (
    <header className="bg-white/85 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 md:px-7 py-3 flex items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-sm shrink-0">
          <Trophy className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate leading-tight">
            {currentLevel.title}
          </h2>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
            {levelProgress.completedIndices.length}% mastered · {currentLevel.label || `Island ${currentLevel.id}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="hidden sm:flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200/70 dark:border-slate-700/60">
          {modeButtons.map(b => {
            const I = b.icon;
            return (
              <button
                key={b.id}
                data-focus
                onClick={b.onClick}
                className={`
                  px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all
                  ${b.active
                    ? 'bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}
                `}
              >
                <I className="w-3.5 h-3.5" />
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>

        <button
          data-focus
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          aria-label="Toggle audio"
          className={`
            p-2 rounded-lg border transition-colors
            ${isAudioEnabled
              ? 'bg-brand-50 border-brand-200/70 text-brand-700 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-300'
              : 'bg-slate-100 border-slate-200 text-slate-500 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'}
          `}
        >
          {isAudioEnabled ? <Volume2 className="w-[18px] h-[18px]" /> : <VolumeX className="w-[18px] h-[18px]" />}
        </button>

        <button
          data-focus
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
