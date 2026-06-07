import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    
    primary: {
      main: "#8c2d19", 
      light: "#b84a39",
      dark: "#5c190b",
    },
    secondary: {
      main: "#c5a059", 
    },
    background: {
      default: "#174917", 
      paper: "#08071a",   
    },
    text: {
      primary: "#e2e2e6",
      secondary: "#a0a0a5",
    },
  },
  typography: {
    fontFamily: '"Courier New", "Georgia", "Roboto", sans-serif', 
    h1: { fontSize: "2.5rem", fontWeight: 700, letterSpacing: "1px" },
    h6: { fontSize: "1.25rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
  },
  shape: {
    borderRadius: 4, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase", 
          borderRadius: 2,
          fontWeight: 600,
          letterSpacing: "1px",
          padding: "6px 16px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(197, 160, 89, 0.15)", 
            color: "#c5a059",
          },
          "&.active": {
            color: "#c5a059", 
            borderBottom: "2px solid #c5a059",
            borderRadius: 0,
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#031600",
          color: "#e2e2e6",
          borderBottom: "1px solid #2d2d35", 
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;