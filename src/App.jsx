
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import Scoreboard from "./components/Scoreboard";
import GameBoard from "./components/GameBoard";
import MoveHistory from "./components/MoveHistory";
import GameControls from "./components/GameControls";
import useTicTacToe from "./hooks/useTicTacToe";

import "./App.css";

export default function App() {
  const {
    mode,
    game,
    score,
    notice,
    play,
    changeMode,
    resetGame,
    undo,
    resetScore,
    dismissNotice,
  } = useTicTacToe();

  const [confirmReset, setConfirmReset] = useState(false);

  const finished = game.status !== "InProgress";

  const statusMessage = useMemo(() => {
    if (game.status === "Won") {
      return `Player ${game.winner} wins!`;
    }

    if (game.status === "Draw") {
      return "It's a draw!";
    }

    if (mode === "Computer" && game.currentPlayer === "O") {
      return "Computer's turn";
    }

    return `Player ${game.currentPlayer}'s turn`;
  }, [game.status, game.winner, game.currentPlayer, mode]);

  const handleResetScore = useCallback(() => {
    setConfirmReset(true);
  }, []);

  const confirmScoreReset = useCallback(() => {
    resetScore();
    setConfirmReset(false);
  }, [resetScore]);

  const cancelScoreReset = useCallback(() => {
    setConfirmReset(false);
  }, []);

  return (
    <Box className="app-background">
      <Container maxWidth="lg" className="app-container">
        {/* Header */}
        <Stack
          className="page-header"
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
          
            <Typography variant="h1" className="page-title">
              Tic Tac Toe<span>.</span>
            </Typography>

            
          </Box>

          <Box className="local-chip">
            <SportsEsportsIcon fontSize="small" />
            React · Local game
          </Box>
        </Stack>

        {/* Scoreboard */}
        <Scoreboard score={score} />

        {/* Main Content */}
        <Box className="content-grid">
          <Paper variant="outlined" className="panel game-panel">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              mb={2.5}
            >
              <Box>
                <Typography className="eyebrow">
                  THE GAME
                </Typography>

                <Typography variant="h5" fontWeight={800}>
                  Make your move
                </Typography>
              </Box>
            </Stack>

            {/* Current Turn */}
            <Box
              className={`turn-banner ${finished ? "finished" : ""}`}
            >
              <Box
                className={`turn-token ${
                  game.currentPlayer === "O" ? "token-o" : ""
                }`}
              >
                {game.winner ||
                  (game.status === "Draw" ? "=" : game.currentPlayer)}
              </Box>

              <Box>
                <Typography fontWeight={800}>
                  {statusMessage}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {mode === "Computer"
                    ? "You are X · Computer is O"
                    : "Two players · Take turns"}
                </Typography>
              </Box>
            </Box>

            {/* Game Board */}
            <GameBoard
              board={game.board}
              winningCells={game.winningCells}
              disabled={finished}
              onCellClick={play}
            />

            <Typography className="game-note">
              {finished
                ? "Game complete. Start a new game to play again."
                : "Choose an empty square to play."}
            </Typography>

            {/* Game Controls */}
            <Box mt={3}>
              <GameControls
                mode={mode}
                onModeChange={changeMode}
                onResetGame={resetGame}
                onUndo={undo}
                onResetScore={handleResetScore}
                canUndo={game.history.length > 0 && !finished}
                finished={finished}
              />
            </Box>
          </Paper>

          {/* Move History */}
          <MoveHistory history={game.history} />
        </Box>

        {/* Footer */}
        <Box component="footer" className="page-footer">
          <Typography
            variant="caption"
            fontWeight={800}
            letterSpacing={1.5}
          >
            TIC TAC TOE
          </Typography>

          <Typography variant="caption">
            Built with React, MUI & JavaScript
          </Typography>
        </Box>
      </Container>

      {/* Score Reset Confirmation */}
      <Snackbar
        open={confirmReset}
        onClose={cancelScoreReset}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="warning"
          variant="filled"
          onClose={cancelScoreReset}
          action={
            <Box className="alert-actions">
              <button onClick={confirmScoreReset}>
                Reset
              </button>

              <button onClick={cancelScoreReset}>
                Cancel
              </button>
            </Box>
          }
        >
          Reset all scoreboard values?
        </Alert>
      </Snackbar>

      {/* Game Notifications */}
      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={3000}
        onClose={dismissNotice}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {notice ? (
          <Alert
            severity={notice.severity}
            onClose={dismissNotice}
            variant="filled"
          >
            {notice.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
