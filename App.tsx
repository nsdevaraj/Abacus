import React from 'react';
import { useAbacusGame } from './hooks/useAbacusGame';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapMode from './components/MapMode';
import LearnMode from './components/LearnMode';
import PracticeMode from './components/PracticeMode';
import CalendarMode from './components/CalendarMode';
import ProfileMode from './components/ProfileMode';
import BottomNav from './components/BottomNav';

const App = () => {
  const { state, actions } = useAbacusGame();

  const distractionFree = state.focusMode && state.mode === 'practice';

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-brand-500 rounded-full animate-spin" />
          <p className="text-sm font-semibold">Loading your abacus adventure…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
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
        learningPath={state.learningPath}
        setLearningPath={actions.setLearningPath}
      />

      <div className="relative flex-1 flex flex-col min-w-0">
        {state.mode !== 'profile' && state.mode !== 'practice' && (
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
            darkMode={state.darkMode}
            setDarkMode={actions.setDarkMode}
          />
        )}

        <main className="flex-1 overflow-y-auto scroll-area px-4 md:px-10 py-8 md:py-12 pb-24 lg:pb-12">
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

          {state.mode === 'calendar' && <CalendarMode logs={state.dailyLogs} />}

          {state.mode === 'profile' && (
            <ProfileMode
              darkMode={state.darkMode}
              setDarkMode={actions.setDarkMode}
              classReminders={state.classReminders}
              setClassReminders={actions.setClassReminders}
              focusMode={state.focusMode}
              setFocusMode={actions.setFocusMode}
              personalBest={state.personalBest}
              handleResetAll={actions.handleResetAll}
              globalCoins={state.globalCoins}
            />
          )}
        </main>

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

        <BottomNav mode={state.mode} setMode={actions.setMode} hidden={distractionFree} />
      </div>
    </div>
  );
};

export default App;
