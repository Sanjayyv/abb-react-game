import { memo } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UndoIcon from "@mui/icons-material/Undo";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

function GameControls({ mode, onModeChange, onResetGame, onUndo, onResetScore, canUndo, finished }) {
  return (
    <Stack spacing={1.5}>
      <FormControl fullWidth size="small">
        <InputLabel id="game-mode-label">Game mode</InputLabel>
        <Select labelId="game-mode-label" value={mode} label="Game mode" onChange={(event) => onModeChange(event.target.value)}>
          <MenuItem value="TwoPlayer">Two Players</MenuItem>
          <MenuItem value="Computer">Play Against Computer</MenuItem>
        </Select>
      </FormControl>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <Button fullWidth variant="outlined" startIcon={<UndoIcon />} onClick={onUndo} disabled={!canUndo || finished}>Undo last move</Button>
        <Button fullWidth variant="contained" startIcon={<RestartAltIcon />} onClick={onResetGame}>New game</Button>
      </Stack>
      <Button color="inherit" variant="text" startIcon={<DeleteSweepIcon />} onClick={onResetScore}>Reset scoreboard</Button>
    </Stack>
  );
}

export default memo(GameControls);