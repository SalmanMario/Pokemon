import { Box, Button, Grid, Typography } from "@mui/material";
import { PokemonInfo } from "../services/pokemon";
import "../App.css";
import { useEffect, useState } from "react";
import { fetchAndParse } from "../services/fetchAndParse";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import ShieldIcon from "@mui/icons-material/Shield";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RiSwordLine } from "react-icons/ri";
import { GiEyeShield, GiWingedSword, GiLeatherBoot } from "react-icons/gi";
import "bootstrap/dist/css/bootstrap.css";

function RenderEvolution({ evolution, style }: { evolution: any; style: string }) {
  const [pokemon, setPokemon] = useState<any>(null);
  useEffect(() => {
    if (evolution.species.url) {
      fetchAndParse(evolution.species.url.replace("pokemon-species", "pokemon")).then((pokemon) => {
        setPokemon(pokemon);
      });
    }
  }, [evolution]);
  if (!pokemon) {
    return <></>;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link style={{ textDecoration: "none", color: "#f44336" }} to={routes.pokemonById({ id: pokemon.id })}>
      <Box textAlign={"center"}>
        <Typography variant="h6">
          {evolution.species.name} #{pokemon.id}
        </Typography>
      </Box>
      {pokemon && (
        <Button onClick={scrollToTop}>
          <Box
            className={style}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: "50%",
            }}
          >
            <img
              width={150}
              height={150}
              style={{ padding: "1.5rem" }}
              src={pokemon.sprites.other.dream_world.front_default}
            />
          </Box>
        </Button>
      )}
    </Link>
  );
}

export function PokemonIdCard({ data, evolutions }: { data: PokemonInfo; evolutions: any[] }) {
  const style = `thumb-pokemon ${data.types[0].type.name}`;
  return (
    <Box>
      <Typography sx={{ my: 2 }} textAlign={"center"} variant="h4">
        Name: {data.name.charAt(0).toUpperCase() + data.name.slice(1)} #{data.id}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Box className={`${style} imageContainer`}>
            <img
              style={{ height: 250, width: 250, padding: "1rem" }}
              src={data.sprites.other.dream_world.front_default}
              alt=""
            />
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography textAlign={"center"} variant="h4">
            Info
          </Typography>
          <Box sx={{ mx: 2 }}>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Type:</Typography>
              <Typography variant="h6">
                {data.types[0]?.type.name.charAt(0).toUpperCase() + data.types[0]?.type.name.slice(1)} {""}
                {data.types[1]?.type.name
                  ? data.types[1].type.name.charAt(0).toUpperCase() + data.types[1]?.type.name.slice(1)
                  : ""}
              </Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Height:</Typography>
              <Typography variant="h6">{(data.height / 10).toFixed(1)}m</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5" component={"span"}>
                Weight:
              </Typography>
              <Typography variant="h6">{(data.weight / 10).toFixed(1)}kg</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Habitat:</Typography>
              <Typography variant="h6">
                {data.habitat?.name.charAt(0).toUpperCase() + data.habitat?.name.slice(1) || `not found`}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mx: 2 }}>
            <Typography textAlign={"center"} variant="h4">
              Stats
            </Typography>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Happines:</Typography>
              <Typography variant="h6">{data.base_happiness}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Grow Rate:</Typography>
              <Typography variant="h6">{data.growth_rate.name}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Experience:</Typography>
              <Typography variant="h6">{data.base_experience}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Capture rate:</Typography>
              <Typography variant="h6">{data.capture_rate}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Hatch Counter:</Typography>
              <Typography variant="h6">{data.hatch_counter}</Typography>
            </Box>
            <Box className="viewPokemonGrid">
              <Typography variant="h5">Shape:</Typography>
              <Typography variant="h6">{data.shape.name}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ mx: 2 }}>
            <Typography textAlign={"center"} variant="h4">
              Attack Stats
            </Typography>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">
                <FavoriteIcon />
                HP:
              </Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[0].base_stat * 2}>
                  <Typography variant="h6">{data.stats[0].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">
                <RiSwordLine />
                Attack:
              </Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[1].base_stat * 2}>
                  <Typography variant="h6">{data.stats[1].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">
                <ShieldIcon />
                Defence:
              </Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[2].base_stat * 2}>
                  <Typography variant="h6">{data.stats[2].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">
                <GiWingedSword />
                Sp.Atk:
              </Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[3].base_stat * 2}>
                  <Typography variant="h6">{data.stats[3].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">
                <GiEyeShield />
                Sp.Def:
              </Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[4].base_stat * 2}>
                  <Typography variant="h6">{data.stats[4].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
            <Box className="viewPokemonGrid mobileStats">
              <Typography variant="h5">
                <GiLeatherBoot />
                Speed:
              </Typography>
              <Box className="progressBar">
                <Box className={`${style} fillingBar`} width={data.stats[5].base_stat * 2}>
                  <Typography variant="h6">{data.stats[5].base_stat}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography textAlign={"center"} variant="h4">
            Abilities
          </Typography>
          <Box className="viewPokemonGrid">
            <Typography variant="h5">Ability:</Typography>
            <Typography variant="h6">{data.abilities[0].ability.name}</Typography>
          </Box>
          <Box className="viewPokemonGrid">
            <Typography variant="h5">Ability:</Typography>
            <Typography variant="h6">{data.abilities[1]?.ability.name || `not found`}</Typography>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography textAlign={"center"} variant="h4">
            Moves
          </Typography>
          <Box className="viewPokemonGrid">
            <Typography variant="h5">Move:</Typography>
            <Typography variant="h6">{data.moves[0].move.name}</Typography>
          </Box>
          <Box className="viewPokemonGrid">
            <Typography variant="h5">Move:</Typography>
            <Typography variant="h6">{data.moves[1]?.move.name}</Typography>
          </Box>
          <Box className="viewPokemonGrid">
            <Typography variant="h5">Move:</Typography>
            <Typography variant="h6">{data.moves[2]?.move.name}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Typography sx={{ my: 3 }} textAlign={"center"} variant="h4">
          Evolution Chain
        </Typography>
        {evolutions && (
          <Box
            className="mobileEvolution"
            sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
          >
            {evolutions.map((evolution, i) => (
              <RenderEvolution key={i} evolution={evolution} style={style} />
            ))}
          </Box>
        )}
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
