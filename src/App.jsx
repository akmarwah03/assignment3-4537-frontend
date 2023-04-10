import React, { useEffect, useState } from "react";
import Page from "./Components/Page";
import Pagination from "./Components/Pagination";
import TypesFilter from "./Components/TypesFilters";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./App.css";

function App({ accessToken, setAccessToken, refreshToken }) {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemonsPerPage] = useState(12);

  const types = [
    "Grass",
    "Poison",
    "Fire",
    "Flying",
    "Water",
    "Bug",
    "Normal",
    "Electric",
    "Ground",
    "Fairy",
    "Fighting",
    "Psychic",
    "Rock",
    "Ghost",
    "Ice",
    "Dragon",
    "Dark",
    "Steel",
  ];

  useEffect(() => {
    try {
      axiosJWT
        .get(`https://wandering-toad-moccasins.cyclic.app/api/v1/pokemons`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          setPokemons(res);
        });
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "https://wandering-toad-moccasins.cyclic.app/auth/requestNewAccessToken",
        {},
        {
          headers: {
            Authorization: refreshToken,
          },
        }
      );
      // setAccessToken(res.headers['auth-token-access']);
      return res.headers["authorization"];
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const newAccessToken = await refreshAccessToken();
        config.headers["Authorization"] = newAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTypes]);

  const filteredPokemons = pokemons
    .filter((pokemon) =>
      pokemon.name.english.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((pokemon) =>
      selectedTypes.length === 0
        ? true
        : selectedTypes.includes(pokemon.type[0])
    );

  const indexOfLastRecord = currentPage * pokemonsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const numberOfPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  return (
    <div id="container">
      <div id="left">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search Pokemons"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <TypesFilter
          types={types}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
        />
      </div>
      <div id="right">
        <Page
          currentPokemons={currentPokemons}
          currentPage={currentPage}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          refreshToken={refreshToken}
        />
        <Pagination
          numPages={numberOfPages}
          curPage={currentPage}
          setCurPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
