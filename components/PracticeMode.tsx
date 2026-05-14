import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, Volume2, PartyPopper, Calculator, Brain, CheckCircle2, XCircle, ArrowRight, RefreshCw, Code, Ear, Lightbulb, Blocks, BookOpen
} from 'lucide-react';
import BlocklyEditor from './BlocklyEditor';
import Abacus from './Abacus';
import { Problem, LevelConfig } from '../types';

interface PracticeModeProps {
  problem: Problem;
  currentLevel: LevelConfig;
  practiceType: 'visual' | 'mental';
  setMode: (mode: 'map' | 'learn' | 'practice') => void;
  explainQuestion: (prob: Problem) => void;
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
    <div className="absolute inset-0 bg-white dark:bg-slate-900 z-50 flex flex-col animate-in slide-in-from-right-12 duration-500">
      <header className="px-4 py-3 md:px-8 md:py-5 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 shrink-0">
         <button
          onClick={() => setMode('map')}
          className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300 font-semibold text-sm md:text-base transition-colors"
         >
           <ChevronLeft className="w-5 h-5" /> Back
         </button>
         <div className="flex flex-col items-center">
           <span className="text-[10px] md:text-[11px] uppercase font-semibold text-slate-400 tracking-[0.18em] mb-1">Quest {problem.index} / 100</span>
           <div className="flex items-center gap-2">
               <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-white px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full truncate max-w-[160px] md:max-w-none">{currentLevel.title}</h2>
               {practiceType === 'mental' && (
                   <span className="bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 px-2 py-0.5 rounded-full text-xs font-semibold border border-violet-200/70 dark:border-violet-500/20 flex items-center gap-1">
                       <Brain className="w-3 h-3" /> Mental
                   </span>
               )}
           </div>
         </div>
         <div className="w-20 md:w-32 flex items-center justify-end">
           <button
             onClick={() => explainQuestion(problem)}
             className="p-2 md:p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/15 dark:border-indigo-500/20 dark:text-indigo-300 transition-colors"
             aria-label="Read question aloud"
           >
             <Volume2 className="w-5 h-5" />
           </button>
         </div>
      </header>

      <div className={`flex-1 overflow-y-auto p-4 md:p-10 flex flex-col items-center relative w-full ${problem.type === 'coding' ? 'justify-start' : 'justify-center'}`}>
         
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
            
            {problem.type === 'coding' ? (
                <CodingStoryView problem={problem} userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
            ) : practiceType === 'visual' ? (
                <>
                  {/* Visual Mode: Problem Display */}
                  <div className="text-center animate-in zoom-in-50 duration-500">
                      <div className={`text-6xl sm:text-8xl md:text-[10rem] lg:landscape:text-7xl leading-none font-extrabold text-slate-900 dark:text-white tracking-tight select-none`}>
                      {problem.expression}<span className="text-indigo-600"> = </span>?
                      </div>
                  </div>

                  {/* Visual Mode: Abacus Interaction */}
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-800 p-3 md:p-6 xl:p-10 lg:landscape:p-3 rounded-3xl border border-slate-200/70 dark:border-slate-700 shadow-md max-w-5xl mx-auto w-full">
                      <Abacus interactive={true} onChange={setAbacusValue} columns={11} />
                  </div>
                </>
            ) : (
                /* Mental Mode: Audio Only */
                <div className="flex flex-col items-center justify-center py-4 md:py-10 lg:landscape:py-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <button
                      onClick={() => explainQuestion(problem)}
                      className="w-40 h-40 md:w-64 md:h-64 lg:landscape:w-40 lg:landscape:h-40 bg-gradient-to-br from-purple-100 to-white rounded-full flex flex-col items-center justify-center border-[8px] border-white shadow-[0_20px_50px_rgba(168,85,247,0.2)] active:scale-95 transition-all group hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)] hover:-translate-y-2"
                    >
                       <div className="relative">
                          <Ear className="w-16 h-16 md:w-24 md:h-24 lg:landscape:w-16 lg:landscape:h-16 text-purple-400 group-hover:text-purple-600 transition-colors" />
                          <div className="absolute -right-2 -top-2 w-6 h-6 md:w-8 md:h-8 bg-pink-500 rounded-full flex items-center justify-center text-white animate-pulse">
                              <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                          </div>
                       </div>
                       <span className="mt-4 font-black text-purple-400 uppercase tracking-widest text-xs md:text-sm group-hover:text-purple-600">Replay</span>
                    </button>

                    <div className="mt-8 md:mt-12 lg:landscape:mt-6 p-6 md:p-8 lg:landscape:p-4 bg-white/60 backdrop-blur-sm rounded-[2rem] border-2 border-white max-w-lg text-center shadow-lg">
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
              {problem.type !== 'coding' && <div className="relative group">
                <input 
                  type="number"
                  step="any"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="?"
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                  className={`w-full text-center text-5xl md:text-7xl lg:landscape:text-5xl font-extrabold py-5 md:py-8 lg:landscape:py-5 px-6 md:px-12 lg:landscape:px-6 rounded-3xl border-2 transition-colors outline-none shadow-lg ${
                    feedback === 'correct' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' :
                    feedback === 'incorrect' ? 'border-rose-400 bg-rose-50 text-rose-700' :
                    'border-slate-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                  }`}
                />
                {feedback === 'correct' && <CheckCircle2 className="absolute -right-2 md:-right-20 lg:landscape:-right-2 top-1/2 -translate-y-1/2 text-emerald-500 w-10 h-10 md:w-16 md:h-16 lg:landscape:w-10 lg:landscape:h-10 animate-bounce" />}
                {feedback === 'incorrect' && <XCircle className="absolute -right-2 md:-right-20 lg:landscape:-right-2 top-1/2 -translate-y-1/2 text-rose-500 w-10 h-10 md:w-16 md:h-16 lg:landscape:w-10 lg:landscape:h-10 animate-shake" />}
              </div>

              } <div className="flex gap-3 md:gap-6">
                {feedback === 'correct' ? (
                  <button
                    onClick={handleNextProblem}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 md:py-6 lg:landscape:py-4 rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] text-lg md:text-xl lg:landscape:text-lg"
                  >
                    Awesome! <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
                  </button>
                ) : (
                  <button
                    onClick={checkAnswer}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-4 md:py-6 lg:landscape:py-4 rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 md:gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] text-lg md:text-xl lg:landscape:text-lg"
                  >
                    Check Answer <CheckCircle2 className="w-5 h-5 md:w-7 md:h-7" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setUserAnswer('');
                    setFeedback(null);
                  }}
                  className="bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 px-4 md:px-6 rounded-2xl transition-colors shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                  aria-label="Clear answer"
                >
                  <RefreshCw className="w-6 h-6 md:w-10 md:h-10 lg:landscape:w-6 lg:landscape:h-6" />
                </button>
              </div>
            </div>

         </div>
      </div>
    </div>
  );
};

interface CodingStoryViewProps {
  problem: Problem;
  userAnswer: string;
  setUserAnswer: (val: string) => void;
}

const CodingStoryView: React.FC<CodingStoryViewProps> = ({ problem, userAnswer, setUserAnswer }) => {
  const details = problem.codingDetails;
  const hints = details?.hints ?? [];
  const blocks = details?.blocks ?? [];
  const [hintsShown, setHintsShown] = useState(0);

  // Reset hint counter when the story changes
  useEffect(() => {
    setHintsShown(0);
  }, [problem.id]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 animate-in zoom-in-50 duration-500 w-full">
      {/* Story card */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20 p-6 md:p-10 rounded-3xl border-4 border-orange-100 dark:border-orange-900/40 shadow-xl max-w-4xl w-full">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-100 dark:bg-orange-800/40 rounded-3xl flex items-center justify-center text-orange-500 dark:text-orange-300 shadow-inner shrink-0">
            <Code className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center gap-2 mb-2 justify-center md:justify-start">
              {details?.levelTitle && (
                <span className="px-2 py-1 rounded-full bg-orange-200/60 dark:bg-orange-800/40 text-orange-700 dark:text-orange-200 text-xs font-bold uppercase tracking-wide">
                  {details.levelTitle}
                </span>
              )}
              {details?.stageName && (
                <span className="px-2 py-1 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-200 text-xs font-bold">
                  {details.stageName}
                </span>
              )}
              {details?.category && (
                <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-200 text-xs font-bold">
                  {details.category}
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-orange-900 dark:text-orange-100 mb-3">
              {problem.expression}
            </h2>
            {details?.scenario && (
              <p className="text-base md:text-lg text-orange-800/90 dark:text-orange-100/80 font-medium leading-relaxed flex items-start gap-2">
                <BookOpen className="w-5 h-5 mt-1 shrink-0 text-orange-500" />
                <span>{details.scenario}</span>
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Embedded Blockly workspace + stage */}
      <BlocklyEditor suggestedBlocks={blocks} storyKey={problem.id} />

      {/* Blocks to use */}
      {blocks.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-5 md:p-7 rounded-3xl border-4 border-sky-100 dark:border-slate-700 shadow-md max-w-4xl w-full">
          <h3 className="flex items-center gap-2 text-base md:text-lg font-black text-sky-900 dark:text-sky-100 mb-3">
            <Blocks className="w-5 h-5 text-sky-500" /> Blocks you'll use
          </h3>
          <div className="flex flex-wrap gap-2">
            {blocks.map((b, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-sky-50 dark:bg-slate-700 border border-sky-200 dark:border-slate-600 text-sky-800 dark:text-sky-100 text-xs md:text-sm font-mono"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hints */}
      {hints.length > 0 && (
        <div className="bg-white dark:bg-slate-800 p-5 md:p-7 rounded-3xl border-4 border-yellow-100 dark:border-yellow-900/40 shadow-md max-w-4xl w-full">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="flex items-center gap-2 text-base md:text-lg font-black text-amber-700 dark:text-amber-200">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Hints ({hintsShown}/{hints.length})
            </h3>
            {hintsShown < hints.length && (
              <button
                onClick={() => setHintsShown((n) => Math.min(n + 1, hints.length))}
                className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black px-4 py-2 rounded-xl text-xs md:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Reveal next hint
              </button>
            )}
          </div>
          <ol className="space-y-2 list-decimal list-inside text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
            {hints.slice(0, hintsShown).map((h, i) => (
              <li key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                {h}
              </li>
            ))}
            {hintsShown === 0 && (
              <p className="text-slate-400 dark:text-slate-500 italic text-sm">
                Try the project on your own first. Stuck? Reveal a hint above.
              </p>
            )}
          </ol>
        </div>
      )}

      {/* Mark as done */}
      <div className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-3xl border-4 border-green-100 dark:border-green-900/40 shadow-md max-w-2xl w-full text-center">
        <p className="text-sky-700 dark:text-sky-200 font-medium mb-3">Did you finish the project in Scratch?</p>
        <button
          onClick={() => setUserAnswer('done')}
          className={`px-8 py-3 rounded-xl font-black text-lg transition-all transform hover:scale-105 active:scale-95 ${
            userAnswer === 'done'
              ? 'bg-green-500 text-white shadow-green-200 shadow-lg'
              : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-200 hover:bg-gray-200'
          }`}
        >
          {userAnswer === 'done' ? 'Ready to Submit!' : 'Yes, I finished it!'}
        </button>
      </div>
    </div>
  );
};

export default PracticeMode;
