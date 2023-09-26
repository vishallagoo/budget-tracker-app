import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    }
})

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

export {lightTheme, darkTheme}