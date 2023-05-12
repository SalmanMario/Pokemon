import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PokemonById, PokemonInfo } from "../services/pokemonCall";
import { AppRouteParams } from "../routes";

export function ViewPokemon() {
  const { id = "" } = useParams<AppRouteParams["pokemonById"]>();
  const [pokemonId, setPokemonId] = useState<PokemonInfo | null>(null);

  useEffect(() => {
    PokemonById(id).then((data) => {
      console.log(data);
      setPokemonId(data);
    });
  }, []);

  return <h1>{pokemonId?.name}</h1>;
}
