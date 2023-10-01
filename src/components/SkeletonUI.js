import { Box, Container, Skeleton } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

const SkeletonUI = () => {
  return (
    <Container maxWidth="xl">
      <Grid2 container spacing={2} sx={{ mt: { xs: 3, md: 7 } }}>
        <Grid2 xs={12} md={3}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={120}
            sx={{ borderRadius: "20px", backgroundColor: "background.paper" }}
          />
        </Grid2>
        <Grid2 xs={12} md={3}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={120}
            sx={{ borderRadius: "20px", backgroundColor: "background.paper" }}
          />
        </Grid2>
        <Grid2 xs={12} md={3}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={120}
            sx={{ borderRadius: "20px", backgroundColor: "background.paper" }}
          />
        </Grid2>
        <Grid2 xs={12} md={3}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={120}
            sx={{ borderRadius: "20px", backgroundColor: "background.paper" }}
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} sx={{ mt: { xs: 3, md: 10 } }}>
        <Grid2 xs={12} md={8}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={60}
            sx={{
              borderRadius: "20px",
              mt: 2,
              backgroundColor: "background.paper",
            }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={60}
            sx={{
              borderRadius: "20px",
              mt: 2,
              backgroundColor: "background.paper",
            }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={60}
            sx={{
              borderRadius: "20px",
              mt: 2,
              backgroundColor: "background.paper",
            }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={60}
            sx={{
              borderRadius: "20px",
              mt: 2,
              backgroundColor: "background.paper",
            }}
          />
          <Skeleton
            variant="rounded"
            width="100%"
            height={60}
            sx={{
              borderRadius: "20px",
              mt: 2,
              backgroundColor: "background.paper",
            }}
          />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Skeleton
              variant="circular"
              width={320}
              height={320}
              sx={{
                borderRadius: "50%",
                mt: 2,
                backgroundColor: "background.paper",
              }}
            />
          </Box>
        </Grid2>
      </Grid2>
      <Skeleton
        variant="circular"
        width={50}
        height={50}
        sx={{
          borderRadius: "50%",
          position: "fixed",
          right: 25,
          bottom: 25,
          zIndex: 1,
          p: 1,
          backgroundColor: "background.paper",
        }}
      />
    </Container>
  );
};

export default SkeletonUI;
