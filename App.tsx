import React from 'react';
import { Cloud, Rocket, Star } from 'lucide-react';
import { useAbacusGame } from './hooks/useAbacusGame';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapMode from './components/MapMode';
import LearnMode from './components/LearnMode';
import PracticeMode from './components/PracticeMode';

const App = () => {
  const { state, actions } = useAbacusGame();

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
      {state.mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => actions.setMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        mobileMenuOpen={state.mobileMenuOpen}
        setMobileMenuOpen={actions.setMobileMenuOpen}
        globalCoins={state.globalCoins}
        globalStreak={state.globalStreak}
        handleShuffle={actions.handleShuffle}
        progress={state.progress}
        currentLevelId={state.currentLevelId}
        setCurrentLevelId={actions.setCurrentLevelId}
        setMode={actions.setMode}
        handleResetAll={actions.handleResetAll}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
        <Header 
          setMobileMenuOpen={actions.setMobileMenuOpen}
          currentLevel={state.currentLevel}
          levelProgress={state.levelProgress}
          isAudioEnabled={state.isAudioEnabled}
          setIsAudioEnabled={actions.setIsAudioEnabled}
          mode={state.mode}
          setMode={actions.setMode}
          practiceType={state.practiceType}
          setPracticeType={actions.setPracticeType}
        />

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-12 pt-4 md:pt-8 no-scrollbar w-full">
          {state.mode === 'map' && (
            <MapMode 
              practiceType={state.practiceType}
              currentLevel={state.currentLevel}
              levelProgress={state.levelProgress}
              startExercise={actions.startExercise}
            />
          )}
          
          {state.mode === 'learn' && (
            <LearnMode 
              currentLevel={state.currentLevel}
              abacusValue={state.abacusValue}
              setAbacusValue={actions.setAbacusValue}
            />
          )}
        </div>

        {/* Practice Mode Logic: 
            If practiceType is 'mental', PracticeMode will automatically hide the abacus and numbers 
            and show an audio button instead. This is handled internally by PracticeMode.tsx.
        */}
        {state.mode === 'practice' && state.problem && (
          <PracticeMode 
            problem={state.problem}
            currentLevel={state.currentLevel}
            practiceType={state.practiceType}
            setMode={actions.setMode}
            explainQuestion={actions.explainQuestion}
            showCelebration={state.showCelebration}
            setAbacusValue={actions.setAbacusValue}
            userAnswer={state.userAnswer}
            setUserAnswer={actions.setUserAnswer}
            checkAnswer={actions.checkAnswer}
            handleNextProblem={actions.handleNextProblem}
            feedback={state.feedback}
            setFeedback={actions.setFeedback}
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
