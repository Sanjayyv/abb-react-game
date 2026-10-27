export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const EMPTY_BOARD = () => Array(9).fill(null);

export function getResult(board) {
  for (const cells of WIN_LINES) {
    const [a, b, c] = cells;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { status: "Won", winner: board[a], winningCells: cells };
    }
  }
  if (board.every(Boolean)) {
    return { status: "Draw", winner: null, winningCells: [] };
  }
  return { status: "InProgress", winner: null, winningCells: [] };
}

export function findWinningMove(board, player) {
  for (let index = 0; index < board.length; index += 1) {
    if (board[index] !== null) continue;
    const candidate = [...board];
    candidate[index] = player;
    if (getResult(candidate).winner === player) return index;
  }
  return -1;
}

// Required priority: win, block, center, corner, any available cell.
export function getComputerMove(board) {
  const win = findWinningMove(board, "O");
  if (win !== -1) return win;

  const block = findWinningMove(board, "X");
  if (block !== -1) return block;

  if (board[4] === null) return 4;
  for (const corner of [0, 2, 6, 8]) {
    if (board[corner] === null) return corner;
  }
  return board.findIndex((cell) => cell === null);
}

export function createGame(mode = "TwoPlayer") {
  return {
    board: EMPTY_BOARD(),
    currentPlayer: "X",
    mode,
    status: "InProgress",
    winner: null,
    winningCells: [],
    history: []
  };
}

export function applyMove(game, index, player = game.currentPlayer) {
  if (game.status !== "InProgress" || game.board[index] !== null) return game;

  const board = [...game.board];
  board[index] = player;
  const result = getResult(board);
  const move = {
    moveNumber: game.history.length + 1,
    player,
    index,
    row: Math.floor(index / 3) + 1,
    column: (index % 3) + 1
  };

  return {
    ...game,
    board,
    currentPlayer: player === "X" ? "O" : "X",
    ...result,
    history: [...game.history, move]
  };
}