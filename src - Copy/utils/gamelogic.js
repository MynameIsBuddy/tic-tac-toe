// utils/gamelogic.js

export function calculateWinner(squares) {
  // Define all possible winning lines (indices of squares)
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Main diagonal
    [2, 4, 6]  // Anti-diagonal
  ];

  // Iterate over each winning line to check for a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // Get the indices for the current line
    
    // Check if the squares at these indices are not null/empty
    // AND if all three squares have the same marker ('X' or 'O')
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the marker of the winner ('X' or 'O')
    }
  }

  // If no winner, check for a draw (all squares are filled and no winner)
  if (squares.every(square => square !== null && square !== '')) {
    return 'Draw'; // Special string to indicate a draw
  }

  // If no winner and not a draw, the game is still ongoing
  return null;
}

export function getWinningLine(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]; // Return the winning line indices
    }
  }
  return null;
}