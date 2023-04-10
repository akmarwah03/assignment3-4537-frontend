import React from "react";

const Pokemon = ({ pokemon }) => {
  let id = pokemon.id;

  if (id < 10) {
    id = `00${id}`;
  } else if (id < 100) {
    id = `0${id}`;
  }

  return (
    <>
      <img
        src={`https://github.com/fanzeyi/pokemon.json/raw/master/images/${id}.png`}
      />
    </>
  );
};

export default Pokemon;
