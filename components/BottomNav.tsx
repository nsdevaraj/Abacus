import React from 'react';
import { Home, BarChart2, User } from 'lucide-react';
import { AppMode } from '../types';

interface BottomNavProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ mode, setMode }) => {
  const navItems = [
    { id: 'map', label: 'Home', icon: Home },
    { id: 'calendar', label: 'Progress', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/70 dark:border-slate-800 pb-safe z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-4 md:pb-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = mode === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-300'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-indigo-50 dark:bg-indigo-500/15' : ''}`}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.4 : 2} />
              </div>
              <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
