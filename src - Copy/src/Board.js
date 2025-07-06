import React from 'react';
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
