import React from "react";
import MonthlyFigures from "./MonthlyFigures";
import Entries from "./Entries";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Typography } from "@mui/material";
import DataVis from "./DataVis";

const Home = () => {
  return (
    <Box sx={{ my: 3 }}>
      <MonthlyFigures />
      <Grid2 container spacing={2} sx={{ mt: { sm: 2, md: 5 } }}>
        <Grid2 xs={12} md={8}>
          <Typography variant="h6" color="text.primary" sx={{ p: 1 }}>
            Monthly Financial Summary
          </Typography>
          <Entries />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <Typography variant="h6" color="text.primary" sx={{ p: 1 }}>
            This Month's Spends by Categories
          </Typography>
          <DataVis />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Home;
