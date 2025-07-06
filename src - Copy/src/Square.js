import React from "react";

const Board = ({ squares, onClick }) => (
  <div className="game-board">
    {squares.map((square, index) => (
      <Square
        key={index}
        value={square}
        onClick={() => onClick(index)}
      />
    ))}
  </div>
);

export default Board;
