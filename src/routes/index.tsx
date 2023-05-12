import { Routes, Route } from "react-router-dom";
import { Pokemons } from "../pages/Pokemons";
import { Applayout } from "../layout/Applayout";
import { ThemePalette } from "../theme/ThemePalette";

export function RoutesPages() {
  return (
    <ThemePalette>
      <Routes>
        <Route element={<Applayout />}>
          <Route path="/pokemons" element={<Pokemons />} />
        </Route>
      </Routes>
    </ThemePalette>
  );
}
