import { fetchAndParse } from "./fetchAndParse";

const BASE_URL = "https://pokeapi.co/api/v2";

export function pokemonCall(pokemon: any) {
  return fetchAndParse(`${BASE_URL}/pokemon/${pokemon.name}`);
}
