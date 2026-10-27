import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6257e8", dark: "#4f46c8", contrastText: "#ffffff" },
    secondary: { main: "#159b81" },
    background: { default: "#f5f7fb", paper: "#ffffff" },
    success: { main: "#18845d" },
    warning: { main: "#bd7a17" },
    error: { main: "#c23b4a" },
    text: { primary: "#202438", secondary: "#737b91" }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: "-0.045em" },
    h2: { fontWeight: 750, letterSpacing: "-0.035em" },
    button: { textTransform: "none", fontWeight: 700 }
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 10, padding: "10px 15px" } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } }
  }
});

export default theme;