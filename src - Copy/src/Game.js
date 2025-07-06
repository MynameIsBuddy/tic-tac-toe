import React, { useState, useEffect } from 'react';
import { makeBotMove } from './utils/botLogic';
import { calculateWinner } from './utils/gamelogic';
import Board from './components/Board';
import LivesDisplay from './components/LivesDisplay';

const Game = ({ gameMode, onBackToHome }) => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) },
  ]);

  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [playerLives, setPlayerLives] = useState({ X: 3, O: 3 });
  const [roundWinner, setRoundWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const current = history[stepNumber];
  const currentSquares = current.squares;

const handleClick = (i) => {
  if (isGameOver || roundWinner !== null || currentSquares[i] !== null || (gameMode === '1-player' && !xIsNext)) return;

  const newSquares = currentSquares.slice();
  newSquares[i] = xIsNext ? 'X' : 'O';
  setHistory(
    [...history, { squares: newSquares }] // Corrected: Removed the semicolon here
  );
  setStepNumber(stepNumber + 1);
  setXIsNext(!xIsNext);

  const winner = calculateWinner(newSquares);
  if (winner) {
    setRoundWinner(winner);
  }
};

  useEffect(() => {
    if (
      gameMode === '1-player' &&
      !xIsNext &&
      roundWinner === null &&
      !isGameOver
    ) {
      const botMoveTimeout = setTimeout(() => {
        const botMove = makeBotMove(currentSquares, 'O', 'X');
        if (botMove !== null) {
          const newSquares = currentSquares.slice();
          newSquares[botMove] = 'O';
          setHistory([...history, { squares: newSquares }]);
          setStepNumber(stepNumber + 1);
          setXIsNext(true);

          const winner = calculateWinner(newSquares);
          if (winner) {
            setRoundWinner(winner);
          }
        }
      }, 500);
    }, [xIsNext, roundWinner, isGameOver, history, currentSquares]); // <-- This closing bracket and parenthesis is the issue.
    // Cleanup existing timeout on changes
  }, [xIsNext, roundWinner, isGameOver, history, currentSquares]); // <-- And this one.
  useEffect(() => {
    if (roundWinner !== null) {
      if (roundWinner !== 'Draw') {
        setPlayerLives({
          X: calculateWinner(currentSquares) === 'X' ? playerLives.X - 1 : playerLives.X,
          O: calculateWinner(currentSquares) === 'O' ? playerLives.O - 1 : playerLives.O,
        });
        if (playerLives.X <= 0 || playerLives.O <= 0) {
          setIsGameOver(true);
          const winner = calculateWinner(currentSquares) === 'X' ? 'X' : 'O';
          setGameOverMessage(`${winner} wins the match!`);
        }
      } else {
        setGameOverMessage('It is a Draw!');
      }
    }
  }, [roundWinner]);

  useEffect(() => {
    if (roundWinner || isGameOver) {
      setTimeout(() => {
        if (isGameOver) return;
        setHistory([
          { squares: Array(9).fill(null) },
        ]);
        setStepNumber(0);
        setRoundWinner(null);
        setGameOverMessage('');
        setXIsNext(true);
      }, 1500);
    }
  }, [roundWinner, isGameOver]);

  const resetGame = () => {
    setHistory([
      { squares: Array(9).fill(null) },
    ]);
    setStepNumber(0);
    setXIsNext(true);
    setRoundWinner(null);
    setPlayerLives({ X: 3, O: 3 });
    setGameOverMessage('');
    setIsGameOver(false);
  };

  return (
    <div className="game">
      {isGameOver ? (
        <div className="game-over-screen">
          <h2>GAME OVER!</h2>
          <p className="game-over-message">{gameOverMessage}</p>
          <button onClick={resetGame}>Main lagi</button>
          <button onClick={onBackToHome}>Kembali ke Home</button>
        </div>
      ) : (
        <div className="game-container">
          <LivesDisplay player={xIsNext ? 'X' : 'O'} lives={playerLives[xIsNext ? 'X' : 'O']} />
          <Board squares={currentSquares} clickHandler={handleClick} />
          {roundWinner && (
            <p className="game-status-message">Ronde Seri! {roundWinner}</p>
          )}
          <button onClick={onBackToHome}>Kembali ke Home</button>
        </div>
      )}
    </div>
  );
};

export default Game;
