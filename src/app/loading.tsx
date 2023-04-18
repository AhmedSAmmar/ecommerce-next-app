"use client";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

const Loading: FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={50} />
    </Box>
  );
};

export default Loading;
