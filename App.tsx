import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SYLLABUS, getProblemForIndex } from './utils/syllabus';
import { MathProblem, UserProgress } from './types';
import { Cloud, Rocket, Star } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapMode from './components/MapMode';
import LearnMode from './components/LearnMode';
import PracticeMode from './components/PracticeMode';

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

      {/* Sidebar Navigation */}
      <Sidebar 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        globalCoins={globalCoins}
        globalStreak={globalStreak}
        handleShuffle={handleShuffle}
        progress={progress}
        currentLevelId={currentLevelId}
        setCurrentLevelId={setCurrentLevelId}
        setMode={setMode}
        handleResetAll={handleResetAll}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
        <Header 
          setMobileMenuOpen={setMobileMenuOpen}
          currentLevel={currentLevel}
          levelProgress={levelProgress}
          isAudioEnabled={isAudioEnabled}
          setIsAudioEnabled={setIsAudioEnabled}
          mode={mode}
          setMode={setMode}
          practiceType={practiceType}
          setPracticeType={setPracticeType}
        />

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-12 pt-4 md:pt-8 no-scrollbar w-full">
          
          {mode === 'map' ? (
            <MapMode 
              practiceType={practiceType}
              currentLevel={currentLevel}
              levelProgress={levelProgress}
              startExercise={startExercise}
            />
          ) : mode === 'learn' ? (
            <LearnMode 
              currentLevel={currentLevel}
              abacusValue={abacusValue}
              setAbacusValue={setAbacusValue}
            />
          ) : null}
        </div>

        {/* Practice Overlay */}
        {mode === 'practice' && problem && (
          <PracticeMode 
            problem={problem}
            currentLevel={currentLevel}
            practiceType={practiceType}
            setMode={setMode}
            explainQuestion={explainQuestion}
            showCelebration={showCelebration}
            setAbacusValue={setAbacusValue}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            checkAnswer={checkAnswer}
            handleNextProblem={handleNextProblem}
            feedback={feedback}
            setFeedback={setFeedback}
          />
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