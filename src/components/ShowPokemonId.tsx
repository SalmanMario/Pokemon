import { Box } from "@mui/material";
import { PokemonInfo } from "../services/pokemon";
import { PokemonIdCard } from "./PokemonIdCard";

interface ShowPokemonIdProps {
  pokemonId: PokemonInfo;
  evolutions: any[];
}

export function ShowPokemonId({ pokemonId, evolutions }: ShowPokemonIdProps) {
  return (
    <Box>
      <PokemonIdCard data={pokemonId} evolutions={evolutions} />
    </Box>
  );
}
