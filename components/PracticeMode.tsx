import React from 'react';
import { 
  ChevronLeft, Volume2, PartyPopper, Calculator, Brain, CheckCircle2, XCircle, ArrowRight, RefreshCw, Ear
} from 'lucide-react';
import Abacus from './Abacus';
import { MathProblem, LevelConfig } from '../types';

interface PracticeModeProps {
  problem: MathProblem;
  currentLevel: LevelConfig;
  practiceType: 'visual' | 'mental';
  setMode: (mode: 'map' | 'learn' | 'practice') => void;
  explainQuestion: (prob: MathProblem) => void;
  showCelebration: boolean;
  setAbacusValue: (val: number) => void;
  userAnswer: string;
  setUserAnswer: (val: string) => void;
  checkAnswer: () => void;
  handleNextProblem: () => void;
  feedback: 'correct' | 'incorrect' | null;
  setFeedback: (val: 'correct' | 'incorrect' | null) => void;
}

const PracticeMode: React.FC<PracticeModeProps> = ({
  problem,
  currentLevel,
  practiceType,
  setMode,
  explainQuestion,
  showCelebration,
  setAbacusValue,
  userAnswer,
  setUserAnswer,
  checkAnswer,
  handleNextProblem,
  feedback,
  setFeedback
}) => {
  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-right-12 duration-500">
      <header className="px-4 py-4 md:px-10 md:py-8 flex items-center justify-between bg-sky-50 border-b-4 border-sky-100 shrink-0">
         <button 
          onClick={() => setMode('map')}
          className="flex items-center gap-2 md:gap-3 text-sky-400 hover:text-pink-500 font-black text-sm md:text-lg transition-all transform hover:-translate-x-1"
         >
           <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" /> Back
         </button>
         <div className="flex flex-col items-center">
           <span className="text-[10px] md:text-[12px] uppercase font-black text-sky-300 tracking-[0.2em] mb-1">Quest {problem.index} / 100</span>
           <div className="flex items-center gap-2">
               <h2 className="text-sm md:text-lg font-black text-sky-900 px-3 py-1 md:px-4 md:py-1 bg-white rounded-full border border-sky-100 shadow-sm truncate max-w-[150px] md:max-w-none">{currentLevel.title}</h2>
               {practiceType === 'mental' && (
                   <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-black border border-purple-200 flex items-center gap-1">
                       <Brain className="w-3 h-3" /> Mental
                   </span>
               )}
           </div>
         </div>
         <div className="w-20 md:w-32 flex items-center justify-end">
           <button 
             onClick={() => explainQuestion(problem)}
             className="p-2 md:p-3 rounded-2xl bg-white border-2 border-sky-100 shadow-sm text-sky-500 hover:text-pink-500 transition-all hover:scale-110 active:scale-95"
           >
             <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
           </button>
         </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-10 flex flex-col items-center justify-center relative w-full">
         
         {/* Celebration Overlay */}
         {showCelebration && (
           <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="animate-bounce-slow">
                 <PartyPopper className="w-32 h-32 md:w-48 md:h-48 text-pink-500 opacity-20" />
              </div>
              <div className="absolute inset-0 animate-ping opacity-10 bg-green-400 rounded-full scale-50"></div>
           </div>
         )}

         <div className="max-w-5xl w-full space-y-6 md:space-y-12">
            
            {practiceType === 'visual' ? (
                <>
                  {/* Visual Mode: Problem Display */}
                  <div className="text-center space-y-4 md:space-y-8 animate-in zoom-in-50 duration-500">
                 
                      <div className="text-6xl sm:text-8xl md:text-[11rem] font-black text-sky-900 tracking-tighter drop-shadow-xl select-none leading-none">
                      {problem.expression}<span className="text-pink-500"> = </span>?
                      </div>
                  </div>

                  {/* Visual Mode: Abacus Interaction */}
                  <div className="bg-sky-100/50 p-2 md:p-6 xl:p-10 rounded-[2rem] md:rounded-[4rem] border-4 md:border-8 border-white shadow-xl md:shadow-2xl max-w-5xl mx-auto transform transition-transform hover:scale-[1.01] w-full">
                      <Abacus interactive={true} onChange={setAbacusValue} columns={11} />
                       
                  </div>
                </>
            ) : (
                /* Mental Mode: Audio Only */
                <div className="flex flex-col items-center justify-center py-4 md:py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <button 
                      onClick={() => explainQuestion(problem)}
                      className="w-40 h-40 md:w-64 md:h-64 bg-gradient-to-br from-purple-100 to-white rounded-full flex flex-col items-center justify-center border-[8px] border-white shadow-[0_20px_50px_rgba(168,85,247,0.2)] active:scale-95 transition-all group hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)] hover:-translate-y-2"
                    >
                       <div className="relative">
                          <Ear className="w-16 h-16 md:w-24 md:h-24 text-purple-400 group-hover:text-purple-600 transition-colors" />
                          <div className="absolute -right-2 -top-2 w-6 h-6 md:w-8 md:h-8 bg-pink-500 rounded-full flex items-center justify-center text-white animate-pulse">
                              <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                          </div>
                       </div>
                       <span className="mt-4 font-black text-purple-400 uppercase tracking-widest text-xs md:text-sm group-hover:text-purple-600">Replay</span>
                    </button>
                    
                    <div className="mt-8 md:mt-12 p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-[2rem] border-2 border-white max-w-lg text-center shadow-lg">
                       <h3 className="text-xl md:text-2xl font-black text-sky-900 mb-2 flex items-center justify-center gap-2">
                          <Brain className="w-6 h-6 text-purple-500" /> Mental Visualization
                       </h3>
                       <p className="text-sky-600 font-medium text-sm md:text-lg leading-relaxed">
                          Close your eyes. Listen to the numbers. Visualize the abacus beads moving in your mind!
                       </p>
                    </div>
                </div>
            )}

            {/* Answer Input */}
            <div className="max-w-xl mx-auto space-y-6 md:space-y-10">
              <div className="relative group">
                <input 
                  type="number"
                  step="any"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="?"
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                  className={`w-full text-center text-5xl md:text-7xl font-black py-6 md:py-10 px-6 md:px-12 rounded-[2rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] transition-all outline-none shadow-[0_15px_30px_-8px_rgba(0,0,0,0.15)] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] ${
                    feedback === 'correct' ? 'border-green-400 bg-green-50 text-green-600' :
                    feedback === 'incorrect' ? 'border-pink-400 bg-pink-50 text-pink-600' :
                    'border-white bg-white focus:border-yellow-400 text-sky-900'
                  }`}
                />
                {feedback === 'correct' && <CheckCircle2 className="absolute -right-2 md:-right-20 top-1/2 -translate-y-1/2 text-green-500 w-10 h-10 md:w-16 md:h-16 animate-bounce" />}
                {feedback === 'incorrect' && <XCircle className="absolute -right-2 md:-right-20 top-1/2 -translate-y-1/2 text-pink-500 w-10 h-10 md:w-16 md:h-16 animate-shake" />}
              </div>

              <div className="flex gap-3 md:gap-6">
                {feedback === 'correct' ? (
                  <button 
                    onClick={handleNextProblem}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black py-4 md:py-8 rounded-2xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl flex items-center justify-center gap-2 md:gap-4 transition-all hover:scale-105 active:scale-95 text-lg md:text-2xl border-b-4 md:border-b-8 border-green-800"
                  >
                    AWESOME! <ArrowRight className="w-6 h-6 md:w-10 md:h-10" />
                  </button>
                ) : (
                  <button 
                    onClick={checkAnswer}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black py-4 md:py-8 rounded-2xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl flex items-center justify-center gap-2 md:gap-4 transition-all hover:scale-105 active:scale-95 text-lg md:text-2xl border-b-4 md:border-b-8 border-indigo-800"
                  >
                    READY? <CheckCircle2 className="w-6 h-6 md:w-10 md:h-10" />
                  </button>
                )}
                <button 
                  onClick={() => {
                    setUserAnswer('');
                    setFeedback(null);
                  }}
                  className="bg-white hover:bg-sky-50 text-sky-300 hover:text-sky-500 px-4 md:px-10 rounded-2xl md:rounded-[2.5rem] transition-all shadow-lg border-2 md:border-4 border-sky-50 transform hover:rotate-12"
                >
                  <RefreshCw className="w-6 h-6 md:w-10 md:h-10" />
                </button>
              </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default PracticeMode;
