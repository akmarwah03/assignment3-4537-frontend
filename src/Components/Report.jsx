import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
`;

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  const [uniqueAPI, setUniqueAPI] = useState([]);
  const [topAPI, setTopAPI] = useState([]);
  const [topEndpoints, setTopEndpoints] = useState([]);
  const [errors, setErrors] = useState([]);
  const [recentErrors, setRecentErrors] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let response = await axiosJWT.get(
        "http://localhost:3000/api/uniqueAPIUsers",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      let data = await response.data;
      setUniqueAPI(data);
      response = await axiosJWT.get("http://localhost:3000/api/topAPIUsers", {
        headers: {
          Authorization: accessToken,
        },
      });
      data = await response.data;
      setTopAPI(data);
      response = await axiosJWT.get(
        "http://localhost:3000/api/topEndpointUsers",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      data = await response.data;
      setTopEndpoints(data);
      response = await axiosJWT.get(
        "http://localhost:3000/api/errorByEndPoint",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      data = await response.data;
      setErrors(data);
      response = await axiosJWT.get("http://localhost:3000/api/recentErrors", {
        headers: {
          Authorization: accessToken,
        },
      });
      data = await response.data;
      setRecentErrors(data);
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
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Unique API Users</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(uniqueAPI).map(([date, userCount]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{userCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Top API Users Over the Last Week</h2>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Top API Users</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(topAPI).map(([date, users]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>
                {users.map((user, index) => (
                  <div key={index}>{user}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Top API Users Over each Endpoint</h2>
      <Table>
        <thead>
          <tr>
            <th>API Endpoint</th>
            <th>HTTP Method</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(topEndpoints).map(([endpoint, methods]) =>
            Object.entries(methods).map(([method, users]) => (
              <tr key={`${endpoint}-${method}`}>
                <td>{endpoint}</td>
                <td>{method}</td>
                <td>{users.join(", ")}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <h2>4xx Errors By Endpoint</h2>
      <Table>
        <thead>
          <tr>
            <th>API Endpoint</th>
            <th>Error Message</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(errors).map(([endpoint, errors]) => (
            <tr key={endpoint}>
              <td>{endpoint}</td>
              <td>{errors.join("\n ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Recent 4xx/5xx Errors</h2>
      <Table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Type</th>
            <th>Code</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {recentErrors.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.endpoint}</td>
              <td>{entry.type}</td>
              <td>{entry.code}</td>
              <td>{entry.message}</td>
              <td>{entry.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Report;
