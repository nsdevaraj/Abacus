import React from 'react';
import { Trophy, Trash2, Bell, Focus, Moon } from 'lucide-react';

interface ProfileModeProps {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  classReminders: boolean;
  setClassReminders: (enabled: boolean) => void;
  focusMode: boolean;
  setFocusMode: (enabled: boolean) => void;
  personalBest: number;
  handleResetAll: () => void;
  globalCoins: number;
}

const Toggle: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <button
    type="button"
    data-focus
    onClick={onChange}
    aria-pressed={checked}
    className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
      checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
    }`}
  >
    <div
      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

interface RowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  hint?: string;
}

const Row: React.FC<RowProps> = ({ icon, title, description, checked, onChange, hint }) => (
  <div className="flex items-center justify-between gap-4 p-4">
    <div className="flex items-start gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{description}</p>
        {hint && <p className="text-[11px] text-rose-500 mt-1">{hint}</p>}
      </div>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const ProfileMode: React.FC<ProfileModeProps> = ({
  darkMode,
  setDarkMode,
  classReminders,
  setClassReminders,
  focusMode,
  setFocusMode,
  personalBest,
  handleResetAll,
  globalCoins,
}) => {
  const notificationsBlocked =
    typeof Notification !== 'undefined' && Notification.permission === 'denied';

  return (
    <div className="max-w-3xl mx-auto animate-slide-up pb-12">
      <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-500 dark:text-slate-400 mb-2">
        Profile
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Hi, Bead Hero
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-[15px]">Your stats today.</p>

      <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <Trophy className="w-5 h-5 text-amber-500 mb-2" />
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">{globalCoins}</div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
            Coins
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <Trophy className="w-5 h-5 text-brand-600 mb-2" />
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">{personalBest}</div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
            Personal best
          </div>
        </div>
      </div>

      <h3 className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-500 dark:text-slate-400 mt-10 mb-3">
        Learning preferences
      </h3>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-200/80 dark:divide-slate-800 overflow-hidden">
        <Row
          icon={<Bell className="w-[18px] h-[18px]" />}
          title="Class reminders"
          description="Get notifications before every live session."
          checked={classReminders}
          onChange={() => setClassReminders(!classReminders)}
          hint={notificationsBlocked ? 'Notifications are blocked in your browser settings.' : undefined}
        />
        <Row
          icon={<Focus className="w-[18px] h-[18px]" />}
          title="Focus mode"
          description="Reduce distractions during practice sessions."
          checked={focusMode}
          onChange={() => setFocusMode(!focusMode)}
        />
        <Row
          icon={<Moon className="w-[18px] h-[18px]" />}
          title="Dark theme"
          description="Dim the interface for evening practice."
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      <h3 className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-500 dark:text-slate-400 mt-8 mb-3">
        Danger zone
      </h3>

      <button
        data-focus
        onClick={handleResetAll}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200/70 dark:border-rose-500/20 text-sm font-bold transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Reset all progress
      </button>
    </div>
  );
};

export default ProfileMode;
