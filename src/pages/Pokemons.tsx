import { Box, CircularProgress, Grid, InputAdornment, Pagination, TextField, Typography } from "@mui/material";
import { ShowPokemon } from "../components/ShowPokemon";
import { usePagedPokemon } from "../hooks/usePagedPokemon";
import "../App.css";

export function Pokemons() {
  // fetch la toti pokemonii
  // await Promise.all(pokemons.results.map(pokemonCall)); per pagina SAU retreive din cache

  const { pokemonDetails, totalPages, handlePageChange, pageNumber, handleSearchChange, searchText } =
    usePagedPokemon();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(value);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <Grid mt={4} className="gridPokemonMobile" container>
        <Grid sx={{ display: "flex", alignItems: "center" }} item md={6}>
          <Typography variant="h3">PokeDex</Typography>
        </Grid>
        <Grid sx={{ justifyContent: "end", display: "flex", alignItems: "center" }} item md={6}>
          <TextField
            label="search"
            placeholder="find pokemon"
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">{/* <SearchIcon /> */}</InputAdornment>,
            }}
          ></TextField>
        </Grid>
      </Grid>

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
