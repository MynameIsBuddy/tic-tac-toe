Tic Tac Toe GameThis is a Tic Tac Toe game built with React, featuring both 1-player (vs. Bot) and 2-player modes, along with a lives system for competitive play. This README also documents the prompts used to generate parts of this project using a large language model (IBM Granite).Table of ContentsTic Tac Toe GameTable of ContentsFeaturesProject StructureInstallationUsageDevelopment Prompts & ResultsPhase 1: UI PreparationStep 1: Create StartScreen ComponentPhase 2: Game Board ComponentsStep 2.1: Create Square ComponentStep 2.2: Create Board ComponentPhase 3: Core Game Logic & Lives SystemStep 3.1: calculateWinner FunctionStep 3.2: LivesDisplay ComponentPhase 4: Bot Logic (for 1-Player Mode)Step 4.1: makeBotMove Function (Hard Bot with Minimax)Phase 5: Main Game Component (Game.js) & Global View ManagementStep 5.1: Create Game Component (Main Logic & State)Step 5.2: Global View Management in App.jsStep 5.3: CSS StylingStylingFeaturesTwo Game Modes: Play against an unbeatable AI bot (1-player) or challenge a friend (2-player).Lives System: A unique feature where each player has a set number of lives, and losing a round reduces a life. The game ends when a player runs out of lives.Minimax AI: The 1-player mode features an advanced AI using the Minimax algorithm, making it a challenging opponent.Responsive Design: Enjoy the game seamlessly across various devices and screen sizes.Clear UI: Intuitive and clean user interface for an engaging gaming experience.Project StructureCAPSTONEPROJECT/
├── build/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Board.js
│   │   ├── LivesDisplay.js
│   │   ├── Square.js
│   │   └── StartScreen.js
│   ├── utils/
│   │   ├── botLogic.js
│   │   └── gamelogic.js
│   ├── App.css
│   ├── App.js
│   ├── Game.js
│   ├── index.css
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
InstallationTo get a copy of this project up and running on your local machine for development and testing purposes, follow these steps:Clone the repository:git clone <your-repository-url>
cd CAPSTONEPROJECT
(Replace <your-repository-url> with the actual URL of your GitHub repository.)Install dependencies:npm install
UsageTo run the game in development mode:npm start
This will open the application in your browser, usually at http://localhost:3000.Development Prompts & ResultsThis section details the prompts used to generate the components and logic of this application using an AI model (IBM Granite), along with the resulting code.Phase 1: UI PreparationStep 1: Create StartScreen ComponentPrompt:Buat komponen fungsional React bernama StartScreen di src/components/StartScreen.js. Komponen ini menerima prop onModeChange (fungsi). Tampilkan judul <h1>Tic Tac Toe</h1> dan dua tombol: '1 Player (vs Bot)' yang memanggil onModeChange('1-player'), dan '2 Players' yang memanggil onModeChange('2-player'). Beri className="StartScreen" pada div pembungkus utama.
Result:import React from "react";

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
Phase 2: Game Board ComponentsStep 2.1: Create Square ComponentPrompt:Buat komponen fungsional React bernama Square di src/components/Square.js. Komponen ini menerima prop value (string 'X', 'O', atau null) dan onClick (fungsi). Render elemen <button> dengan teks dari value dan onClick dari prop. Tambahkan className="Square" secara default, dan tambahkan className="X" jika value adalah 'X' atau className="O" jika value adalah 'O'.
Result:import React from "react";

const Square = ({ value, onClick }) => {
  const buttonClass = `Square ${value === 'X' ? 'X' : value === 'O' ? 'O' : ''}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
Step 2.2: Create Board ComponentPrompt:Buat komponen fungsional React bernama Board di src/components/Board.js. Impor Square dari './Square'. Komponen ini menerima prop squares (array 9 string/null) dan onClick (fungsi yang menerima indeks). Render <div> dengan className="game-board". Di dalamnya, lakukan map pada array squares untuk merender komponen Square untuk setiap item, dengan key={index}, value yang sesuai, dan onClick={() => onClick(index)}.
Result:import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => {
  const handleClick = (index) => {
    onClick(index);
  };

  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Board;
Phase 3: Core Game Logic & Lives SystemStep 3.1: calculateWinner FunctionPrompt:Tulis fungsi JavaScript murni bernama calculateWinner di src/utils/gamelogic.js. Fungsi ini menerima satu argumen squares (array 9 string/null). Fungsi ini harus mendefinisikan semua garis kemenangan Tic Tac Toe, mengulanginya untuk memeriksa pemenang ('X' atau 'O'), mengembalikan 'Draw' jika papan penuh tanpa pemenang, atau null jika permainan masih berlangsung. Pastikan fungsi diekspor sebagai named export.
Result:// src/utils/gamelogic.js

export const calculateWinner = (squares) => {
  const winningLines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Returns 'X' or 'O'
    }
  }

  // Check for Draw
  if (squares.every(square => square !== null)) {
    return 'Draw';
  }

  return null; // Game still ongoing
};
Step 3.2: LivesDisplay ComponentPrompt:Buat komponen fungsional React bernama LivesDisplay di src/components/LivesDisplay.js. Komponen ini menerima prop player (string) dan lives (number). Render <div> dengan className="LivesDisplay". Di dalamnya, tampilkan <p> dengan teks 'Player [player] Lives:' dan <p> lain yang menampilkan emoji hati sejumlah lives (gunakan Array.from dan map).
Result:import React from "react";

const LivesDisplay = ({ player, lives }) => (
  <div className="LivesDisplay">
    <p>
      {player === 'X' ? 'Player X' : 'Player O'} Lives:
    </p>
    <p>
      {Array.from({ length: lives }, (_, i) => (
        <span key={i}> ❤️ </span>
      ))}
    </p>
  </div>
);

export default LivesDisplay;
Phase 4: Bot Logic (for 1-Player Mode)Step 4.1: makeBotMove Function (Hard Bot with Minimax)Prompt:Buat modul JavaScript bernama botLogic.js di src/utils/botLogic.js. Impor calculateWinner dari './gamelogic'. Definisikan objek konstanta SCORES = { X: -1, O: 1, Draw: 0 } (asumsikan bot menggunakan 'O'). Implementasikan fungsi rekursif minimax(board, depth, isMaximizingPlayer, botMarker, playerMarker) yang mengembalikan skor berdasarkan calculateWinner jika permainan berakhir, dan secara rekursif menjelajahi semua kemungkinan langkah. Gunakan Math.max untuk pemain yang memaksimalkan dan Math.min untuk pemain yang meminimalkan. Penting untuk "membatalkan" setiap gerakan simulasi setelah panggilan rekursif. Implementasikan fungsi utama makeBotMove(squares, botMarker, playerMarker) yang mengulang semua kotak kosong, mensimulasikan penempatan botMarker, memanggil minimax untuk mengevaluasi skor, melacak bestScore dan bestMove, mengatur ulang kotak simulasi ke null, dan mengembalikan bestMove. Ekspor makeBotMove sebagai default export.
Result:// src/utils/botLogic.js

import { calculateWinner } from './gamelogic';

const SCORES = { X: -1, O: 1, Draw: 0 }; // Assuming bot uses 'O'

// Minimax algorithm
const minimax = (board, depth, isMaximizingPlayer, botMarker, playerMarker) => {
  const winner = calculateWinner(board);
  if (winner === botMarker) {
    return SCORES[botMarker];
  }
  if (winner === playerMarker) {
    return -SCORES[botMarker];
  }
  if (winner === 'Draw') {
    return SCORES.Draw;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = botMarker;
        const score = minimax(board, depth + 1, false, botMarker, playerMarker);
        board[i] = null; // Undo move
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else { // Minimizing player
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = playerMarker;
        const score = minimax(board, depth + 1, true, botMarker, playerMarker);
        board[i] = null; // Undo move
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

// Make bot move using Minimax
const makeBotMove = (squares, botMarker, playerMarker) => {
  let bestScore = -Infinity;
  let bestMove = null;

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = botMarker;
      const moveScore = minimax(squares, 0, false, botMarker, playerMarker);
      squares[i] = null; // Revert to original state

      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
      }
    }
  }
  return bestMove;
};

export default makeBotMove;
Phase 5: Main Game Component (Game.js) & Global View ManagementStep 5.1: Create Game Component (Main Logic & State)Prompt:Buat komponen fungsional React bernama Game di src/Game.js. Impor React, useState, useEffect, makeBotMove, calculateWinner, Board, dan LivesDisplay. Komponen ini menerima prop gameMode dan onBackToHome. Deklarasikan state history, stepNumber, xIsNext, playerLives, roundWinner, isGameOver, dan gameOverMessage menggunakan useState. Definisikan current dan currentSquares. Implementasikan handleClick(i) untuk memperbarui papan, riwayat, dan beralih pemain, serta memanggil calculateWinner. Implementasikan useEffect untuk giliran bot (jika gameMode '1-player', xIsNext false), menggunakan setTimeout untuk memanggil makeBotMove dan memperbarui state. Implementasikan useEffect untuk logika pemenang ronde/nyawa, mengurangi nyawa yang kalah, dan mengatur isGameOver/gameOverMessage jika nyawa habis atau jika itu seri. Implementasikan useEffect untuk reset papan/transisi game over, menggunakan setTimeout untuk mereset ronde atau membiarkan layar game over ditampilkan. Implementasikan fungsi resetGame untuk mereset semua state permainan ke nilai awal. return statement harus merender layar "GAME OVER!" jika isGameOver benar (dengan tombol "Main Lagi" dan "Kembali ke Home"), atau tampilan permainan utama (dengan LivesDisplay, Board, pesan status ronde, dan tombol "Kembali ke Home") jika permainan belum berakhir.
Result:import React, { useState, useEffect } from 'react';
import makeBotMove from './utils/botLogic';
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
      [...history.slice(0, stepNumber + 1), { squares: newSquares }]
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
          setHistory([...history.slice(0, stepNumber + 1), { squares: newSquares }]);
          setStepNumber(stepNumber + 1);
          setXIsNext(true);

          const winner = calculateWinner(newSquares);
          if (winner) {
            setRoundWinner(winner);
          }
        }
      }, 500); // Delay for bot move
      return () => clearTimeout(botMoveTimeout); // Cleanup timeout
    }
  }, [xIsNext, roundWinner, isGameOver, history, currentSquares, gameMode, stepNumber]);


  useEffect(() => {
    if (roundWinner !== null) {
      if (roundWinner !== 'Draw') {
        setPlayerLives(prevLives => ({
          X: roundWinner === 'O' ? prevLives.X - 1 : prevLives.X, // If O wins, X loses a life
          O: roundWinner === 'X' ? prevLives.O - 1 : prevLives.O, // If X wins, O loses a life
        }));
      }
    }
  }, [roundWinner]);

  useEffect(() => {
    // Check for game over after lives are updated
    if (playerLives.X <= 0) {
      setIsGameOver(true);
      setGameOverMessage('Player O wins the match!');
    } else if (playerLives.O <= 0) {
      setIsGameOver(true);
      setGameOverMessage('Player X wins the match!');
    } else if (roundWinner === 'Draw') {
        setIsGameOver(true); // Game over on draw if no lives lost
        setGameOverMessage('It is a Draw!');
    }
  }, [playerLives, roundWinner]);


  useEffect(() => {
    if (roundWinner && !isGameOver) { // Only reset round if there's a winner but game is not over
      const resetRoundTimeout = setTimeout(() => {
        setHistory([
          { squares: Array(9).fill(null) },
        ]);
        setStepNumber(0);
        setRoundWinner(null);
        setXIsNext(true); // X always starts new round
      }, 1500); // Short delay before resetting round
      return () => clearTimeout(resetRoundTimeout);
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
          <button onClick={resetGame}>Play Again</button>
          <button onClick={onBackToHome}>Back to Home</button>
        </div>
      ) : (
        <div className="game-container">
          <LivesDisplay player="X" lives={playerLives.X} />
          <LivesDisplay player="O" lives={playerLives.O} />
          <Board squares={currentSquares} onClick={handleClick} />
          <p className="game-status-message">
            {roundWinner
              ? (roundWinner === 'Draw' ? 'Round Draw!' : `Round Winner: ${roundWinner}!`)
              : `Next Player: ${xIsNext ? 'X' : 'O'}`}
          </p>
          <button onClick={onBackToHome}>Back to Home</button>
        </div>
      )}
    </div>
  );
};

export default Game;
Step 5.2: Global View Management in App.jsPrompt:Sempurnakan komponen fungsional React App di src/App.js. Impor React, useState, StartScreen, Game, dan App.css. Kelola state gameMode (inisial 'start'). Implementasikan handleBackToHome yang mengatur gameMode kembali ke 'start'. return statement harus merender <div> dengan className="App", dan secara kondisional merender StartScreen (dengan setGameMode sebagai onModeChange) jika gameMode adalah 'start', atau komponen Game (dengan gameMode dan handleBackToHome) jika gameMode adalah '1-player' atau '2-player'.
Result:// src/App.js

import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './Game';
import './App.css';

const App = () => {
  const [gameMode, setGameMode] = useState('start');

  const handleBackToHome = () => {
    setGameMode('start');
  };

  return (
    <div className="App">
      {gameMode === 'start' ? (
        <StartScreen onModeChange={setGameMode} />
      ) : (
        <Game gameMode={gameMode} onBackToHome={handleBackToHome} />
      )}
    </div>
  );
};

export default App;
Step 5.3: CSS StylingPrompt:Sediakan aturan CSS komprehensif di src/App.css. Sertakan gaya untuk: Global/Body: Konten terpusat, latar belakang gelap, teks putih, font Arial. Pastikan #root memenuhi tinggi viewport dan memusatkan konten. StartScreen: Pusatkan konten vertikal dan horizontal, gaya judul, gaya tombol (latar belakang, warna teks, padding, border-radius, efek hover/active, lebar minimum, bayangan). Board: .game-board sebagai grid 3x3 (sel 100px), gap, lebar/tinggi tetap, margin, latar belakang gelap, sudut membulat, bayangan. .Square mengisi penuh sel, flexbox untuk pemusatan X/O, border, border-radius, font tebal besar, kursor pointer, latar belakang gelap, transisi hover. Gaya untuk .Square:hover, .Square:active, .Square:disabled, .Square.X, dan .Square.O (warna berbeda). LivesDisplay: Margin, ukuran font, flexbox untuk perataan, gap, latar belakang, padding, border-radius, bayangan. Game Status Messages: .game-status-message (ukuran font, margin, bold, warna berbeda). Game Over Screen: .game-over-screen (text-align, margin, padding, background, border-radius, bayangan), gaya khusus untuk h2, p, dan tombol. Responsive Design: Gunakan @media (max-width: 768px) untuk menyesuaikan ukuran pada layar kecil (misalnya, lebar/tinggi papan, ukuran/font kotak, elemen StartScreen, font LivesDisplay).
Result:/* src/App.css */

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#root {
  width: 100%;
  height: 100%;
}

/* StartScreen styles */
.StartScreen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  cursor: default;
}

.StartScreen h1 {
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.StartScreen button {
  width: 100%;
  padding: 15px;
  margin: 10px auto;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.StartScreen button:hover,
.StartScreen button:active {
  background-color: #45a049;
}

/* Board Styles */
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 5px;
  width: 300px;
  margin: 20px auto;
  background-color: #1E1E1E;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.Square {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  font-size: 48px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #282c34; /* Default background for squares */
}

.Square:hover,
.Square.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.Square.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.Square.X {
  color: red;
}

.Square.O {
  color: cyan;
}

/* LivesDisplay Styles */
.LivesDisplay {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  text-align: center;
}

.LivesDisplay p {
  margin: 0;
  font-size: 24px;
}

/* Game Status Message */
.game-status-message {
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
  color: white;
  font-weight: bold;
}

/* Game Over Screen */
.game-over-screen {
  text-align: center;
  margin: 20px auto;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 400px;
}

.game-over-screen h2 {
  font-size: 36px;
  color: #FFD700; /* Gold color for emphasis */
  margin-bottom: 15px;
}

.game-over-screen p.game-over-message {
  font-size: 24px;
  color: #ADD8E6; /* Light blue */
  margin-bottom: 25px;
}

.game-over-screen button {
  width: calc(100% - 20px); /* Adjust width for padding */
  padding: 15px;
  margin: 10px auto;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: #007bff; /* Blue for primary action */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.game-over-screen button:hover {
  background-color: #0056b3;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .game-board {
    width: 95%;
    grid-template-columns: repeat(3, 1fr); /* Make columns flexible */
    grid-template-rows: repeat(3, 1fr);
    aspect-ratio: 1 / 1; /* Maintain aspect ratio */
  }

  .Square {
    font-size: 32px;
  }

  .StartScreen {
    width: 90%;
    padding: 15px;
  }

  .StartScreen h1 {
    font-size: 28px;
  }

  .StartScreen button {
    padding: 12px;
    font-size: 14px;
  }

  .LivesDisplay p {
    font-size: 20px;
  }

  .game-status-message {
    font-size: 16px;
  }

  .game-over-screen {
    width: 90%;
    padding: 20px;
  }

  .game-over-screen h2 {
    font-size: 30px;
  }

  .game-over-screen p.game-over-message {
    font-size: 20px;
  }
}
