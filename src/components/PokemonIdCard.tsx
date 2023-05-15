import { Box, Card, CardMedia, Container, Grid, Typography } from "@mui/material";
import { PokemonInfo } from "../services/pokemonCall";
import "../App.css";
import { useEffect, useState } from "react";
import { fetchAndParse } from "../services/fetchAndParse";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import ShieldIcon from "@mui/icons-material/Shield";
import "bootstrap/dist/css/bootstrap.css";

function RenderEvolution({ evolution }: { evolution: any }) {
  const [pokemon, setPokemon] = useState<any>(null);
  useEffect(() => {
    if (evolution.species.url) {
      fetchAndParse(evolution.species.url.replace("pokemon-species", "pokemon")).then((pokemon) => {
        setPokemon(pokemon);
      });
    }
  }, [evolution]);
  console.log(evolution, pokemon);
  if (!pokemon) {
    return <></>;
  }
  return (
    <Link to={routes.pokemonById({ id: pokemon.id })}>
      {pokemon && (
        <Box className="inline-block">
          <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center" }}>
            <img width={75} height={75} src={pokemon.sprites.other.dream_world.front_default} />
            <Typography variant="h6">{evolution.species.name}</Typography>
          </Box>
        </Box>
      )}
    </Link>
  );
}

export function PokemonIdCard({ data, evolutions }: { data: PokemonInfo; evolutions: any[] }) {
  const style = `thumb-pokemon ${data.types[0].type.name}`;
  return (
    <Box>
      <Typography textAlign={"center"} variant="h4">
        Name: {data.name.charAt(0).toUpperCase() + data.name.slice(1)} #{data.id}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Box
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}
            className={style}
          >
            <img
              style={{ height: 250, width: 250, padding: "1rem" }}
              src={data.sprites.other.dream_world.front_default}
              alt=""
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mx: 2 }}>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Type:</Typography>
              <Typography variant="h5">
                {data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1)} {""}
                {data.types[1]?.type.name
                  ? data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1)
                  : ""}
              </Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Height:</Typography>
              <Typography variant="h5">{(data.height / 10).toFixed(1)}m</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5" component={"span"}>
                Weight:
              </Typography>
              <Typography variant="h5">{(data.weight / 10).toFixed(1)}kg</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Habitat:</Typography>
              <Typography variant="h5">
                {data.habitat.name.charAt(0).toUpperCase() + data.habitat.name.slice(1)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mx: 2 }}>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Happines:</Typography>
              <Typography variant="h5">{data.base_happiness}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Grow Rate:</Typography>
              <Typography variant="h5">{data.growth_rate.name}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Experience:</Typography>
              <Typography variant="h5">{data.base_experience}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Capture rate:</Typography>
              <Typography variant="h5">{data.capture_rate}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mx: 2 }}>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">HP:</Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[0].base_stat * 3}>
                  <Typography variant="h6">{data.stats[0].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">Attack:</Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[1].base_stat * 3}>
                  <Typography variant="h6">{data.stats[1].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">Defence:</Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[2].base_stat * 3}>
                  <Typography variant="h6">{data.stats[2].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">Sp.Atk:</Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[3].base_stat * 3}>
                  <Typography variant="h6">{data.stats[3].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">Sp.Def:</Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[4].base_stat * 3}>
                  <Typography variant="h6">{data.stats[4].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">Speed:</Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[5].base_stat * 3}>
                  <Typography variant="h6">{data.stats[5].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

//  <Box>
//
//       <Box>
//          <Typography variant="h4">Moves</Typography>
//          <Typography variant="h5">{data.moves[0].move.name}</Typography>
//          <Typography variant="h5">{data.moves[11].move.name}</Typography>
//           <Typography variant="h5">{data.moves[22].move.name}</Typography>
//       </Box>
//       <Box>
//          <Typography variant="h4">Abilities</Typography>
//          <Typography variant="h5">{data.abilities[0].ability.name}</Typography>
//          <Typography variant="h5">{data.abilities[1].ability.name}</Typography>
//       </Box>
//       <Box>
//         <Typography variant="h5">Hp: {data.stats[0].base_stat}</Typography>
//         <Typography variant="h5">Attack: {data.stats[1].base_stat}</Typography>
//         <Typography variant="h5">Defence: {data.stats[2].base_stat}</Typography>
//         <Typography variant="h5">Special-Attack: {data.stats[3].base_stat}</Typography>
//         <Typography variant="h5">Special-Defence: {data.stats[4].base_stat}</Typography>
//         <Typography variant="h5">Speed: {data.stats[5].base_stat}</Typography>
//       </Box>
//       <Box>
//         {evolutions && (
//           <Box>
//             <Typography>Evolutions</Typography>
//             {evolutions.map((evolution, i) => (
//               <RenderEvolution key={i} evolution={evolution} />
//             ))}
//           </Box>
//         )}
//       </Box>
//     </Box>
