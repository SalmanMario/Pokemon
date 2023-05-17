import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonById, PokemonSpecies } from "../services/PokemonCall";
import { AppRouteParams } from "../routes";
import { Box } from "@mui/material";
import { ShowPokemonId } from "../components/ShowPokemonId";
import { fetchAndParse } from "../services/fetchAndParse";

function recursiveChainMapping(chain: any, result = [] as any[]): any {
  // returneaza elementele trecute + chain-ul curent
  function addChainToResult() {
    return [
      // element trecut
      ...result,
      {
        // chain-current
        species: chain.species,
      },
    ];
  }

  if (chain.evolves_to) {
    if (chain.evolves_to.length === 0) {
      // daca nu am evolutie, returneaza elementele curente
      return addChainToResult();
    }
    // verifica recursiv evolutiile
    return recursiveChainMapping(chain.evolves_to[0], addChainToResult());
  }

  // daca nu am evolutie, returneaza elementele curente
  return addChainToResult();
}

export function ViewPokemon() {
  const { id = "" } = useParams<AppRouteParams["pokemonById"]>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [evolutions, setEvolutions] = useState<any[]>([]);
  useEffect(() => {
    Promise.all([PokemonById(id), PokemonSpecies(id)])
      .then(([pokemonData, speciesData]) => {
        setPokemon({ ...pokemonData, ...speciesData });
        console.log(pokemonData, speciesData);
        if (speciesData.evolution_chain) {
          fetchAndParse(speciesData.evolution_chain.url).then((evolution_chain) => {
            const evolutionChains = recursiveChainMapping(evolution_chain.chain);
            // console.log({ evolutionChains });
            setEvolutions(evolutionChains);
          });
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return <Box>{pokemon && <ShowPokemonId evolutions={evolutions} pokemonId={pokemon} />}</Box>;
}
