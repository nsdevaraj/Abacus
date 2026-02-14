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
         <h3 className="text-2xl md:text-4xl font-black text-sky-900 mb-2 md:mb-3 tracking-tight flex items-center justify-center gap-3">
           <CalendarCheck className="w-8 h-8 md:w-10 md:h-10 text-pink-500" />
           Training Log
         </h3>
         <p className="text-sm md:text-base text-sky-500 font-bold">Track your daily brain workouts!</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        
        {/* Calendar Section */}
        <div className="md:col-span-2 bg-white rounded-[2rem] shadow-xl border-4 border-sky-50 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-sky-50 rounded-full text-sky-400 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h4 className="text-xl font-black text-sky-800">{monthNames[month]} {year}</h4>
            <button onClick={handleNextMonth} className="p-2 hover:bg-sky-50 rounded-full text-sky-400 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-4 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={i} className="text-xs font-black text-sky-300 py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-3">
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
                    aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300
                    ${isSelected ? 'ring-4 ring-sky-300 z-10 scale-110' : 'hover:scale-105'}
                    ${isToday ? 'bg-sky-50 border-2 border-sky-200' : 'bg-white border border-gray-100'}
                  `}
                >
                  <span className={`text-xs md:text-sm font-bold ${isToday ? 'text-sky-600' : 'text-gray-500'}`}>{day}</span>
                  {log && (
                    <div className="mt-1 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${log.solved >= 20 ? 'bg-green-500' : log.solved >= 10 ? 'bg-yellow-400' : 'bg-pink-400'}`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Details Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Trophy className="w-32 h-32 rotate-12" />
             </div>
             <div className="relative z-10">
                <p className="text-indigo-200 text-sm font-bold uppercase tracking-widest mb-1">Total Solved</p>
                <h2 className="text-5xl font-black mb-4">{totalSolved}</h2>
                <p className="text-sm text-indigo-100">Across all time</p>
             </div>
          </div>

          <div className="bg-white rounded-[2rem] border-4 border-sky-50 p-6 md:p-8 shadow-lg">
             <h4 className="text-lg font-black text-sky-900 mb-4 flex items-center gap-2">
               <Target className="w-5 h-5 text-pink-500" /> 
               {selectedDateStr === new Date().toISOString().split('T')[0] ? "Today's Activity" : `Activity for ${selectedDateStr}`}
             </h4>
             
             {selectedLog ? (
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-sky-50 rounded-2xl">
                    <span className="font-bold text-sky-700">Problems Solved</span>
                    <span className="text-2xl font-black text-sky-900">{selectedLog.solved}</span>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
                    <span className="font-bold text-purple-700">Last Focus</span>
                    <span className="text-sm font-black text-purple-900 bg-white px-2 py-1 rounded-md border border-purple-100">Level {selectedLog.lastLevelId}</span>
                 </div>
               </div>
             ) : (
               <div className="text-center py-8 text-gray-400 font-medium">
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
