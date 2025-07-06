// StartScreen.js
import React from 'react';

const StartScreen = ({ onModeChange }) => {
  return (
    <div className="start-screen">
      <div>
        <h1>Tic Tac Toe</h1>
        <p>Choose your game mode</p>
      </div>
      
      <div className="start-screen-buttons">
        <button 
          className="btn-1player"
          onClick={() => onModeChange('1-player')}
        >
          🤖 1 Player (vs Bot)
        </button>
        <button 
          className="btn-2player"
          onClick={() => onModeChange('2-player')}
        >
          👥 2 Players
        </button>
      </div>
    </div>
  );
};

export default StartScreen;