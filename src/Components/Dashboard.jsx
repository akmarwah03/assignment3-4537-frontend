import React from "react";
import Report from "./Report";

import { Routes, Route, Link } from "react-router-dom";

function Dashboard({ accessToken, setAccessToken, refreshToken }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <Report
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        refreshToken={refreshToken}
      />
    </div>
  );
}

export default Dashboard;
