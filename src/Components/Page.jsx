import React from "react";
import Pokemon from "./Pokemon";
import { Link } from "react-router-dom";
import PokemonStats from "./PokemonStats";
function page({
  currentPokemons,
  currentPage,
  accessToken,
  setAccessToken,
  refreshToken,
}) {
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Page number {currentPage}
      </h1>
      <div className="pokemon-list">
        {currentPokemons.map((item) => {
          return (
            <Link to={`/pokemon/${item.id}`} key={item.id}>
              <Pokemon pokemon={item} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default page;
