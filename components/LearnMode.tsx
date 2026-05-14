import React from 'react';
import { Calculator, Brain, GraduationCap, Gamepad2 } from 'lucide-react';
import Abacus from './Abacus';
import { LevelConfig } from '../types';

interface LearnModeProps {
  currentLevel: LevelConfig;
  abacusValue: number;
  setAbacusValue: (val: number) => void;
}

const getPlaceValueHint = (level: LevelConfig) => {
  const max = level.digitRange?.[1] ?? 2;
  if (max <= 2) return 'ones and tens';
  if (max <= 4) return 'ones, tens, hundreds, and thousands';
  return 'ones up to ten-thousands';
};

const getLevelSteps = (level: LevelConfig) => {
  const steps = [
    'Reset the abacus to zero. Thumb is ready for lower beads, index finger for upper beads.',
    `Read the question, identify the operation (${level.operations.join(', ')}). Work right-to-left across ${getPlaceValueHint(level)} columns.`,
    'Say each move aloud before touching the beads — it improves accuracy and mental visualization.',
  ];
  if (level.id <= 2) {
    steps.push(
      'For +5 patterns: use the upper bead, then complete the rest with lower beads.',
      'For carries: move the tens bead first, then adjust the ones column with the complement.'
    );
  } else if (level.id <= 4) {
    steps.push(
      'For -10 patterns, borrow from the tens column first, then compensate in the ones column.',
      'When mixing + and −, pause after every column and confirm place value before moving on.'
    );
  } else if (level.id <= 6) {
    steps.push(
      'For multiplication, set the multiplicand, then apply partial products one place at a time.',
      'When decimals appear, mark the decimal position first so bead moves stay aligned with place value.'
    );
  } else if (level.id <= 8) {
    steps.push(
      'For division, estimate the quotient digit by digit, then subtract partial products to keep the remainder controlled.',
      'For 3- and 4-digit work, focus on one active column at a time to avoid skipping place values.'
    );
  } else {
    steps.push(
      'For fractions and percentages, convert to equivalent decimal or unit form first, then map onto abacus columns.',
      'For BODMAS and roots, split into mini-steps and clear-check the abacus after each sub-result.'
    );
  }
  steps.push('After answering, read the abacus once more before submitting. Builds reliable self-check habits.');
  return steps;
};

const LearnMode: React.FC<LearnModeProps> = ({ currentLevel, abacusValue, setAbacusValue }) => {
  const steps = getLevelSteps(currentLevel);

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-slide-up">
      {/* Concept cards */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-7">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 flex items-center justify-center mb-4">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Magic finger theory</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{currentLevel.abacusDesc}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-7">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 flex items-center justify-center mb-4">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Mental superpowers</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{currentLevel.mentalDesc}</p>
        </div>
      </div>

      {/* Training goals (brand gradient hero) */}
      <div className="relative overflow-hidden rounded-2xl p-7 md:p-8 text-white bg-gradient-to-br from-brand-600 to-brand-800">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.15) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <GraduationCap className="w-7 h-7" />
            <h3 className="text-lg md:text-xl font-bold">Your training goals</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {currentLevel.stages.map((s, i) => (
              <div key={i} className="rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/15 p-4">
                <span className="block font-bold text-sm mb-1">{s.name}</span>
                <span className="text-white/80 text-xs leading-relaxed">{s.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Numbered steps */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-7">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Level {currentLevel.id} step-by-step guide
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
          Follow this playbook for{' '}
          <strong className="font-semibold text-slate-800 dark:text-slate-200">{currentLevel.title}</strong>.
        </p>
        <ol className="space-y-3.5">
          {steps.map((s, i) => (
            <li key={i} className="flex items-start gap-3.5">
              <span className="w-7 h-7 rounded-full bg-brand-50 dark:bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-200/70 dark:border-brand-500/20 font-bold text-xs flex items-center justify-center shrink-0 tabular-nums">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">{s}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Free play */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-7">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Gamepad2 className="w-[18px] h-[18px]" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Free play</h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold tabular-nums text-sm">
            {abacusValue}
          </div>
        </div>
        <Abacus interactive value={abacusValue} onChange={setAbacusValue} columns={11} />
      </div>
    </div>
  );
};

export default LearnMode;
