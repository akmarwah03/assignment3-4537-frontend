import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const FormTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  padding: 0 20px;
  font-size: 16px;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0069d9;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
`;

const SwitchText = styled.p`
  margin-right: 5px;
`;

const SwitchButton = styled.button`
  background-color: transparent;
  border: none;
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = ({
  accessToken,
  refreshToken,
  setAccessToken,
  setRefreshToken,
  isLogin,
  setIsLogin,
  setUser,
}) => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formFields = e.target.elements;
    const { username, password, email } = formFields;
    if (isLogin) {
      await login(username.value, password.value);
    } else {
      await register(username.value, password.value, email.value);
    }
  };

  const login = async (username, password) => {
    try {
      const res = await axios.post(
        "https://wandering-toad-moccasins.cyclic.app/auth/login",
        {
          username,
          password,
        }
      );
      setUser(res.data);
      const authHeader = res.headers["authorization"];
      console.log(JSON.stringify(res.headers));
      setAccessToken(authHeader.split(",")[0]);
      setRefreshToken(authHeader.split(",")[1]);
      if (res.data.role === "admin") {
        navigate("dashboard");
      } else {
        navigate("app");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (username, password, email) => {
    try {
      const res = await axios.post(
        "https://wandering-toad-moccasins.cyclic.app/auth/register",
        {
          username,
          password,
          email,
        }
      );
      if (res.status == 200) {
        await login(username, password);
      }
    } catch (e) {
      alert("Registration failed: " + e.message);
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>{isLogin ? "Login" : "Signup"}</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Username" id="username" required />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            required
          />
          {!isLogin && (
            <Input type="email" placeholder="Email" id="email" required />
          )}
          <Button type="submit">{isLogin ? "Login" : "Signup"}</Button>
        </Form>
        <SwitchContainer>
          <SwitchText>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
          </SwitchText>
          <SwitchButton onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Signup" : "Login"}
          </SwitchButton>
        </SwitchContainer>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
