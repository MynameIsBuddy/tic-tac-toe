// App.js
import React, { useState } from 'react';
import StartScreen from './StartScreen';
import Game from './Game';
import './App.css';

const App = () => {
  const [gameMode, setGameMode] = useState('start');

  const handleBackToHome = () => {
    setGameMode('start');
  };

  return (
    <div className="app-container">
      <div className="background-overlay"></div>
      <div className="content">
        {gameMode === 'start' ? (
          <StartScreen onModeChange={setGameMode} />
        ) : (
          <Game gameMode={gameMode} onBackToHome={handleBackToHome} />
        )}
      </div>
    </div>
  );
};

export default App;