import { memo } from "react";
import { Box, Paper, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

function MoveHistory({ history }) {
  return (
    <Paper variant="outlined" className="panel history-panel">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Box>
          <Typography className="eyebrow">THIS GAME</Typography>
          <Typography variant="h6" fontWeight={800}>Move history</Typography>
        </Box>
        <Typography className="move-count">{history.length} moves</Typography>
      </Stack>

      {history.length === 0 ? (
        <Box className="empty-history">
          <HistoryIcon sx={{ fontSize: 34, mb: 1 }} />
          <Typography fontWeight={700}>No moves yet</Typography>
          <Typography variant="body2" color="text.secondary">Your moves will appear here.</Typography>
        </Box>
      ) : (
        <TableContainer className="history-table">
          <Table size="small" aria-label="Move history">
            <TableHead><TableRow><TableCell>#</TableCell><TableCell>Player</TableCell><TableCell>Position</TableCell></TableRow></TableHead>
            <TableBody>
              {history.map((move) => (
                <TableRow key={move.moveNumber}>
                  <TableCell>{move.moveNumber}</TableCell>
                  <TableCell><Typography fontWeight={800} color={move.player === "X" ? "primary.main" : "secondary.main"}>{move.player}</Typography></TableCell>
                  <TableCell>Row {move.row}, Col {move.column}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default memo(MoveHistory);