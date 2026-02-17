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
      {/* Profile Card */}
      <div className="bg-blue-600 dark:bg-blue-800 rounded-3xl p-6 text-white mb-8 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-sm">
             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
             </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Neha Sharma</h2>
            <p className="text-blue-100 text-sm opacity-90">Student · Master Abacus Academy</p>
          </div>
        </div>
      </div>

      <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-4">Learning preferences</h3>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-2 mb-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">Class reminders</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Get notifications before every live session.</p>
          </div>
          <Toggle checked={classReminders} onChange={() => setClassReminders(!classReminders)} />
        </div>

        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">Focus mode</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Reduce distractions during practice sessions.</p>
          </div>
          <Toggle checked={focusMode} onChange={() => setFocusMode(!focusMode)} />
        </div>

        <div className="flex items-center justify-between p-4 last:border-0">
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">Dark theme</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">Automatically dim the interface at night.</p>
          </div>
          <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </div>

      <h3 className="text-gray-900 dark:text-gray-100 font-bold text-lg mb-4">Account</h3>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div>
           <h4 className="font-bold text-gray-900 dark:text-white">Personal best</h4>
           <p className="text-xs text-gray-500 dark:text-gray-400">Highest speed sprint: 68 correct</p>
        </div>
        <Trophy className="w-6 h-6 text-amber-500" />
      </div>

      <button
        onClick={handleResetAll}
        className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-4 rounded-3xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all"
      >
        <Trash2 className="w-5 h-5" />
        Reset progress
      </button>
    </div>
  );
};

export default ProfileMode;
