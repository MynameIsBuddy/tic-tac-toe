// Game.js
import React, { useState, useEffect } from 'react';
import makeBotMove from './utils/botLogic';
import { calculateWinner, getWinningLine } from './utils/gamelogic';
import Board from './Board';
import LivesDisplay from './LivesDisplay';

const Game = ({ gameMode, onBackToHome }) => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [playerLives, setPlayerLives] = useState({ X: 3, O: 3 });
  const [roundWinner, setRoundWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [winningLine, setWinningLine] = useState(null);

  const current = history[stepNumber];
  const currentSquares = current.squares;

  const handleClick = (i) => {
    if (isGameOver || roundWinner || currentSquares[i] || (gameMode === '1-player' && !xIsNext)) {
      return;
    }

    const newSquares = [...currentSquares];
    newSquares[i] = xIsNext ? 'X' : 'O';

    const newHistory = history.slice(0, stepNumber + 1).concat([{ squares: newSquares }]);
    setHistory(newHistory);
    setStepNumber(newHistory.length - 1);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      setRoundWinner(winner);
      setWinningLine(getWinningLine(newSquares));
    } else if (newSquares.every(square => square !== null)) {
      setRoundWinner('Draw');
    }
  };

  // Effect for bot's turn
  useEffect(() => {
    if (gameMode === '1-player' && !xIsNext && !roundWinner && !isGameOver) {
      const botMarker = 'O';
      const playerMarker = 'X';

      setTimeout(() => {
        const botMoveIndex = makeBotMove(currentSquares, botMarker, playerMarker);
        if (botMoveIndex !== null) {
          const updatedSquares = [...currentSquares];
          updatedSquares[botMoveIndex] = botMarker;

          const newHistory = history.slice(0, stepNumber + 1).concat([{ squares: updatedSquares }]);
          setHistory(newHistory);
          setStepNumber(newHistory.length - 1);
          setXIsNext(true);

          const winner = calculateWinner(updatedSquares);
          if (winner) {
            setRoundWinner(winner);
            setWinningLine(getWinningLine(updatedSquares));
          } else if (updatedSquares.every(square => square !== null)) {
            setRoundWinner('Draw');
          }
        }
      }, 800);
    }
  }, [xIsNext, gameMode, history, stepNumber, roundWinner, currentSquares, isGameOver]);

  // Effect untuk mengurangi nyawa ketika ada pemenang ronde
  useEffect(() => {
    if (roundWinner && roundWinner !== 'Draw') {
      const loser = roundWinner === 'X' ? 'O' : 'X';
      setPlayerLives(prevLives => {
        const newLives = { ...prevLives };
        newLives[loser]--;
        if (newLives[loser] <= 0) {
          setIsGameOver(true);
          setGameOverMessage(`Player ${roundWinner} wins the match!`);
        }
        return newLives;
      });
    } else if (roundWinner === 'Draw') {
      setGameOverMessage('It\'s a Draw!');
    }
  }, [roundWinner]);

  // Effect untuk mereset papan atau mengunci game setelah ronde/game over
  useEffect(() => {
    if (roundWinner) {
      setTimeout(() => {
        if (!isGameOver) {
          setHistory([{ squares: Array(9).fill(null) }]);
          setStepNumber(0);
          setRoundWinner(null);
          setGameOverMessage('');
          setWinningLine(null);
          setXIsNext(true);
        }
      }, 2000);
    }
  }, [roundWinner, isGameOver]);

  // Fungsi untuk mereset semua state game saat "Main Lagi"
  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
    setPlayerLives({ X: 3, O: 3 });
    setRoundWinner(null);
    setIsGameOver(false);
    setGameOverMessage('');
    setWinningLine(null);
  };

  // Game Over Screen
  if (isGameOver) {
    return (
      <div className="game-over">
        <h2>GAME OVER!</h2>
        <p>{gameOverMessage}</p>
        <div className="game-over-buttons">
          <button className="game-button btn-restart" onClick={resetGame}>
            🔄 Play Again
          </button>
          <button className="game-button btn-home" onClick={onBackToHome}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="game-container">
      <div className="game-header">
        <h2>
          {gameMode === '1-player' ? 'Player vs Bot' : 'Player vs Player'}
        </h2>
        <div className={`game-status ${
          roundWinner 
            ? roundWinner === 'Draw' 
              ? 'draw' 
              : 'winner'
            : xIsNext 
              ? 'player-x' 
              : 'player-o'
        }`}>
          {roundWinner ? (
            roundWinner === 'Draw' ? '🤝 It\'s a Draw!' : `🎉 Player ${roundWinner} wins this round!`
          ) : (
            `Player ${xIsNext ? 'X' : 'O'}'s turn`
          )}
        </div>
      </div>

      <Board 
        squares={currentSquares} 
        onClick={handleClick} 
        winningLine={winningLine}
      />

      <div className="lives-container">
        <LivesDisplay player="X" lives={playerLives.X} />
        <LivesDisplay player="O" lives={playerLives.O} />
      </div>

      <button className="game-button btn-home" onClick={onBackToHome}>
        🏠 Back to Home
      </button>
    </div>
  );
};

export default Game;