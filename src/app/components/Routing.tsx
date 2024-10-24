import { Container } from "@mui/material";
import { Login } from "features/auth/ui/login/Login";
import { TodolistsList } from "features/todolistsList/ui/TodolistsList";
import React from "react";
import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Container fixed>
      <Routes>
        <Route path={"/"} element={<TodolistsList />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </Container>
  );
};
