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

const getPlaceValueHint = (level: LevelConfig) => {
  if (level.digitRange[1] <= 2) return 'ones and tens';
  if (level.digitRange[1] <= 4) return 'ones, tens, hundreds, and thousands';
  return 'ones up to ten-thousands';
};

const getLevelSteps = (level: LevelConfig) => {
  const steps = [
    'Reset the abacus to zero and keep your thumb ready for lower beads and index finger ready for upper beads.',
    `Read the question and identify the operation (${level.operations.join(', ')}). Work from right to left across ${getPlaceValueHint(level)} columns.`,
    'Say each move out loud before touching beads: this improves accuracy and mental visualization speed.'
  ];

  if (level.id <= 2) {
    steps.push(
      'For +5 and -5 patterns, use the upper bead as a helper and complete the remaining value with lower beads.',
      'For +10 patterns, move one tens bead first, then adjust the ones column using complement logic.'
    );
  } else if (level.id <= 4) {
    steps.push(
      'For -10 patterns, borrow from the tens column first, then compensate in the ones column.',
      'When addition and subtraction are mixed, pause after every column and confirm place value before moving on.'
    );
  } else if (level.id <= 6) {
    steps.push(
      'For multiplication, set the first number clearly, then apply table-based partial products one place at a time.',
      'When decimals appear, mark the decimal position first so bead moves stay aligned with place value.'
    );
  } else if (level.id <= 8) {
    steps.push(
      'For division, estimate quotient digit-by-digit, then subtract partial products to keep the remainder under control.',
      'In 3- and 4-digit work, lock your eyes on one active column at a time to avoid skipping place values.'
    );
  } else {
    steps.push(
      'For fractions and percentages, convert to equivalent decimal or unit form first, then map the value onto abacus columns.',
      'For BODMAS and square roots, split the expression into mini-steps and clear-check the abacus after each sub-result.'
    );
  }

  level.stages.forEach((stage) => {
    steps.push(
      `Practice stage \"${stage.name}\" (${stage.range[0]}-${stage.range[1]}): ${stage.description}`
    );
  });

  steps.push('After each answer, read the abacus value once more before submitting to build reliable self-check habits.');

  return steps;
};

const LearnMode: React.FC<LearnModeProps> = ({
  currentLevel,
  abacusValue,
  setAbacusValue
}) => {
  const levelSteps = getLevelSteps(currentLevel);

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in zoom-in-95 duration-500">
       <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white dark:bg-slate-800/60 p-6 md:p-8 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/15 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-300">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Magic Finger Theory</h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{currentLevel.abacusDesc}</p>
        </div>
        <div className="bg-white dark:bg-slate-800/60 p-6 md:p-8 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-sm">
          <div className="w-12 h-12 bg-violet-50 dark:bg-violet-500/15 rounded-xl flex items-center justify-center mb-4 text-violet-600 dark:text-violet-300">
            <Brain className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Mental Superpowers</h3>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">{currentLevel.mentalDesc}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-lg shadow-indigo-500/30">
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3">
            <GraduationCap className="w-7 h-7 md:w-8 md:h-8" /> Your Training Goals
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
             {currentLevel.stages.map((s, idx) => (
               <div key={idx} className="bg-white/10 p-4 md:p-5 rounded-xl border border-white/15 backdrop-blur-sm transition-colors hover:bg-white/15">
                 <span className="block font-bold text-base md:text-lg mb-1">{s.name}</span>
                 <span className="text-indigo-100/90 font-medium text-xs md:text-sm leading-relaxed">{s.description}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/60 p-6 md:p-8 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Level {currentLevel.id} Step-by-Step Abacus Guide
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          Follow this playbook for <span className="font-bold text-slate-900 dark:text-white">{currentLevel.title}</span> to practice the exact method required at this level.
        </p>
        <ol className="space-y-3">
          {levelSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-sm md:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
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