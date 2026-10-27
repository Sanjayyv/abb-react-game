import { memo } from "react";
import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import HandshakeIcon from "@mui/icons-material/Handshake";

const items = [
  { key: "xWins", label: "X WINS", symbol: "X", color: "#6257e8", bg: "#efedff" },
  { key: "draws", label: "DRAWS", symbol: "=", color: "#bd7a17", bg: "#fff4df" },
  { key: "oWins", label: "O WINS", symbol: "O", color: "#159b81", bg: "#e4f8f1" }
];

function Scoreboard({ score }) {
  return (
    <Box className="score-grid">
      {items.map((item) => (
        <Card key={item.key} variant="outlined" className="score-card">
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1.6}>
              <Box className="score-icon" sx={{ color: item.color, bgcolor: item.bg }}>
                {item.symbol === "X" ? <CloseIcon /> : item.symbol === "O" ? <RadioButtonUncheckedIcon /> : <HandshakeIcon />}
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={800}>{item.label}</Typography>
                <Typography variant="h4" fontWeight={800}>{score[item.key]}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default memo(Scoreboard);