import React, { useEffect } from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { DarkMode, WbSunny } from "@mui/icons-material";
import { useTheme } from "../theme/ThemeContext";

const ThemeToggler = () => {
  const { isDarkTheme, setIsDarkTheme } = useTheme();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    localStorage.setItem("isDark", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <Box sx={{ mr: 2 }}>
      <Tooltip title="Toggle Theme">
        <IconButton size="large" color="inherit" onClick={toggleTheme}>
          {isDarkTheme ? <WbSunny /> : <DarkMode />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ThemeToggler;
