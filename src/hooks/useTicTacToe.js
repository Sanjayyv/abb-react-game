import { useCallback, useReducer } from "react";
import { applyMove, createGame, getComputerMove } from "../utils/gameLogic";

const initialState = {
  mode: "TwoPlayer",
  game: createGame("TwoPlayer"),
  score: { xWins: 0, oWins: 0, draws: 0 },
  notice: null
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE": {
      const { index } = action;
      if (state.game.status !== "InProgress" || state.game.board[index] !== null) {
        return { ...state, notice: { severity: "warning", message: "That square is not available." } };
      }

      let nextGame = applyMove(state.game, index);
      let nextScore = state.score;

      if (nextGame.status === "InProgress" && state.mode === "Computer") {
        const computerIndex = getComputerMove(nextGame.board);
        if (computerIndex !== -1) nextGame = applyMove(nextGame, computerIndex, "O");
      }

      if (nextGame.status !== "InProgress" && state.game.status === "InProgress") {
        nextScore = {
          xWins: state.score.xWins + (nextGame.winner === "X" ? 1 : 0),
          oWins: state.score.oWins + (nextGame.winner === "O" ? 1 : 0),
          draws: state.score.draws + (nextGame.status === "Draw" ? 1 : 0)
        };
      }

      return { ...state, game: nextGame, score: nextScore, notice: null };
    }
    case "MODE": {
      return { ...state, mode: action.mode, game: createGame(action.mode), notice: null };
    }
    case "RESET_GAME":
      return { ...state, game: createGame(state.mode), notice: null };
    case "UNDO": {
      const { game, mode } = state;
      if (!game.history.length || game.status !== "InProgress") return state;
      const removeCount = mode === "Computer" ? Math.min(2, game.history.length) : 1;
      const history = game.history.slice(0, -removeCount);
      const board = Array(9).fill(null);
      history.forEach((move) => { board[move.index] = move.player; });
      return {
        ...state,
        game: {
          ...game, board, history, currentPlayer: history.length % 2 === 0 ? "X" : "O",
          status: "InProgress", winner: null, winningCells: []
        },
        notice: null
      };
    }
    case "RESET_SCORE":
      return { ...state, score: { xWins: 0, oWins: 0, draws: 0 }, notice: { severity: "success", message: "Scoreboard reset." } };
    case "DISMISS_NOTICE":
      return { ...state, notice: null };
    default:
      return state;
  }
}

export default function useTicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const play = useCallback((index) => dispatch({ type: "MOVE", index }), []);
  const changeMode = useCallback((mode) => dispatch({ type: "MODE", mode }), []);
  const resetGame = useCallback(() => dispatch({ type: "RESET_GAME" }), []);
  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const resetScore = useCallback(() => dispatch({ type: "RESET_SCORE" }), []);
  const dismissNotice = useCallback(() => dispatch({ type: "DISMISS_NOTICE" }), []);
  return { ...state, play, changeMode, resetGame, undo, resetScore, dismissNotice };
}