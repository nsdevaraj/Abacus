import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SYLLABUS, getProblemForIndex } from './utils/syllabus';
import { LevelConfig, MathProblem, UserProgress, Operation } from './types';
import Abacus from './components/Abacus';
import {
  ChevronLeft,
  RefreshCw,
  Calculator,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Brain,
  ArrowRight,
  BookOpen,
  Trophy,
  Star,
  Coins,
  Flame,
  Gamepad2,
  Sparkles,
  PartyPopper,
  Ghost,
  Cloud,
  Rocket,
  Shuffle,
  Volume2,
  Trash2,
  Menu,
  X,
  Ear
} from 'lucide-react';

const App = () => {
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [masterSeed, setMasterSeed] = useState<number>(0);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Navigation & Game Modes
  const [mode, setMode] = useState<'learn' | 'practice' | 'map'>('map');
  const [practiceType, setPracticeType] = useState<'visual' | 'mental'>('visual');
  
  const [abacusValue, setAbacusValue] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Default progress structure
  const getDefaultProgress = () => SYLLABUS.map(l => ({ 
    levelId: l.id, 
    completedIndices: [], 
    coins: 0, 
    streak: 0 
  }));

  // Gamification state
  const [progress, setProgress] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem('abacus_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length < SYLLABUS.length) {
        return SYLLABUS.map(l => {
          const existing = parsed.find((p: any) => p.levelId === l.id);
          return existing || { levelId: l.id, completedIndices: [], coins: 0, streak: 0 };
        });
      }
      return parsed;
    }
    return getDefaultProgress();
  });

  const [globalCoins, setGlobalCoins] = useState<number>(() => parseInt(localStorage.getItem('abacus_coins') || '0'));
  const [globalStreak, setGlobalStreak] = useState<number>(() => parseInt(localStorage.getItem('abacus_streak') || '0'));

  const currentLevel = SYLLABUS.find(l => l.id === currentLevelId) || SYLLABUS[0];
  const levelProgress = useMemo(() => progress.find(p => p.levelId === currentLevelId)!, [progress, currentLevelId]);

  useEffect(() => {
    localStorage.setItem('abacus_progress', JSON.stringify(progress));
    localStorage.setItem('abacus_coins', globalCoins.toString());
    localStorage.setItem('abacus_streak', globalStreak.toString());
  }, [progress, globalCoins, globalStreak]);

  // --- Offline Audio Synthesis ---
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playSound = (type: 'correct' | 'incorrect') => {
    if (!isAudioEnabled) return;
    initAudio();
    const ctx = audioCtxRef.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      // Pleasant "Ding"
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      // Low "Buzz"
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  };

  const speak = (text: string) => {
    if (!isAudioEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for mental mode clarity
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  };

  const explainQuestion = (prob: MathProblem) => {
    const text = prob.expression
      .replace('×', 'times')
      .replace('÷', 'divided by')
      .replace('-', 'minus')
      .replace('+', 'plus');
    speak(`${text}`);
  };

  const startExercise = (index: number) => {
    const prob = getProblemForIndex(currentLevel, index, masterSeed);
    setProblem(prob);
    setUserAnswer('');
    setFeedback(null);
    setAbacusValue(0);
    setMode('practice');
    setShowCelebration(false);
    setTimeout(() => explainQuestion(prob), 500);
  };

  const handleShuffle = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    setMasterSeed(newSeed);
    if (mode === 'practice' && problem) {
      const prob = getProblemForIndex(currentLevel, problem.index, newSeed);
      setProblem(prob);
      explainQuestion(prob);
    }
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  const handleResetAll = () => {
    if (window.confirm("Are you sure you want to delete all your hard-earned coins and progress? This cannot be undone!")) {
      localStorage.removeItem('abacus_progress');
      localStorage.removeItem('abacus_coins');
      localStorage.removeItem('abacus_streak');
      
      setProgress(getDefaultProgress());
      setGlobalCoins(0);
      setGlobalStreak(0);
      setMasterSeed(0);
      setMode('map');
      setPracticeType('visual');
      setCurrentLevelId(1);
      speak("Everything has been reset. Let's start a fresh adventure!");
      setMobileMenuOpen(false);
    }
  };

  const checkAnswer = () => {
    if (!problem) return;
    const val = parseFloat(userAnswer);
    const isCorrect = Math.abs(val - problem.answer) < 0.0001;

    if (isCorrect) {
      setFeedback('correct');
      setShowCelebration(true);
      playSound('correct');
      speak("Correct!");
      
      if (!levelProgress.completedIndices.includes(problem.index)) {
        const bonus = globalStreak > 5 ? 20 : 10;
        setGlobalCoins(c => c + bonus);
        setProgress(prev => prev.map(p => 
          p.levelId === currentLevelId 
            ? { ...p, completedIndices: [...p.completedIndices, problem.index] }
            : p
        ));
      }
      setGlobalStreak(s => s + 1);
      setTimeout(() => setShowCelebration(false), 2000);
    } else {
      setFeedback('incorrect');
      setGlobalStreak(0);
      playSound('incorrect');
      speak("Try again.");
    }
  };

  const handleNextProblem = () => {
    if (!problem) return;
    if (problem.index < 100) {
      startExercise(problem.index + 1);
    } else {
      setMode('map');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-gray-800 font-sans bg-sky-50 overflow-hidden relative">
      
      {/* Playful Floating Elements Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <Cloud className="absolute top-10 left-10 w-24 h-24 text-white" />
        <Cloud className="absolute top-40 right-20 w-32 h-32 text-white" />
        <Rocket className="absolute bottom-20 left-1/4 w-16 h-16 text-sky-200 -rotate-45" />
        <Star className="absolute top-1/2 right-1/3 w-12 h-12 text-yellow-200 animate-pulse" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation - Responsive Drawer */}
      <aside className={`
          fixed md:relative inset-y-0 left-0 z-40
          w-[85vw] md:w-80 
          bg-white/95 md:bg-white/90 backdrop-blur-md 
          border-r border-sky-100 flex flex-col shadow-2xl md:shadow-xl 
          h-screen shrink-0 transition-transform duration-300 ease-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 md:p-8 border-b border-sky-50 flex flex-col items-center gap-4 md:gap-6 relative">
          {/* Mobile Close Button */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 bg-sky-50 rounded-full text-sky-400 md:hidden hover:bg-sky-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-sky-900 tracking-tight">
              Abacus<span className="text-pink-500">Fun</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 flex items-center justify-center gap-2 bg-yellow-100 px-3 py-2 rounded-2xl text-yellow-700 font-black border-2 border-yellow-200 shadow-sm">
              <Coins className="w-5 h-5 text-yellow-500" /> {globalCoins}
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 bg-pink-100 px-3 py-2 rounded-2xl text-pink-700 font-black border-2 border-pink-200 shadow-sm">
              <Flame className="w-5 h-5 text-pink-500" /> {globalStreak}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar pb-6">
          <div className="flex items-center justify-between px-4 mb-2">
            <p className="text-[11px] font-black text-sky-300 uppercase tracking-widest">Adventure Map</p>
          </div>
          
          <div className="px-2 space-y-2 mb-4">
            <button 
              onClick={handleShuffle}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-2xl border-2 border-indigo-100 transition-all font-black text-xs uppercase tracking-widest shadow-sm group"
            >
              <Shuffle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Shuffle Quests
            </button>
          </div>

          {SYLLABUS.map((level) => {
            const p = progress.find(item => item.levelId === level.id)!;
            const completion = p.completedIndices.length;

            return (
              <button
                key={level.id}
                onClick={() => {
                  setCurrentLevelId(level.id);
                  setMode('map');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-4 rounded-3xl transition-all duration-300 border-2 flex flex-col gap-1 relative overflow-hidden group ${
                  currentLevelId === level.id
                    ? 'bg-sky-500 border-sky-600 text-white shadow-lg scale-[1.03]'
                    : 'bg-white border-sky-50 hover:bg-sky-50 text-sky-900 shadow-sm hover:border-sky-100'
                }`}
              >
                <div className="flex items-center justify-between relative z-10">
                   <span className={`text-[10px] font-black uppercase tracking-widest ${currentLevelId === level.id ? 'text-sky-100' : 'text-sky-300'}`}>
                     Island {level.id}
                   </span>
                   {completion === 100 && <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />}
                </div>
                <h3 className="font-black text-sm z-10 leading-tight pr-4">{level.title}</h3>
                <div className="w-full bg-black/10 h-2.5 rounded-full mt-2 overflow-hidden border border-black/5">
                  <div 
                    className={`h-full transition-all duration-700 ease-out ${currentLevelId === level.id ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-pink-400'}`} 
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-sky-50 bg-white/50 backdrop-blur-sm">
          <button 
            onClick={handleResetAll}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl border-2 border-red-100 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm group"
          >
            <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
            Reset All Data
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
        <header className="bg-white/80 backdrop-blur-md border-b border-sky-100 px-4 md:px-8 py-3 md:py-5 flex items-center justify-between shrink-0 shadow-sm gap-2 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 rounded-xl text-sky-600 hover:bg-sky-50 md:hidden active:scale-95 transition-transform"
            >
              <Menu className="w-7 h-7" />
            </button>

            <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-lg shrink-0">
              <Ghost className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg md:text-2xl font-black text-sky-900 leading-tight truncate pr-2">{currentLevel.title}</h2>
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold mt-0.5 md:mt-1 whitespace-nowrap">
                <span className="bg-pink-100 text-pink-600 px-2 md:px-3 py-0.5 md:py-1 rounded-full border border-pink-200">
                   {levelProgress.completedIndices.length}% Mastered
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={`p-2 md:p-3 rounded-2xl border-2 transition-all shadow-sm ${isAudioEnabled ? 'bg-sky-100 border-sky-200 text-sky-600' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
            >
              <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="flex bg-sky-100/50 p-1 rounded-xl md:rounded-2xl border-2 border-sky-100 shadow-inner">
              <button
                onClick={() => { setMode('map'); setPracticeType('visual'); }}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all flex items-center gap-1 md:gap-2 text-xs md:text-sm font-black ${
                  mode === 'map' && practiceType === 'visual' ? 'bg-white text-sky-600 shadow-md transform -translate-y-0.5' : 'text-sky-400 hover:text-sky-600'
                }`}
              >
                <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Play</span>
              </button>
              <button
                onClick={() => { 
                  setMode('map'); 
                  setPracticeType('mental'); 
                  setIsAudioEnabled(true);
                }}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all flex items-center gap-1 md:gap-2 text-xs md:text-sm font-black ${
                  mode === 'map' && practiceType === 'mental' ? 'bg-white text-purple-600 shadow-md transform -translate-y-0.5' : 'text-purple-400 hover:text-purple-600'
                }`}
              >
                <Brain className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Mental</span>
              </button>
              <button
                onClick={() => setMode('learn')}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl transition-all flex items-center gap-1 md:gap-2 text-xs md:text-sm font-black ${
                  mode === 'learn' ? 'bg-white text-sky-600 shadow-md transform -translate-y-0.5' : 'text-sky-400 hover:text-sky-600'
                }`}
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Tips</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-12 pt-4 md:pt-8 no-scrollbar w-full">
          
          {mode === 'map' ? (
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="mb-8 md:mb-12 text-center">
                 <h3 className="text-2xl md:text-4xl font-black text-sky-900 mb-2 md:mb-3 tracking-tight">Your Quest Map</h3>
                 <div className="flex items-center justify-center gap-2">
                    {practiceType === 'mental' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold border border-purple-200">
                            <Brain className="w-3 h-3" /> Mental Mode Active
                        </span>
                    )}
                    <p className="text-sm md:text-base text-sky-500 font-bold">Collect stars to become a Hero! 🚀</p>
                 </div>
              </div>

              <div className="space-y-12 md:space-y-16">
                {currentLevel.stages.map((stage, sIdx) => (
                  <div key={sIdx} className="space-y-4 md:space-y-6 relative">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white border-4 border-white shadow-xl transform -rotate-6 shrink-0 ${practiceType === 'mental' ? 'bg-gradient-to-br from-purple-400 to-indigo-500' : 'bg-gradient-to-br from-yellow-300 to-yellow-500'}`}>
                        {practiceType === 'mental' ? <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" /> : <Star className="w-6 h-6 md:w-8 md:h-8 fill-white" />}
                      </div>
                      <div>
                        <h4 className="font-black text-lg md:text-2xl text-sky-900 leading-none mb-1">{stage.name}</h4>
                        <p className="text-sky-400 font-bold text-xs md:text-sm">{stage.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3 md:gap-4">
                      {Array.from({ length: stage.range[1] - stage.range[0] + 1 }).map((_, i) => {
                        const idx = stage.range[0] + i;
                        const isCompleted = levelProgress.completedIndices.includes(idx);
                        return (
                          <button
                            key={idx}
                            onClick={() => startExercise(idx)}
                            className={`aspect-square rounded-2xl md:rounded-3xl border-2 md:border-4 flex items-center justify-center font-black text-base md:text-lg transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-sm md:shadow-lg ${
                              isCompleted 
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-white text-white rotate-3' 
                                : practiceType === 'mental'
                                    ? 'bg-purple-50 border-purple-100 text-purple-300 hover:border-purple-300 hover:text-purple-600 hover:rotate-6'
                                    : 'bg-white border-sky-100 text-sky-200 hover:border-pink-300 hover:text-pink-500 hover:rotate-6'
                            }`}
                          >
                            {isCompleted ? <PartyPopper className="w-5 h-5 md:w-7 md:h-7" /> : idx}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : mode === 'learn' ? (
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
          ) : null}
        </div>

        {/* Practice Overlay */}
        {mode === 'practice' && problem && (
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
                            <div className="inline-block px-4 py-1.5 md:px-8 md:py-2.5 bg-pink-100 text-pink-600 rounded-full text-xs md:text-sm font-black uppercase tracking-widest border-2 md:border-4 border-white shadow-lg rotate-2">
                            {problem.operation} Power
                            </div>
                            <div className="text-6xl sm:text-8xl md:text-[11rem] font-black text-sky-900 tracking-tighter drop-shadow-xl select-none leading-none">
                            {problem.expression}<span className="text-pink-500"> = </span>?
                            </div>
                        </div>

                        {/* Visual Mode: Abacus Interaction */}
                        <div className="bg-sky-100/50 p-4 md:p-10 rounded-[2rem] md:rounded-[4rem] border-4 md:border-8 border-white shadow-xl md:shadow-2xl max-w-4xl mx-auto transform transition-transform hover:scale-[1.01] w-full">
                            <Abacus interactive={true} onChange={setAbacusValue} columns={11} />
                            <p className="text-center text-sm md:text-lg text-sky-500 mt-4 md:mt-8 font-black flex items-center justify-center gap-2 md:gap-3">
                            <Calculator className="w-5 h-5 md:w-6 md:h-6 text-pink-500" /> Use your magic beads!
                            </p>
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
          ) : null}
        )}

      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shake {
          0%, 100% { transform: translate(0, -50%); }
          20% { transform: translate(-20px, -50%); }
          40% { transform: translate(20px, -50%); }
          60% { transform: translate(-15px, -50%); }
          80% { transform: translate(15px, -50%); }
        }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-15%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
      `}</style>
    </div>
  );
};

export default App;
