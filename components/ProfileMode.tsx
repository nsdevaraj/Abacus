import React, { useState } from 'react';
import { Trophy, Trash2 } from 'lucide-react';

interface ProfileModeProps {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  handleResetAll: () => void;
  globalCoins: number;
}

const ProfileMode: React.FC<ProfileModeProps> = ({
  darkMode,
  setDarkMode,
  handleResetAll,
  globalCoins
}) => {
  const [classReminders, setClassReminders] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  // Reusable Toggle Component
  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        checked ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
        checked ? 'translate-x-6' : 'translate-x-0'
      }`} />
    </button>
  );

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-24 dark:text-white"> 

      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-3">Learning preferences</h3>

      <div className="bg-white dark:bg-slate-800/60 rounded-2xl mb-8 shadow-sm border border-slate-200/70 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Class reminders</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Get notifications before every live session.</p>
          </div>
          <Toggle checked={classReminders} onChange={() => setClassReminders(!classReminders)} />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Focus mode</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Reduce distractions during practice sessions.</p>
          </div>
          <Toggle checked={focusMode} onChange={() => setFocusMode(!focusMode)} />
        </div>

        <div className="flex items-center justify-between p-4">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Dark theme</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Automatically dim the interface at night.</p>
          </div>
          <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </div>

      <h3 className="text-slate-900 dark:text-white font-bold text-base mb-3">Account</h3>

      <div className="bg-white dark:bg-slate-800/60 rounded-2xl p-4 mb-4 shadow-sm border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
        <div>
           <h4 className="font-semibold text-slate-900 dark:text-white">Personal best</h4>
           <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Highest speed sprint: 68 correct</p>
        </div>
        <Trophy className="w-6 h-6 text-amber-500" />
      </div>

      <button
        onClick={handleResetAll}
        className="w-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold py-3.5 rounded-2xl shadow-md shadow-rose-500/30 flex items-center justify-center gap-2 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
        Reset progress
      </button>
    </div>
  );
};

export default ProfileMode;
