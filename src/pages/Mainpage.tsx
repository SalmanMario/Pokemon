import { Box, Button, Typography } from "@mui/material";
import { routes, useNavigation } from "../routes";

export function Mainpage() {
  const { navigate } = useNavigation();

  const goToPokemons = () => {
    navigate(routes.pokemons);
  };

  const randomPokemon = () => {
    const randomID = Math.floor(Math.random() * 648) + 1; // Generate a random ID within the desired range

    navigate(routes.pokemonById, { id: randomID.toString() });
  };
  return (
    <Box sx={{ my: 2 }}>
      <Typography textAlign={"center"} variant="h3">
        Welcome to PokeDex! {""}
        <img
          style={{ width: 50, height: 50 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
          alt=""
        />
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography textAlign={"center"} variant="h5">
          Here you can find usefull information about pokemons.
        </Typography>
      </Box>
      <Typography textAlign={"center"} variant="h5">
        If you want to continue and explore this website please press one of the buttons or click on the navbar.
      </Typography>
      <Box sx={{ my: 2, display: "flex", justifyContent: "space-around" }}>
        <Button onClick={goToPokemons} variant="contained">
          Pokemons
        </Button>
        <Button onClick={randomPokemon} variant="contained">
          Random Pokemon
        </Button>
      </Box>
    </Box>
  );
}
