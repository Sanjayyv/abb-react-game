# Tic Tac Toe — React + Vite + MUI

Frontend-only Tic Tac Toe implementation. All game state is held in React; no backend or API is required.

## Run locally

```bash
npm install
npm run dev
```

## Features

- Two-player and computer modes
- 3×3 board, win/draw detection and winning-cell highlighting
- Move history with row and column
- Undo one move in two-player mode and the last human/computer pair in computer mode
- Scoreboard and separate scoreboard reset confirmation
- Computer priority: win, block, center, corner, any empty square
- Responsive Material UI interface and accessible button labels

## Performance/design choices

- `useReducer` centralizes game transitions and avoids scattered state updates.
- `useCallback` stabilizes action callbacks.
- `useMemo` derives the status message only when relevant state changes.
- `React.memo` is used on presentational components.
- The board has only nine cells; virtualization is unnecessary.
- MUI theme centralizes color, shape and typography.
- Scoreboard is session-only and resets on refresh because this is frontend-only.
