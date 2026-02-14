import React from 'react';
import { 
  Calculator, Brain, GraduationCap, Gamepad2 
} from 'lucide-react';
import Abacus from './Abacus';
import { LevelConfig } from '../types';

interface LearnModeProps {
  currentLevel: LevelConfig;
  abacusValue: number;
  setAbacusValue: (val: number) => void;
}

const LearnMode: React.FC<LearnModeProps> = ({
  currentLevel,
  abacusValue,
  setAbacusValue
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 animate-in zoom-in-95 duration-500">
       <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-4 border-sky-50 shadow-xl transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 text-pink-600 shadow-inner">
            <Calculator className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-sky-900 mb-2 md:mb-3">Magic Finger Theory</h3>
          <p className="text-sm md:text-base text-sky-600 font-medium leading-relaxed">{currentLevel.abacusDesc}</p>
        </div>
        <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-4 border-sky-50 shadow-xl transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 text-purple-600 shadow-inner">
            <Brain className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          <h3 className="text-xl md:text-2xl font-black text-sky-900 mb-2 md:mb-3">Mental Superpowers</h3>
          <p className="text-sm md:text-base text-sky-600 font-medium leading-relaxed">{currentLevel.mentalDesc}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10" /> Your Training Goals
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
             {currentLevel.stages.map((s, idx) => (
               <div key={idx} className="bg-white/20 p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/20 backdrop-blur-xl transition-all hover:bg-white/30 hover:translate-x-1">
                 <span className="block font-black text-lg md:text-xl mb-1 md:mb-2">{s.name}</span>
                 <span className="text-sky-50 font-medium text-xs md:text-sm leading-snug">{s.description}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-12 bg-white rounded-[2.5rem] md:rounded-[4rem] border-4 border-sky-50 shadow-2xl">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <h3 className="text-xl md:text-3xl font-black flex items-center gap-3 md:gap-4 text-sky-900">
            <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-pink-500" /> Free Play
          </h3>
          <div className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 text-white rounded-full font-black text-lg md:text-xl shadow-lg border-4 border-white rotate-3">
            {abacusValue}
          </div>
        </div>
        <Abacus interactive={true} value={abacusValue} onChange={setAbacusValue} columns={11} />
      </div>
    </div>
  );
};

export default LearnMode;