import { Routes, Route } from "react-router-dom";
import { App } from "../App";
import { Pokemons } from "../pages/Pokemons";

export function RoutesPages() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemons" element={<Pokemons />} />
    </Routes>
  );
}
