import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Applayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", flex: 1 }}>
      <Navbar />
      <Container sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}
