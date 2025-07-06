import { calculateWinner } from './gamelogic';

const SCORES = { X: -1, O: 1, Draw: 0 };

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

  if (!isMaximizingPlayer) {
    return -Infinity; // Minimizing player tries to minimize the score
  }

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
};

// Make bot move using Minimax
const makeBotMove = (squares, botMarker, playerMarker) => {
  let bestScore = -Infinity;
  let bestMove = null;
  [...new Set(squares)].forEach((i) => {
    squares[i] = botMarker;
    const moveScore = minimax(squares, 0, false, botMarker, playerMarker);
    squares[i] = null; // Revert to original state

    if (moveScore > bestScore) {
      bestScore = moveScore;
      bestMove = i;
    }
  });
  return bestMove;
};

export default makeBotMove;
