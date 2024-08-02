import { ChangeEvent, useState, useReducer, Reducer } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import { Header } from "./components/Header";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  ActionTypes,
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./module/todolists-reducer";
import {
  ActionsType,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteAllTasks,
  removeTaskAC,
  tasksReducer,
} from "./module/tasks-reducer";

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

function AppWithReducers() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, dispatchTodolists] = useReducer<Reducer<TodolistType[], ActionTypes>>(
    todolistsReducer,
    [
      { id: todolistId1, title: "what to learn", filter: "all" },
      { id: todolistId2, title: "what to buy", filter: "all" },
    ]
  );

  const [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, ActionsType>>(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Typescript", isDone: false },
      { id: v1(), title: "RTK query", isDone: false },
    ],
  });

  const addTodolist = (title: string) => {
    const newId = v1();
    dispatchTodolists(addTodolistAC(newId, title));
    dispatchTasks(addTodolistAC(newId, title));
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatchTodolists(changeTodolistTitleAC(todolistId, title));
  };

  const removeTodolist = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId));
    dispatchTasks(deleteAllTasks(todolistId));
  };

  const addTask = (taskTitle: string, todolistId: string) => {
    dispatchTasks(addTaskAC(todolistId, taskTitle));
  };
  const removeTask = (taskId: string, todolistId: string) => {
    dispatchTasks(removeTaskAC(taskId, todolistId));
  };

  const changeTaskStatus = (taskStatus: boolean, taskId: string, todolistId: string) => {
    dispatchTasks(changeTaskStatusAC(taskStatus, taskId, todolistId));
  };

  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTitle));
  };

  const changeFilter = (filter: FilterValueType, todolistId: string) => {
    dispatchTodolists(changeFilterAC(filter, todolistId));
  };

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
              const allTodolistTasks = tasks[todolist.id];
              let tasksForTodolist = allTodolistTasks;

              if (todolist.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
              }

              if (todolist.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
              }

              return (
                <Todolist
                  key={todolist.id}
                  title={todolist.title}
                  tasks={tasksForTodolist}
                  date="17.06.2024"
                  addTask={addTask}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  changeTaskStatus={changeTaskStatus}
                  filter={todolist.filter}
                  todolistId={todolist.id}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              );
            })}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default AppWithReducers;
