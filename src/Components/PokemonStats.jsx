import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Pokemon from "./Pokemon";

const PokemonStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: white;
  padding: 0;
  margin: 0;
`;

const PokemonName = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-transform: capitalize;
  color: #333;
  margin-bottom: 1rem;
`;

const PokemonType = styled.h2`
  font-size: 1.5rem;
  text-transform: capitalize;
  color: #666;
  margin-bottom: 2rem;
`;

const StatTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
`;

const StatTableHeader = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #eee;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
`;

const StatTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const StatTableCell = styled.td`
  padding: 1rem;
  font-size: 1.2rem;
  color: #333;
`;

const PokemonStats = ({ accessToken, setAccessToken, refreshToken }) => {
  const [pokemon, setPokemon] = useState(null);
  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/requestNewAccessToken",
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

  const { id } = useParams();
  useEffect(() => {
    try {
      axiosJWT
        .get(`http://localhost:3000/api/v1/pokemon?id=${id}`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setPokemon(res[0]);
        });
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  if (pokemon) {
    return (
      <PokemonStatsWrapper>
        <PokemonName>{pokemon.name.english}</PokemonName>
        <Pokemon pokemon={pokemon} />
        <PokemonType>Type: {pokemon.type.join(", ")}</PokemonType>
        <StatTable>
          <thead>
            <tr>
              <StatTableHeader>Stat</StatTableHeader>
              <StatTableHeader>Value</StatTableHeader>
            </tr>
          </thead>
          <tbody>
            {Object.entries(pokemon.base).map(([stat, value]) => (
              <StatTableRow key={stat}>
                <StatTableCell>{stat}</StatTableCell>
                <StatTableCell>{value}</StatTableCell>
              </StatTableRow>
            ))}
          </tbody>
        </StatTable>
      </PokemonStatsWrapper>
    );
  } else {
    return "No Pokemon";
  }
};

export default PokemonStats;
