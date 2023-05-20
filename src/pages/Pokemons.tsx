import { Box, CircularProgress, Fab, InputAdornment, Pagination, TextField } from "@mui/material";
import { ShowPokemon } from "../components/ShowPokemon";
import { usePagedPokemon } from "../hooks/usePagedPokemon";

export function Pokemons() {
  // fetch la toti pokemonii
  // await Promise.all(pokemons.results.map(pokemonCall)); per pagina SAU retreive din cache

  const { pokemonDetails, loading, totalPages, handlePageChange, pageNumber, handleSearchChange, searchText } =
    usePagedPokemon();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(value);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <TextField
        label="search"
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        sx={{ mt: 4 }}
        InputProps={{
          startAdornment: <InputAdornment position="start">{/* <SearchIcon /> */}</InputAdornment>,
        }}
      ></TextField>
      {!pokemonDetails ? (
        <CircularProgress />
      ) : (
        <>
          <ShowPokemon pokemonDisplay={pokemonDetails} />
          <Pagination
            color="primary"
            sx={{ ml: 8, my: 1 }}
            count={totalPages}
            page={pageNumber}
            onChange={handleChange}
          ></Pagination>
        </>
      )}
    </Box>
  );
}
