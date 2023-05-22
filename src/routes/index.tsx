import { route, routes } from "../routes/index";
import { Navigate, Route, Routes } from "react-router-dom";
import { Applayout } from "../layout/Applayout";
import { ThemePalette } from "../theme/ThemePalette";
import { ViewPokemon } from "../pages/ViewPokemon";
import { Mainpage } from "../pages/Mainpage";
import { Pokemons } from "../pages/Pokemons";
import { Error404 } from "../pages/Error404";

export function RoutesPages() {
  return (
    <ThemePalette>
      <Routes>
        <Route element={<Applayout />}>
          <Route path={route(routes.root)} element={<Mainpage />} />
          <Route path={route(routes.pokemons)} element={<Pokemons />} />
          <Route path={route(routes.pokemonById, ["id"])} element={<ViewPokemon />} />
          <Route path={route(routes.error404)} element={<Error404 />} />
          <Route path="*" element={<Navigate to={route(routes.error404)} replace />} />
        </Route>
      </Routes>
    </ThemePalette>
  );
}
