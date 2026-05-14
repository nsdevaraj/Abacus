import React from 'react';
import { Home, BarChart2, User } from 'lucide-react';
import { AppMode } from '../types';

interface BottomNavProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  hidden?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ mode, setMode, hidden = false }) => {
  if (hidden) return null;
  const items = [
    { id: 'map' as const,      label: 'Home',     icon: Home },
    { id: 'calendar' as const, label: 'Progress', icon: BarChart2 },
    { id: 'profile' as const,  label: 'Profile',  icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 lg:hidden">
      <div className="flex justify-around items-center px-2 pt-2 pb-3 max-w-md mx-auto">
        {items.map(item => {
          const active = mode === item.id;
          const I = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors ${
                active ? 'text-brand-600 dark:text-brand-300' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <div className={`p-1.5 rounded-md ${active ? 'bg-brand-50 dark:bg-brand-500/15' : ''}`}>
                <I className="w-5 h-5" strokeWidth={active ? 2.4 : 2} />
              </div>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
