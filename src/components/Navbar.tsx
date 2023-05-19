import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { routes, useNavigation } from "../routes";
import "../App.css";

export function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { navigate } = useNavigation();

  const goToPokemon = () => {
    navigate(routes.pokemons);
  };

  const goToHome = () => {
    navigate(routes.root);
  };

  const randomPokemon = () => {
    const randomID = Math.floor(Math.random() * 648) + 1; // Generate a random ID within the desired range

    navigate(routes.pokemonById, { id: randomID.toString() });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CatchingPokemonIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PokeDex
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={goToHome}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={goToPokemon}>
                <Typography textAlign="center">Pokemons</Typography>
              </MenuItem>
              <MenuItem onClick={randomPokemon}>
                <Typography textAlign="center">Random Pokemon</Typography>
              </MenuItem>
              <MenuItem onClick={scrollToTop}>Scroll to Top</MenuItem>
            </Menu>
          </Box>
          <CatchingPokemonIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ffebee",
              textDecoration: "none",
            }}
          >
            PokeDex
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white" }} onClick={goToHome}>
              Home
            </Button>
            <Button sx={{ my: 2, color: "white" }} onClick={goToPokemon}>
              Pokemons
            </Button>
            <Button sx={{ my: 2, color: "white" }} onClick={randomPokemon}>
              Random Pokemon
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white" }} onClick={scrollToTop}>
              Scroll to Top
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
