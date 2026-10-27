import { memo } from "react";
import { Box, Button } from "@mui/material";

function GameBoard({ board, winningCells, disabled, onCellClick }) {
  return (
    <Box className="board" role="group" aria-label="Tic Tac Toe board">
      {board.map((value, index) => {
        const winning = winningCells.includes(index);
        return (
          <Button
            key={index}
            className={`cell ${value === "X" ? "cell-x" : value === "O" ? "cell-o" : ""} ${winning ? "cell-winning" : ""}`}
            onClick={() => onCellClick(index)}
            disabled={disabled || value !== null}
            aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${value ? `, ${value}` : ", empty"}`}
            disableRipple
          >
            {value}
          </Button>
        );
      })}
    </Box>
  );
}

export default memo(GameBoard);