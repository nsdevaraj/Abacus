import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, Volume2, Brain, CheckCircle2, XCircle, ArrowRight, RefreshCw,
  Ear, Code, BookOpen, Lightbulb, Blocks, Check
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
  setFeedback,
}) => {
  const isCoding = problem.type === 'coding';

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 z-40 flex flex-col animate-slide-up">
      {/* Practice header */}
      <header className="px-4 md:px-8 py-3 md:py-4 flex items-center justify-between bg-white/70 dark:bg-slate-900/70 backdrop-blur border-b border-slate-200 dark:border-slate-800 shrink-0">
        <button
          data-focus
          onClick={() => setMode('map')}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 font-semibold text-sm transition-colors"
        >
          <ChevronLeft className="w-[18px] h-[18px]" /> Back
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-[0.16em]">
            Quest {problem.index} / 100
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-full max-w-[180px] md:max-w-none truncate">
              {currentLevel.title}
            </span>
            {practiceType === 'mental' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold bg-violet-50 text-violet-700 border-violet-200/70 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20">
                <Brain className="w-3 h-3" /> Mental
              </span>
            )}
          </div>
        </div>
        <button
          data-focus
          onClick={() => explainQuestion(problem)}
          className="p-2 rounded-xl bg-brand-50 border border-brand-200/70 text-brand-700 hover:bg-brand-100 dark:bg-brand-500/10 dark:border-brand-500/20 dark:text-brand-300 dark:hover:bg-brand-500/20 transition-colors"
          aria-label="Read aloud"
        >
          <Volume2 className="w-[18px] h-[18px]" />
        </button>
      </header>

      <div className={`flex-1 overflow-y-auto scroll-area p-4 md:p-10 flex flex-col items-center ${isCoding ? 'justify-start' : 'justify-center'}`}>
        {showCelebration && (
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="w-40 h-40 rounded-full bg-emerald-400/20 animate-pop" />
          </div>
        )}

        <div className="max-w-3xl w-full space-y-8 md:space-y-10">
          {isCoding ? (
            <CodingStoryView problem={problem} userAnswer={userAnswer} setUserAnswer={setUserAnswer} />
          ) : practiceType === 'visual' ? (
            <>
              {/* Problem */}
              <div className="text-center animate-pop">
                <div className="text-5xl sm:text-7xl md:text-8xl leading-[1.05] font-extrabold tracking-tight text-slate-900 dark:text-white select-none">
                  {problem.expression}
                  <span className="text-brand-600 dark:text-brand-400"> = </span>
                  <span className="text-slate-400 dark:text-slate-600">?</span>
                </div>
              </div>

              <Abacus interactive onChange={setAbacusValue} columns={11} />
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 md:p-12 text-center">
              <button
                onClick={() => explainQuestion(problem)}
                data-focus
                className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-brand-50 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/20 mx-auto flex items-center justify-center text-brand-600 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-500/20 transition-colors"
              >
                <Ear className="w-14 h-14" />
              </button>
              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Listen and visualize</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Close your eyes. Hear each number, then picture the beads moving in your mind.
              </p>
            </div>
          )}

          {/* Answer */}
          {!isCoding && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && checkAnswer()}
                  placeholder="?"
                  data-focus
                  className={`
                    w-full text-center text-5xl md:text-6xl font-extrabold tracking-tight tabular-nums
                    py-5 md:py-6 px-6 rounded-2xl
                    bg-white dark:bg-slate-900
                    border-2 outline-none transition-colors
                    ${feedback === 'correct'
                      ? 'border-emerald-400 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10'
                      : feedback === 'incorrect'
                      ? 'border-rose-400 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-500/10'
                      : 'border-slate-200 dark:border-slate-800 focus:border-brand-500 text-slate-900 dark:text-white'}
                  `}
                />
                {feedback === 'correct' && (
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 w-9 h-9 animate-pop" />
                )}
                {feedback === 'incorrect' && (
                  <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500 w-9 h-9 animate-shake" />
                )}
              </div>

              <div className="flex gap-3">
                {feedback === 'correct' ? (
                  <button
                    data-focus
                    onClick={handleNextProblem}
                    className="flex-1 py-4 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Next quest <ArrowRight className="w-[18px] h-[18px]" />
                  </button>
                ) : (
                  <button
                    data-focus
                    onClick={checkAnswer}
                    className="flex-1 py-4 rounded-xl font-bold text-base text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Check answer <Check className="w-[18px] h-[18px]" strokeWidth={3} />
                  </button>
                )}
                <button
                  data-focus
                  onClick={() => { setUserAnswer(''); setFeedback(null); }}
                  aria-label="Clear answer"
                  className="px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 hover:border-brand-300 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {isCoding && (
            <div className="max-w-xl mx-auto">
              <button
                data-focus
                onClick={() => userAnswer === 'done' ? checkAnswer() : setUserAnswer('done')}
                className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-colors ${
                  userAnswer === 'done'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-brand-600 hover:bg-brand-700 text-white'
                }`}
              >
                {userAnswer === 'done' ? 'Submit completion' : 'Mark as done'}
                <Check className="w-[18px] h-[18px]" strokeWidth={3} />
              </button>
            </div>
          )}
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

  useEffect(() => { setHintsShown(0); }, [problem.id]);

  return (
    <div className="space-y-6 animate-pop">
      {/* Story card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-500/20 flex items-center justify-center shrink-0">
            <Code className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {details?.levelTitle && (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wide">
                  {details.levelTitle}
                </span>
              )}
              {details?.stageName && (
                <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 text-[10px] font-bold uppercase tracking-wide">
                  {details.stageName}
                </span>
              )}
              {details?.category && (
                <span className="px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 text-[10px] font-bold uppercase tracking-wide">
                  {details.category}
                </span>
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              {problem.expression}
            </h2>
            {details?.scenario && (
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                <BookOpen className="w-4 h-4 mt-1 shrink-0 text-brand-500" />
                <span>{details.scenario}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <BlocklyEditor suggestedBlocks={blocks} storyKey={problem.id} />

      {blocks.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
            <Blocks className="w-4 h-4 text-brand-600" /> Blocks you'll use
          </h3>
          <div className="flex flex-wrap gap-2">
            {blocks.map((b, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-mono"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      {hints.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Hints ({hintsShown}/{hints.length})
            </h3>
            {hintsShown < hints.length && (
              <button
                onClick={() => setHintsShown(n => Math.min(n + 1, hints.length))}
                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-500/20 text-[11px] font-bold uppercase tracking-wide transition-colors"
              >
                Reveal next
              </button>
            )}
          </div>
          {hintsShown === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              Try the project on your own first. Stuck? Reveal a hint above.
            </p>
          ) : (
            <ol className="space-y-2 list-decimal list-inside text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {hints.slice(0, hintsShown).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeMode;
