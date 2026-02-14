import React, { useState, useEffect } from 'react';
import { SYLLABUS, generateProblem } from './utils/syllabus';
import { LevelConfig, MathProblem } from './types';
import Abacus from './components/Abacus';
import {
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Calculator,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Brain,
  ArrowRight,
  BookOpen
} from 'lucide-react';

const App = () => {
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  const [abacusValue, setAbacusValue] = useState<number>(0);

  const currentLevel = SYLLABUS.find(l => l.id === currentLevelId) || SYLLABUS[0];

  // Reset when level changes
  useEffect(() => {
    setProblem(null);
    setFeedback(null);
    setUserAnswer('');
    setAbacusValue(0);
    setMode('learn');
  }, [currentLevelId]);

  const handleNextLevel = () => {
    if (currentLevelId < 8) setCurrentLevelId(prev => prev + 1);
  };

  const handlePrevLevel = () => {
    if (currentLevelId > 1) setCurrentLevelId(prev => prev - 1);
  };

  const handleGenerateProblem = () => {
    const newProb = generateProblem(currentLevel);
    setProblem(newProb);
    setUserAnswer('');
    setFeedback(null);
    setAbacusValue(0);
  };

  const checkAnswer = () => {
    if (!problem) return;
    const val = parseFloat(userAnswer);
    // Simple float comparison with epsilon for decimals
    if (Math.abs(val - problem.answer) < 0.0001) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (feedback === 'correct') {
        handleGenerateProblem();
      } else {
        checkAnswer();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-gray-800 font-sans bg-gray-50 overflow-hidden">

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm h-auto md:h-screen md:sticky md:top-0 overflow-hidden shrink-0">
        <div className="p-6 border-b border-gray-100 bg-white z-10 flex flex-col items-start">
          <h1 className="text-2xl font-serif font-bold text-amber-900 flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Abacus Master
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Academy Curriculum</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {SYLLABUS.map((level) => (
            <button
              key={level.id}
              onClick={() => setCurrentLevelId(level.id)}
              className={`w-full text-left p-3 rounded-xl transition-all duration-200 border group relative overflow-hidden ${
                currentLevelId === level.id
                  ? 'bg-amber-50 border-amber-200 shadow-sm'
                  : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between relative z-10">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  currentLevelId === level.id ? 'text-amber-600' : 'text-gray-400 group-hover:text-gray-500'
                }`}>Level {level.id}</span>
                {currentLevelId === level.id && <ChevronRight className="w-4 h-4 text-amber-600" />}
              </div>
              <h3 className={`font-semibold mt-1 text-sm ${
                currentLevelId === level.id ? 'text-amber-900' : 'text-gray-700'
              }`}>{level.title}</h3>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">{currentLevel.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Level {currentLevel.id} Syllabus</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevLevel}
              disabled={currentLevelId === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextLevel}
              disabled={currentLevelId === 8}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mode Toggle */}
        <div className="px-8 py-4 shrink-0 bg-gray-50/50">
          <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
            <button
              onClick={() => setMode('learn')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                mode === 'learn' 
                  ? 'bg-amber-100 text-amber-900 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Theory
            </button>
            <button
              onClick={() => {
                setMode('practice');
                if (!problem) handleGenerateProblem();
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                mode === 'practice' 
                  ? 'bg-amber-100 text-amber-900 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Practice
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-12">
          
          {mode === 'learn' ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 text-amber-700">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Abacus Techniques</h3>
                  <p className="text-gray-600 leading-relaxed">{currentLevel.abacusDesc}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-700">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Mental Arithmetic</h3>
                  <p className="text-gray-600 leading-relaxed">{currentLevel.mentalDesc}</p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
                <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Learning Objectives
                </h3>
                <ul className="space-y-3">
                  {currentLevel.operations.map((op, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-amber-800">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 opacity-60" />
                      <span className="capitalize">{op.replace('_', ' ')} mastery</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-amber-800">
                     <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 opacity-60" />
                     <span>Digit Range: {currentLevel.digitRange[0]} to {currentLevel.digitRange[1]} digits</span>
                  </li>
                  {currentLevel.decimalPlaces > 0 && (
                    <li className="flex items-start gap-3 text-amber-800">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 opacity-60" />
                      <span>Decimal calculations ({currentLevel.decimalPlaces} places)</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-center pt-8">
                 <button 
                   onClick={() => {
                     setMode('practice');
                     handleGenerateProblem();
                   }}
                   className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-amber-200 hover:shadow-amber-300 transform hover:-translate-y-1"
                 >
                   Start Practice
                   <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Problem Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
                  <span className="text-xs font-bold tracking-wider text-gray-500 uppercase">Current Problem</span>
                  <button 
                    onClick={handleGenerateProblem}
                    className="text-gray-400 hover:text-amber-600 transition-colors"
                    title="Skip Problem"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-8 md:p-12 text-center">
                   <div className="text-5xl md:text-7xl font-mono font-bold text-gray-800 mb-8 tracking-tighter">
                     {problem ? problem.expression : "..."}
                   </div>
                   
                   <div className="max-w-md mx-auto relative">
                     <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter answer..."
                        className={`w-full text-center text-2xl p-4 rounded-xl border-2 outline-none transition-all ${
                          feedback === 'correct' 
                            ? 'border-green-500 bg-green-50 text-green-900' 
                            : feedback === 'incorrect'
                            ? 'border-red-500 bg-red-50 text-red-900'
                            : 'border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-50'
                        }`}
                        autoFocus
                     />
                     
                     {feedback && (
                       <div className={`absolute -right-12 top-1/2 -translate-y-1/2 hidden md:block ${
                         feedback === 'correct' ? 'text-green-500' : 'text-red-500'
                       }`}>
                         {feedback === 'correct' ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                       </div>
                     )}
                   </div>

                   <div className="mt-8 flex justify-center gap-4">
                     {feedback === 'correct' ? (
                       <button
                         onClick={handleGenerateProblem}
                         className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200 flex items-center gap-2"
                       >
                         Next Problem
                         <ArrowRight className="w-5 h-5" />
                       </button>
                     ) : (
                       <button
                         onClick={checkAnswer}
                         className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                       >
                         Check Answer
                       </button>
                     )}
                   </div>
                </div>
              </div>

              {/* Interactive Abacus Area */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between px-2">
                   <h3 className="font-bold text-gray-700 flex items-center gap-2">
                     <Calculator className="w-4 h-4 text-amber-600" />
                     Virtual Abacus
                   </h3>
                   <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded font-mono">
                     Current Value: {abacusValue}
                   </span>
                 </div>
                 
                 <div className="overflow-x-auto pb-4">
                   <Abacus 
                     interactive={true} 
                     value={undefined} // Let it maintain its own state for calculation
                     onChange={(val) => setAbacusValue(val)}
                     columns={13}
                   />
                 </div>
                 <p className="text-center text-gray-400 text-sm">
                   Tip: Use the abacus to solve the problem above before typing your answer.
                 </p>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;