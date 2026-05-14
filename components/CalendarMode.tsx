import React, { useState, useMemo } from 'react';
import { DailyLog } from '../types';
import { ChevronLeft, ChevronRight, Target, Trophy } from 'lucide-react';

interface CalendarModeProps {
  logs: DailyLog[];
}

const CalendarMode: React.FC<CalendarModeProps> = ({ logs }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  const logByDate = useMemo(() => {
    const m = new Map<string, DailyLog>();
    for (const l of logs) m.set(l.date, l);
    return m;
  }, [logs]);

  // 42-day heat-map (6 weeks).
  const heatDays = useMemo(() => {
    const today = new Date();
    const out: { key: string; count: number }[] = [];
    for (let i = 41; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      out.push({ key, count: logByDate.get(key)?.solved ?? 0 });
    }
    return out;
  }, [logByDate]);

  const totalSolved = logs.reduce((s, l) => s + l.solved, 0);
  const selectedLog = logByDate.get(selectedDateStr);

  return (
    <div className="max-w-4xl mx-auto animate-slide-up pb-10">
      <p className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-500 dark:text-slate-400 mb-2">
        Daily log
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Your practice history
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-[15px]">
        Six weeks of quests. Darker squares = more practice.
      </p>

      {/* Heat map */}
      <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="grid grid-cols-7 gap-1.5">
          {heatDays.map(d => {
            const t = d.count;
            const cls =
              t === 0 ? 'bg-slate-100 dark:bg-slate-800/70 border-slate-200/60 dark:border-slate-800'
              : t < 3 ? 'bg-brand-100 dark:bg-brand-500/25 border-brand-200/70 dark:border-brand-500/30'
              : t < 6 ? 'bg-brand-300 dark:bg-brand-500/55 border-brand-400/70 dark:border-brand-500/50'
              : 'bg-brand-600 dark:bg-brand-500 border-brand-700 dark:border-brand-400';
            return (
              <div
                key={d.key}
                title={`${d.key}: ${t} quests`}
                className={`aspect-square rounded-md border ${cls}`}
              />
            );
          })}
        </div>
        <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
          Less
          <span className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800" />
          <span className="w-3 h-3 rounded-sm bg-brand-100 dark:bg-brand-500/25 border border-brand-200/70 dark:border-brand-500/30" />
          <span className="w-3 h-3 rounded-sm bg-brand-300 dark:bg-brand-500/55 border border-brand-400/70 dark:border-brand-500/50" />
          <span className="w-3 h-3 rounded-sm bg-brand-600 dark:bg-brand-500 border border-brand-700 dark:border-brand-400" />
          More
        </div>
      </div>

      {/* Month picker + detail */}
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {monthNames[month]} {year}
            </h4>
            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2 text-center">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 py-1.5 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const log = logByDate.get(dateStr);
              const isSelected = dateStr === selectedDateStr;
              const isToday = dateStr === todayStr;

              return (
                <button
                  key={day}
                  data-focus
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`
                    aspect-square rounded-lg flex flex-col items-center justify-center relative transition-colors
                    ${isSelected
                      ? 'bg-brand-600 text-white'
                      : isToday
                      ? 'bg-brand-50 dark:bg-brand-500/10 border border-brand-200/70 dark:border-brand-500/20'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800'}
                  `}
                >
                  <span className={`text-xs font-semibold ${
                    isSelected ? 'text-white' :
                    isToday ? 'text-brand-700 dark:text-brand-300' :
                    'text-slate-700 dark:text-slate-300'}`}>
                    {day}
                  </span>
                  {log && (
                    <div className={`mt-0.5 w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-white' :
                      log.solved >= 20 ? 'bg-emerald-500' :
                      log.solved >= 10 ? 'bg-amber-500' :
                      'bg-rose-500'}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br from-brand-600 to-brand-800">
            <Trophy className="absolute -right-4 -bottom-4 w-24 h-24 opacity-15" />
            <p className="text-white/80 text-[11px] font-bold uppercase tracking-[0.18em]">Total solved</p>
            <h2 className="mt-1 text-4xl font-extrabold tabular-nums">{totalSolved}</h2>
            <p className="text-sm text-white/80 mt-1">Across all time</p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-brand-600" />
              {selectedDateStr === todayStr ? 'Today' : selectedDateStr}
            </h4>
            {selectedLog ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-50 dark:bg-brand-500/10 border border-brand-200/70 dark:border-brand-500/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">Solved</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">{selectedLog.solved}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Last focus</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    Level {selectedLog.lastLevelId}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 py-3 text-center">
                No training recorded.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarMode;
