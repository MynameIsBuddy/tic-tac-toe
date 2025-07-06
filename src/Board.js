// Board.js
import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick, winningLine }) => {
  return (
    <div className="game-board">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onClick(index)}
          isWinning={winningLine && winningLine.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;