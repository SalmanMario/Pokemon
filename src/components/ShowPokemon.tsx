import { Box, Grid } from "@mui/material";
import { PokemonInfo } from "../services/PokemonCall";
import { PokemonCard } from "./PokemonCard";

interface ShowPokemonProps {
  pokemonDisplay: PokemonInfo[];
}

export function ShowPokemon({ pokemonDisplay }: ShowPokemonProps) {
  return (
    <Box>
      <Grid container spacing={2}>
        {pokemonDisplay.map((data) => (
          <PokemonCard key={data.id} data={data} />
        ))}
      </Grid>
    </Box>
  );
}
