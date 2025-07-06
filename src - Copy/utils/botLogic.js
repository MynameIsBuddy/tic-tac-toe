// File: src/utils/botLogic.js
// eslint-disable-next-line no-unused-vars
import { calculateWinner } from './gamelogic'; // Pastikan path ini benar

// Skor untuk Minimax
const SCORES = {
  X: -1, // Jika X (pemain manusia) menang, itu buruk bagi O (bot)
  O: 1,  // Jika O (bot) menang, itu bagus untuk O
  Draw: 0 // Seri adalah netral
};

/**
 * Algoritma Minimax rekursif untuk menentukan langkah terbaik.
 * @param {Array<string|null>} board - Keadaan papan Tic-Tac-Toe saat ini (array 9 elemen).
 * @param {number} depth - Kedalaman rekursi (digunakan untuk mengoptimalkan atau jika ada banyak cabang, tapi tidak terlalu krusial untuk Tic-Tac-Toe).
 * @param {boolean} isMaximizingPlayer - True jika ini giliran pemain yang ingin memaksimalkan skornya (bot), false jika giliran pemain yang ingin meminimalkan skor bot (manusia).
 * @param {string} botMarker - Marker yang digunakan oleh bot (misal: 'O').
 * @param {string} playerMarker - Marker yang digunakan oleh pemain lawan (misal: 'X').
 * @returns {number} Skor terbaik yang bisa dicapai dari keadaan papan ini.
 */
function minimax(board, depth, isMaximizingPlayer, botMarker, playerMarker) {
  // Base case: Cek apakah game sudah berakhir
  const result = calculateWinner(board);
  if (result !== null) {
    // Jika game selesai, kembalikan skor yang sesuai
    if (result === botMarker) {
      return SCORES.O;     // Bot menang
    } else if (result === playerMarker) {
      return SCORES.X;     // Pemain lawan menang
    } else if (result === 'Draw') {
      return SCORES.Draw;  // Seri
    }
  }

  // Jika ini giliran pemain yang memaksimalkan (bot)
  if (isMaximizingPlayer) {
    let bestScore = -Infinity; // Inisialisasi dengan skor terendah mungkin
    // Jelajahi setiap kotak kosong
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = botMarker; // Coba langkah bot di kotak ini
        // Rekursif panggil minimax untuk giliran berikutnya (pemain yang meminimalkan)
        let score = minimax(board, depth + 1, false, botMarker, playerMarker);
        board[i] = null; // Batalkan langkah (penting untuk backtracking!)
        bestScore = Math.max(score, bestScore); // Pilih skor maksimum dari semua kemungkinan
      }
    }
    return bestScore;
  }
  // Jika ini giliran pemain yang meminimalkan (manusia)
  else {
    let bestScore = Infinity; // Inisialisasi dengan skor tertinggi mungkin
    // Jelajahi setiap kotak kosong
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = playerMarker; // Coba langkah pemain di kotak ini
        // Rekursif panggil minimax untuk giliran berikutnya (pemain yang memaksimalkan)
        let score = minimax(board, depth + 1, true, botMarker, playerMarker);
        board[i] = null; // Batalkan langkah
        bestScore = Math.min(score, bestScore); // Pilih skor minimum dari semua kemungkinan
      }
    }
    return bestScore;
  }
}

/**
 * Fungsi utama untuk menentukan langkah terbaik bot menggunakan Minimax.
 * @param {Array<string|null>} squares - Keadaan papan Tic-Tac-Toe saat ini.
 * @param {string} botMarker - Marker yang digunakan oleh bot (misal: 'O').
 * @param {string} playerMarker - Marker yang digunakan oleh pemain manusia (misal: 'X').
 * @returns {number|null} Indeks langkah terbaik untuk bot, atau null jika tidak ada langkah yang tersedia.
 */
function makeBotMove(squares, botMarker, playerMarker) {
  let bestScore = -Infinity; // Skor terbaik yang bisa dicapai bot
  let bestMove = null;       // Indeks langkah terbaik

  // Iterasi melalui setiap kotak di papan
  for (let i = 0; i < 9; i++) {
    // Jika kotak saat ini kosong, coba langkah di sana
    if (squares[i] === null) {
      // Buat salinan papan untuk simulasi agar tidak merusak papan asli
      const tempSquares = [...squares];
      tempSquares[i] = botMarker; // Simulasikan langkah bot

      // Panggil minimax untuk mendapatkan skor dari langkah ini.
      // Giliran selanjutnya adalah pemain manusia (isMaximizingPlayer = false).
      let score = minimax(tempSquares, 0, false, botMarker, playerMarker);

      // Jika skor ini lebih baik dari bestScore yang ditemukan sejauh ini
      if (score > bestScore) {
        bestScore = score;
        bestMove = i; // Simpan langkah ini sebagai langkah terbaik sementara
      }
    }
  }
  return bestMove; // Kembalikan langkah terbaik yang ditemukan
}

// Export fungsi makeBotMove agar bisa diimport dan digunakan di Game.js
export default makeBotMove;