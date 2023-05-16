import { useEffect, useState } from "react";
import { PokemonInfo, pokemonCall } from "../services/pokemonCall";
import { fetchAndParse } from "../services/fetchAndParse";
import { Box } from "@mui/material";
import { ShowPokemon } from "../components/ShowPokemon";

const BASE_URL = "https://pokeapi.co/api/v2/";

export function Pokemons() {
  const [pokemonData, setPokemonData] = useState<PokemonInfo[]>([]);
  async function getAllPokemons() {
    const pokemons = await fetchAndParse(`${BASE_URL}pokemon?limit=100`);
    const allPokemons = await Promise.all(pokemons.results.map(pokemonCall));
    setPokemonData(allPokemons);
    console.log({ allPokemons });
  }
  useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <Box>
      <ShowPokemon pokemonDisplay={pokemonData} />
    </Box>
  );
}
