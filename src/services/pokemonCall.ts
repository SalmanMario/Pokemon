/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAndParse } from "./fetchAndParse";

const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonInfo {
  id: string;
  name: string;
  height: number;
  weight: number;
  base_happiness: number;
  base_experience: number;
  capture_rate: number;
  growth_rate: {
    name: string;
  };
  habitat: {
    name: string;
  };
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
        // type
      };
    };
    [1]: {
      type: {
        name: string;
        // type
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
    [3]: {
      base_stat: number;
      //SPECIAL ATTACK
    };
    [4]: {
      base_stat: number;
      //SPECIAL DEFENCE
    };
    [5]: {
      base_stat: number;
      //SPEED
    };
  };
  abilities: {
    [0]: {
      ability: {
        name: string;
      };
    };
    [1]: {
      ability: {
        name: string;
      };
    };
  };
  moves: {
    [0]: {
      move: {
        name: string;
      };
    };
    [11]: {
      move: {
        name: string;
      };
    };
    [22]: {
      move: {
        name: string;
      };
    };
  };
}

export function pokemonCall(pokemon: any) {
  return fetchAndParse(`${BASE_URL}/pokemon/${pokemon.name}`);
}

export function PokemonById(id: string) {
  return fetchAndParse(`${BASE_URL}/pokemon/${id}`);
}

export function PokemonSpecies(id: string) {
  return fetchAndParse(`${BASE_URL}/pokemon-species/${id}`);
}
