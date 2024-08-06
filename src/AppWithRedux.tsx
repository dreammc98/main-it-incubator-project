import "./App.css";
import { TodolistWithRedux } from "./components/Todolist/TodolistWithRedux";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import { Header } from "./components/Header";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { addTodolistAC } from "./module/todolists-reducer";

import { AppRootStateType } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TasksStateType = {
  [key: string]: TasksType[];
};

export type FilterValueType = "all" | "active" | "completed";

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists);
  const dispatch = useDispatch();

  const addTodolist = useCallback((title: string) => {
    const newId = v1();
    dispatch(addTodolistAC(newId, title));
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#efc600",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <div className="wrapper">
          <div>
            <AddItemForm addItem={addTodolist} />
          </div>
          <div className="todolist">
            {todolists.map((todolist) => {
              return <TodolistWithRedux key={todolist.id} todolist={todolist} />;
            })}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default AppWithRedux;
