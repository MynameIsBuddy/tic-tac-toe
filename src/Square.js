// Square.js
import React from 'react';

const Square = ({ value, onClick, isWinning }) => {
  const getSquareClass = () => {
    let className = 'square';
    
    if (isWinning) {
      className += ' winning';
    }
    
    if (value === 'X') {
      className += ' x';
    } else if (value === 'O') {
      className += ' o';
    }
    
    return className;
  };

  return (
    <button 
      className={getSquareClass()}
      onClick={onClick}
      disabled={value !== null}
    >
      {value}
    </button>
  );
};

export default Square;