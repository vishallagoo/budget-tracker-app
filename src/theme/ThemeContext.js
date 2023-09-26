import { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme } from "./Theme";
import { ThemeProvider as MuiThemeProvider} from "@mui/material/styles";


const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const themeBoolean = JSON.parse(localStorage.getItem('isDark')) || false
        return themeBoolean
    })

    const theme = isDarkTheme ? darkTheme : lightTheme
    return (
        <ThemeContext.Provider value={{isDarkTheme, setIsDarkTheme}}>
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}