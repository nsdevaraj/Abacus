import { useState, useEffect, useMemo, useRef } from 'react';
import { JUNIOR_SYLLABUS, SENIOR_SYLLABUS, ALL_LEVELS, getProblemForIndex } from '../utils/syllabus';
import { MathProblem, UserProgress, DailyLog } from '../types';

export const useAbacusGame = () => {
  const [learningPath, setLearningPath] = useState<'junior' | 'senior'>(() =>
    (localStorage.getItem('abacus_learning_path') as 'junior' | 'senior') || 'junior'
  );
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [masterSeed, setMasterSeed] = useState<number>(0);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  
  // Navigation & Game Modes
  const [mode, setMode] = useState<'learn' | 'practice' | 'map' | 'calendar'>('map');
  const [practiceType, setPracticeType] = useState<'visual' | 'mental'>('visual');
  
  const [abacusValue, setAbacusValue] = useState<number>(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Default progress structure
  const getDefaultProgress = () => ALL_LEVELS.map(l => ({
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
      if (parsed.length < ALL_LEVELS.length) {
        return ALL_LEVELS.map(l => {
          const existing = parsed.find((p: any) => p.levelId === l.id);
          return existing || { levelId: l.id, completedIndices: [], coins: 0, streak: 0 };
        });
      }
      return parsed;
    }
    return getDefaultProgress();
  });

  // Daily Logs state
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('abacus_daily_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [globalCoins, setGlobalCoins] = useState<number>(() => parseInt(localStorage.getItem('abacus_coins') || '0'));
  const [globalStreak, setGlobalStreak] = useState<number>(() => parseInt(localStorage.getItem('abacus_streak') || '0'));

  const currentSyllabus = learningPath === 'junior' ? JUNIOR_SYLLABUS : SENIOR_SYLLABUS;

  useEffect(() => {
    localStorage.setItem('abacus_learning_path', learningPath);
    const validIds = currentSyllabus.map(l => l.id);
    if (!validIds.includes(currentLevelId)) {
        setCurrentLevelId(validIds[0]);
    }
  }, [learningPath, currentLevelId, currentSyllabus]);

  const currentLevel = ALL_LEVELS.find(l => l.id === currentLevelId) || ALL_LEVELS[0];
  const levelProgress = useMemo(() => progress.find(p => p.levelId === currentLevelId) || progress[0], [progress, currentLevelId]);

  useEffect(() => {
    localStorage.setItem('abacus_progress', JSON.stringify(progress));
    localStorage.setItem('abacus_coins', globalCoins.toString());
    localStorage.setItem('abacus_streak', globalStreak.toString());
    localStorage.setItem('abacus_daily_logs', JSON.stringify(dailyLogs));
  }, [progress, globalCoins, globalStreak, dailyLogs]);

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
      localStorage.removeItem('abacus_daily_logs');
      localStorage.removeItem('abacus_learning_path');
      
      setProgress(getDefaultProgress());
      setDailyLogs([]);
      setGlobalCoins(0);
      setGlobalStreak(0);
      setMasterSeed(0);
      setMode('map');
      setPracticeType('visual');
      setLearningPath('junior');
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
      
      // Update Daily Log
      const today = new Date().toISOString().split('T')[0];
      setDailyLogs(prevLogs => {
        const existingIndex = prevLogs.findIndex(l => l.date === today);
        if (existingIndex >= 0) {
          const newLogs = [...prevLogs];
          newLogs[existingIndex] = {
            ...newLogs[existingIndex],
            solved: newLogs[existingIndex].solved + 1,
            lastLevelId: currentLevelId
          };
          return newLogs;
        } else {
          return [...prevLogs, { date: today, solved: 1, lastLevelId: currentLevelId }];
        }
      });

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

  return {
    state: {
      learningPath,
      currentSyllabus,
      currentLevelId,
      masterSeed,
      problem,
      userAnswer,
      feedback,
      mode,
      practiceType,
      abacusValue,
      showCelebration,
      isAudioEnabled,
      mobileMenuOpen,
      progress,
      globalCoins,
      globalStreak,
      dailyLogs,
      currentLevel,
      levelProgress
    },
    actions: {
      setLearningPath,
      setCurrentLevelId,
      setMode,
      setPracticeType,
      setAbacusValue,
      setMobileMenuOpen,
      setIsAudioEnabled,
      setUserAnswer,
      setFeedback,
      handleShuffle,
      handleResetAll,
      explainQuestion,
      startExercise,
      checkAnswer,
      handleNextProblem
    }
  };
};
