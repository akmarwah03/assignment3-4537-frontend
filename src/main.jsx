import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Components/Login";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Login />
    </Router>
  </React.StrictMode>
);
