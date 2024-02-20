import { Paper, Typography, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";

export const PaperStyle = styled(Paper)({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100px",
});

export const mapContainer = styled("div")({
  height: "85%",
  width: "100%",
});

export const markerContainer = styled("div")({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
  "&:hover": { zIndex: 2 },
});
