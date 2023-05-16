import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PokemonInfo } from "../services/pokemonCall";
import { Box, Button, Grid } from "@mui/material";
import "../App.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShieldIcon from "@mui/icons-material/Shield";
import { RiSwordLine } from "react-icons/ri";
import { routes, useNavigation } from "../routes";

export function PokemonCard({ data }: { data: PokemonInfo }) {
  const style = `thumb-container ${data.types[0].type.name}`;
  const { navigate } = useNavigation();

  const goToPokemon = () => {
    navigate(routes.pokemonById, { id: data.id.toString(), name: "string" });
  };

  return (
    <Grid sx={{ my: 4 }} item lg={3} md={4} sm={6} xs={12}>
      <Card sx={{ maxWidth: "100%" }}>
        <CardMedia
          component="img"
          className={style}
          alt={data.name}
          height="340"
          sx={{ objectFit: "contain", p: 1 }}
          image={data.sprites.other.dream_world.front_default}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography
              sx={{
                height: "2rem",
                lineHeight: "2rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">
              <FavoriteIcon />
            </Typography>
            <Typography variant="h5">
              <RiSwordLine />
            </Typography>
            <Typography variant="h5">
              <ShieldIcon />
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography variant="h6">{data.stats[0].base_stat}</Typography>
            <Typography variant="h6">{data.stats[1].base_stat}</Typography>
            <Typography variant="h6">{data.stats[2].base_stat}</Typography>
          </Box>
          <Button onClick={goToPokemon} variant="contained" fullWidth>
            View Pokemon
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
