import { route, routes } from "../routes/index";
import { Route, Routes } from "react-router-dom";
import { Applayout } from "../layout/Applayout";
import { ThemePalette } from "../theme/ThemePalette";
import { ViewPokemon } from "../pages/ViewPokemon";
import { Mainpage } from "../pages/Mainpage";
import { Pokemons } from "../pages/Pokemons";

export function RoutesPages() {
  return (
    <ThemePalette>
      <Routes>
        <Route element={<Applayout />}>
          <Route path={route(routes.root)} element={<Mainpage />} />
          <Route path={route(routes.pokemons)} element={<Pokemons />} />
          <Route path={route(routes.pokemonById, ["id", "name"])} element={<ViewPokemon />} />
        </Route>
      </Routes>
    </ThemePalette>
  );
}
