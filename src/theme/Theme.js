import { createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#141d26",
      paper: "#243447",
    },
  },
});

export { lightTheme, darkTheme };
