import React, { useState } from "react";
import Dashboard from "./Dashboard";
import App from "../App";
import { Routes, Route } from "react-router-dom";
import PokemonStats from "./PokemonStats";
import LoginPage from "./LoginPage";

function Login() {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
            setRefreshToken={setRefreshToken}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            user={user}
            setUser={setUser}
          />
        }
      />
      <Route
        path="/app"
        element={
          <App
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
          />
        }
      />
      <Route
        path="/pokemon/:id"
        element={
          <PokemonStats
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
          />
        }
      />
    </Routes>
  );
}

export default Login;
