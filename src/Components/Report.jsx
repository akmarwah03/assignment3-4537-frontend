import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Bar } from "react-chartjs-2";

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  useEffect(() => {
    async function fetchData() {
      // Fetch data from API
      const usersByTime = {};
      const response = await axiosJWT.get("http://localhost:3000/api/report", {
        headers: {
          Authorization: accessToken,
        },
      });
      const data = await response.data;
      data.forEach((entry) => {
        const time = entry.createdAt.slice(0, 10); // Extract date portion of createdAt timestamp
        if (!usersByTime[time]) {
          usersByTime[time] = new Set();
        }
        usersByTime[time].add(entry.user);
      });
      console.log(Object.values(usersByTime).map((users) => users.size));
    }

    fetchData();
  }, []);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/requestNewAccessToken",
        {},
        {
          headers: {
            "auth-token-refresh": refreshToken,
          },
        }
      );
      // setAccessToken(res.headers['auth-token-access']);
      return res.headers["auth-token-access"];
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
        config.headers["auth-token-access"] = newAccessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <h2>Unique API Users Over the Last Week</h2>
    </div>
  );
}

export default Report;
