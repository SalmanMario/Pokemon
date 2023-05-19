import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      sx={{ p: 3, bgcolor: "#f44336", mt: 4, color: "#ffebee" }}
      display="flex"
      justifyContent="center"
      width={"100%"}
    >
      <Typography sx={{ fontSize: 20, marginTop: "auto", textAlign: "center" }} variant="body2">
        @PokeDex 2023 built by Salman Mario
      </Typography>
    </Box>
  );
}
