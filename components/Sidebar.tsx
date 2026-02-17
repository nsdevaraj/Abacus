import React from 'react';
import { 
  X, Trophy, Coins, Flame, Shuffle, Sparkles, Trash2, Calendar
} from 'lucide-react';
import { JUNIOR_SYLLABUS, SENIOR_SYLLABUS } from '../utils/syllabus';
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
  learningPath: 'junior' | 'senior';
  setLearningPath: (path: 'junior' | 'senior') => void;
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
  const currentSyllabus = learningPath === 'junior' ? JUNIOR_SYLLABUS : SENIOR_SYLLABUS;

  return (
    <aside className={`
        fixed 2xl:relative inset-y-0 left-0 z-40
        w-[45vw] 2xl:w-80 
        bg-white/95 2xl:bg-white/90 backdrop-blur-md 
        border-r border-sky-100 flex flex-col shadow-2xl 2xl:shadow-xl 
        h-screen shrink-0 transition-transform duration-300 ease-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full 2xl:translate-x-0'}
    `}>
      <div className="p-6 md:p-8 border-b border-sky-50 flex flex-col items-center gap-4 md:gap-6 relative">
        {/* Mobile Close Button */}
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-4 right-4 p-2 bg-sky-50 rounded-full text-sky-400 2xl:hidden hover:bg-sky-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-2xl shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-sky-900 tracking-tight">
            Abacus<span className="text-pink-500">Fun</span>
          </h1>
        </div>

        <div className="w-full flex p-1 bg-sky-100/50 rounded-2xl">
            <button
                onClick={() => setLearningPath('junior')}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    learningPath === 'junior'
                    ? 'bg-white text-sky-600 shadow-sm scale-100'
                    : 'text-sky-400 hover:text-sky-600'
                }`}
            >
                Junior
            </button>
            <button
                onClick={() => setLearningPath('senior')}
                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    learningPath === 'senior'
                    ? 'bg-white text-pink-500 shadow-sm scale-100'
                    : 'text-sky-400 hover:text-pink-400'
                }`}
            >
                Senior
            </button>
        </div>
        
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 px-3 py-2 rounded-2xl text-yellow-700 font-black border-2 border-yellow-200 shadow-sm">
            <Coins className="w-5 h-5 text-yellow-500" /> {globalCoins}
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 bg-pink-100 px-3 py-2 rounded-2xl text-pink-700 font-black border-2 border-pink-200 shadow-sm">
            <Flame className="w-5 h-5 text-pink-500" /> {globalStreak}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-6">
        <div className="flex items-center justify-between px-4 mb-2">
          <p className="text-[11px] font-black text-sky-300 uppercase tracking-widest">Adventure Map</p>
        </div>
        
        <div className="px-2 space-y-2 mb-4">
          <button 
            onClick={() => {
              setMode('calendar');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-2xl border-2 border-emerald-100 transition-all font-black text-xs uppercase tracking-widest shadow-sm group mb-2"
          >
            <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Daily Log
          </button>
          <button 
            onClick={handleShuffle}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-2xl border-2 border-indigo-100 transition-all font-black text-xs uppercase tracking-widest shadow-sm group"
          >
            <Shuffle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Shuffle Quests
          </button>
        </div>

        {currentSyllabus.map((level) => {
          const p = progress.find(item => item.levelId === level.id);
          const completion = p ? p.completedIndices.length : 0;

          return (
            <button
              key={level.id}
              onClick={() => {
                setCurrentLevelId(level.id);
                setMode('map');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left p-4 rounded-3xl transition-all duration-300 border-2 flex flex-col gap-1 relative overflow-hidden group ${
                currentLevelId === level.id
                  ? 'bg-sky-500 border-sky-600 text-white shadow-lg scale-[1.03]'
                  : 'bg-white border-sky-50 hover:bg-sky-50 text-sky-900 shadow-sm hover:border-sky-100'
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                 <span className={`text-[10px] font-black uppercase tracking-widest ${currentLevelId === level.id ? 'text-sky-100' : 'text-sky-300'}`}>
                   {level.label || `Island ${level.id}`}
                 </span>
                 {completion === 100 && <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />}
              </div>
              <h3 className="font-black text-sm z-10 leading-tight pr-4">{level.title}</h3>
              <div className="w-full bg-black/10 h-2.5 rounded-full mt-2 overflow-hidden border border-black/5">
                <div 
                  className={`h-full transition-all duration-700 ease-out ${currentLevelId === level.id ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-pink-400'}`} 
                  style={{ width: `${completion}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-sky-50 bg-white/50 backdrop-blur-sm">
        <button 
          onClick={handleResetAll}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl border-2 border-red-100 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm group"
        >
          <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
          Reset All Data
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;