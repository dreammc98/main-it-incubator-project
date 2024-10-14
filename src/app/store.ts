import { tasksReducer } from "features/TodolistsList/tasksSlice";
import { combineReducers } from "redux";
import { appReducer } from "app/app.reducer";
import { authReducer } from "features/auth/model/auth.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "features/TodolistsList/todolistsSlice";

export const store = configureStore({
  reducer: { tasks: tasksReducer, todolists: todolistsReducer, app: appReducer, auth: authReducer },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
