import React, { useState } from 'react';
import { DailyLog } from '../types';
import { ChevronLeft, ChevronRight, CalendarCheck, Trophy, Target } from 'lucide-react';

interface CalendarModeProps {
  logs: DailyLog[];
}

const CalendarMode: React.FC<CalendarModeProps> = ({ logs }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(new Date().toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getLogForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return {
      log: logs.find(l => l.date === dateStr),
      dateStr
    };
  };

  const selectedLog = logs.find(l => l.date === selectedDateStr);
  const totalSolved = logs.reduce((acc, curr) => acc + curr.solved, 0);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 pb-10">
      
      {/* Header Stats */}
      <div className="mb-8 md:mb-12 text-center">
         <h3 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tight flex items-center justify-center gap-3">
           <CalendarCheck className="w-7 h-7 md:w-9 md:h-9 text-indigo-600" />
           Training Log
         </h3>
         <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">Track your daily brain workouts</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">

        {/* Calendar Section */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800/60 rounded-2xl shadow-sm border border-slate-200/70 dark:border-slate-700 p-5 md:p-7">
          <div className="flex items-center justify-between mb-5">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{monthNames[month]} {year}</h4>
            <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-3 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-[11px] font-bold text-slate-500 dark:text-slate-400 py-2 uppercase tracking-wider">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const { log, dateStr } = getLogForDate(day);
              const isSelected = dateStr === selectedDateStr;
              const isToday = dateStr === new Date().toISOString().split('T')[0];

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`
                    aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200
                    ${isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : isToday ? 'bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}
                  `}
                >
                  <span className={`text-xs md:text-sm font-semibold ${isSelected ? 'text-white' : isToday ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{day}</span>
                  {log && (
                    <div className="mt-1 flex items-center justify-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : log.solved >= 20 ? 'bg-emerald-500' : log.solved >= 10 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Details Section */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Trophy className="w-28 h-28 rotate-12" />
             </div>
             <div className="relative z-10">
                <p className="text-indigo-100 text-xs font-semibold uppercase tracking-[0.18em] mb-1">Total Solved</p>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-1">{totalSolved}</h2>
                <p className="text-sm text-indigo-100/90">Across all time</p>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200/70 dark:border-slate-700 p-5 md:p-6 shadow-sm">
             <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
               <Target className="w-5 h-5 text-indigo-600" />
               {selectedDateStr === new Date().toISOString().split('T')[0] ? "Today's Activity" : `Activity for ${selectedDateStr}`}
             </h4>

             {selectedLog ? (
               <div className="space-y-3">
                 <div className="flex items-center justify-between p-3.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl border border-indigo-200/50 dark:border-indigo-500/20">
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm">Problems Solved</span>
                    <span className="text-xl font-extrabold text-indigo-900 dark:text-white">{selectedLog.solved}</span>
                 </div>
                 <div className="flex items-center justify-between p-3.5 bg-violet-50 dark:bg-violet-500/10 rounded-xl border border-violet-200/50 dark:border-violet-500/20">
                    <span className="font-semibold text-violet-700 dark:text-violet-300 text-sm">Last Focus</span>
                    <span className="text-xs font-bold text-violet-900 dark:text-white bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-violet-200/70 dark:border-violet-500/20">Level {selectedLog.lastLevelId}</span>
                 </div>
               </div>
             ) : (
               <div className="text-center py-6 text-slate-400 font-medium text-sm">
                 No training recorded for this day.
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarMode;
