import { useEffect, useState } from "react";
import { pokemonCall } from "../services/pokemonCall";
import { fetchAndParse } from "../services/fetchAndParse";
import { Box } from "@mui/material";

const BASE_URL = "https://pokeapi.co/api/v2/";

interface PokemonInfo {
  name: string;
}

export function Pokemons() {
  const [pokemonData, setPokemonData] = useState<PokemonInfo[]>([]);
  async function getAllPokemons() {
    const pokemons = await fetchAndParse(`${BASE_URL}pokemon?limit=20`);
    const allPokemons = await Promise.all(pokemons.results.map(pokemonCall));
    setPokemonData(allPokemons);
    console.log({ allPokemons });
  }
  useEffect(() => {
    getAllPokemons();
  }, []);
  return (
    <Box>
      {pokemonData.map((data) => (
        <h1>{data.name}</h1>
      ))}
    </Box>
  );
}
