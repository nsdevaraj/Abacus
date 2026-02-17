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
    <header className="bg-white/80 backdrop-blur-md border-b border-sky-100 px-4 md:px-8 py-3 md:py-5 flex items-center justify-between shrink-0 shadow-sm gap-2 md:gap-4">
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        
        {/* Mobile Menu Toggle - Visible below 1536px */}
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -ml-2 rounded-xl text-sky-600 hover:bg-sky-50 2xl:hidden active:scale-95 transition-transform"
        >
          <Menu className="w-7 h-7" />
        </button>

        <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-lg shrink-0">
          <Ghost className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg md:text-2xl font-black text-sky-900 leading-tight truncate pr-2">{currentLevel.title}</h2>
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold mt-0.5 md:mt-1 whitespace-nowrap">
            <span className="bg-pink-100 text-pink-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-pink-200">
               {levelProgress.completedIndices.length}% Mastered
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button 
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          className={`p-2 md:p-3 rounded-2xl border-2 transition-all shadow-sm ${isAudioEnabled ? 'bg-sky-100 border-sky-200 text-sky-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
        >
          <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="flex bg-sky-100/50 p-1 rounded-xl md:rounded-2xl border-2 border-sky-100 shadow-inner">
          <button
            onClick={() => { setMode('map'); setPracticeType('visual'); }}
            className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all flex items-center gap-1 md:gap-2 text-xs md:text-sm font-black ${
              mode === 'map' && practiceType === 'visual' ? 'bg-white text-sky-600 shadow-md transform -translate-y-0.5' : 'text-sky-400 hover:text-sky-600'
            }`}
          >
            <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Play</span>
          </button>
          <button
            onClick={() => { 
              setMode('map'); 
              setPracticeType('mental'); 
              setIsAudioEnabled(true);
            }}
            className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all flex items-center gap-1 md:gap-2 text-xs md:text-sm font-black ${
              mode === 'map' && practiceType === 'mental' ? 'bg-white text-purple-600 shadow-md transform -translate-y-0.5' : 'text-purple-400 hover:text-purple-600'
            }`}
          >
            <Brain className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Mental</span>
          </button>
          <button
            onClick={() => setMode('learn')}
            className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all flex items-center gap-1 md:gap-2 text-xs md:text-sm font-black ${
              mode === 'learn' ? 'bg-white text-sky-600 shadow-md transform -translate-y-0.5' : 'text-sky-400 hover:text-sky-600'
            }`}
          >
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Tips</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;