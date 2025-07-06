import React from "react";

const StartScreen = ({ onModeChange }) => (
  <div className="StartScreen">
    <h1>Tic Tac Toe</h1>
    <button
      className="start-screen-button"
      onClick={() => onModeChange('1-player')}
    >
      1 Player (vs Bot)
    </button>
    <button
      className="start-screen-button"
      onClick={() => onModeChange('2-player')}
    >
      2 Players
    </button>
  </div>
);

export default StartScreen;
