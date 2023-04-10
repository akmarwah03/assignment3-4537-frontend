import React from "react";
import Report from "./Report";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

function Dashboard({ accessToken, setAccessToken, refreshToken }) {
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/");
  };
  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <h1>Dashboard</h1>
      <Report
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        refreshToken={refreshToken}
      />
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
}

export default Dashboard;
