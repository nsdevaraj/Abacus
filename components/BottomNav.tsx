import React from 'react';
import { Home, Library, BarChart2, User } from 'lucide-react';
import { AppMode } from '../types';

interface BottomNavProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ mode, setMode }) => {
  const navItems = [
    { id: 'map', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: Library },
    { id: 'calendar', label: 'Progress', icon: BarChart2 },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pb-safe z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around px-2 pt-3 pb-6 md:pb-3 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = mode === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-16 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 transform -translate-y-1'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
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
