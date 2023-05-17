import { useEffect, useState } from "react";
import { PokemonInfo, PokemonCall } from "../services/PokemonCall";
import { fetchAndParse } from "../services/fetchAndParse";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { ShowPokemon } from "../components/ShowPokemon";
import { useSearchParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

interface Querys<T> {
  key: string;
  initialValue: T;
  transformer: any;
  resetOn: string;
}

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT_PER_PAGE = 16;
const DESIRED_LIMIT = 649;

function useQueryParams<T>({ key, initialValue, transformer, resetOn }: Querys<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentElement = transformer(searchParams.get(key) ?? initialValue);

  const [state, setState] = useState(currentElement);

  useEffect(() => {
    setState(currentElement);
  }, [currentElement]);

  function handleStateChange(newValue: any) {
    setState(newValue);
    setSearchParams((query) => {
      if (query.has(key)) {
        query.set(key, newValue);
      } else {
        query.append(key, newValue);
      }
      if (resetOn === transformer(newValue)) {
        query.delete(key);
      }
      return query;
    });

    if (key === "page" && newValue === 1) {
      const urlWithoutSearchParam = `${location.pathname}`;
      window.history.replaceState({}, "", urlWithoutSearchParam);
    }
  }

  return [state, handleStateChange];
}

export function Pokemons() {
  const [pageNumber, setPageNumber] = useQueryParams({
    initialValue: 1,
    key: "page",
    transformer: Number,
    resetOn: "",
  });

  const [totalCount, setTotalCount] = useState(0);

  async function getAllPokemons(): Promise<PokemonInfo[]> {
    const offset = (pageNumber - 1) * LIMIT_PER_PAGE;
    const limit = Math.min(DESIRED_LIMIT - offset, LIMIT_PER_PAGE);
    const url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;
    const pokemons = await fetchAndParse(url);
    const allPokemons = await Promise.all(pokemons.results.map(PokemonCall));
    setTotalCount(DESIRED_LIMIT);
    console.log({ allPokemons });
    return allPokemons;
  }

  const {
    data: pokemonDetails,
    loading,
    error,
  } = useFetchData(
    {
      fetcher: () => getAllPokemons(),
      initialData: undefined, // Use undefined as initialData
    },
    [pageNumber]
  );

  if (loading || !pokemonDetails) {
    return <CircularProgress />;
  }

  if (error) {
    console.log(error);
  }

  const totalPages = Math.ceil(totalCount / LIMIT_PER_PAGE);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <ShowPokemon pokemonDisplay={pokemonDetails} />
      <Pagination
        color="primary"
        sx={{ ml: 8, my: 1 }}
        count={totalPages}
        page={pageNumber}
        onChange={handleChange}
      ></Pagination>
    </Box>
  );
}
