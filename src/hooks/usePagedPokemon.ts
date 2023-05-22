import { useMemo } from "react";
import { fetchAndParse } from "../services/fetchAndParse";
import { pokemonCall, PokemonInfo } from "../services/pokemon";
import { useFetchData } from "./useFetchData";
import { useQueryParams } from "./useQueryParams";
import { useSearchParams } from "react-router-dom";

const BASE_URL = "https://pokeapi.co/api/v2/";
const LIMIT_PER_PAGE = 16;
const DESIRED_LIMIT = 649;

async function getAllPokemons(): Promise<any> {
  const url = `${BASE_URL}pokemon?limit=${DESIRED_LIMIT}`;
  const pokemons = await fetchAndParse(url);
  return pokemons;
}

export function usePagedPokemon() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useQueryParams({
    initialValue: 1,
    key: "page",
    transformer: Number,
    resetOn: 1,
  });

  const [searchText, setSearchText] = useQueryParams({
    initialValue: "",
    key: "search",
    transformer: String,
    resetOn: "",
  });

  const { data: pokemons } = useFetchData({
    fetcher: getAllPokemons,
    initialData: [],
  });

  const { data: pokemonDetails, loading } = useFetchData<PokemonInfo[]>(
    {
      fetcher: async () => {
        const allPokemons = await Promise.all(
          pokemons.results
            .filter((p: any) => p.name.includes(searchText))
            .slice((pageNumber - 1) * LIMIT_PER_PAGE, pageNumber * LIMIT_PER_PAGE)
            .map(pokemonCall)
        );
        return allPokemons;
      },
      initialData: [],
    },
    [pageNumber, pokemons, searchText]
  );

  const totalPages = useMemo(() => {
    if (!pokemons.results) {
      return 0;
    }
    return Math.ceil(pokemons.results.filter((p: any) => p.name.includes(searchText)).length / LIMIT_PER_PAGE);
  }, [pokemons, searchText]);

  function handlePageChange(newPage: number) {
    setPageNumber(newPage.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSearchChange(searchText: string) {
    setSearchParams((query) => {
      query.delete("page");
      if (query.has("search")) {
        query.set("search", searchText);
      } else {
        query.append("search", searchText);
      }
      return query;
    });
  }

  return {
    handlePageChange,
    handleSearchChange,
    searchText,
    pokemonDetails,
    loading,
    setSearchText,
    searchParams,
    totalPages,
    pageNumber,
  };
}
