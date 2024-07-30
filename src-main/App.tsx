import { ChangeEvent, useState, useReducer } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./components/AddItemForm";
import { Header } from "./components/Header";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { removeTaskAC, tasksReducer } from "./module/task-reducer";

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

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ]);

  // const [tasks, setTasks] = useState<TasksStateType>({
  //   [todolistId1]: [
  //     { id: v1(), title: "HTML&CSS", isDone: true },
  //     { id: v1(), title: "JS", isDone: true },
  //     { id: v1(), title: "ReactJS", isDone: false },
  //   ],
  //   [todolistId2]: [
  //     { id: v1(), title: "Redux", isDone: false },
  //     { id: v1(), title: "Typescript", isDone: false },
  //     { id: v1(), title: "RTK query", isDone: false },
  //   ],
  // });

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
    setTodolists([{ id: newId, title, filter: "all" }, ...todolists]);
    setTasks({ ...tasks, [newId]: [] });
  };

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists([...todolists.map((t) => (t.id === todolistId ? { ...t, title } : t))]);
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter((tl) => tl.id !== todolistId)]);

    delete tasks[todolistId];

    setTasks({ ...tasks });
  };

  const addTask = (taskTitle: string, todolistId: string) => {
    const newTask = { id: v1(), title: taskTitle, isDone: false };

    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
  };

  const removeTask = (taskId: string, todolistId: string) => {
    removeTaskAC(taskId, todolistId);
    setTasks();
  };

  const changeTaskStatus = (taskStatus: boolean, taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: taskStatus } : t
      ),
    });
  };

  const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
    const changeTask = tasks[todolistId].map((t) =>
      t.id === taskId ? { ...t, title: newTitle } : t
    );
    console.log(taskId);
    setTasks({ ...tasks, [todolistId]: [...changeTask] });
  };

  const changeFilter = (filter: FilterValueType, todolistId: string) => {
    setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)));
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

export default App;
