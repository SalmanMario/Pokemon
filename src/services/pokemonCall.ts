/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAndParse } from "./fetchAndParse";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonInfo {
  id: string;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    [0]: {
      type: {
        name: string;
      };
    };
  };
  stats: {
    [0]: {
      base_stat: number;
      //HP
    };
    [1]: {
      base_stat: number;
      //ATTACK
    };
    [2]: {
      base_stat: number;
      //DEFENCE
    };
  };
}

export function pokemonCall(pokemon: any) {
  return fetchAndParse(`${BASE_URL}/pokemon/${pokemon.name}`);
}

export function PokemonById(id: string) {
  return fetchAndParse(`${BASE_URL}/pokemon/${id}`);
}
