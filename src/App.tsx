import { ChangeEvent, useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: TasksType[];
};

export type FilterValueType = "all" | "active" | "completed";

function App() {
  type TodolistType = {
    id: string;
    title: string;
    filter: FilterValueType;
  };

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ]);

  const removeTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter((tl) => tl.id !== todolistId)]);

    delete tasks[todolistId];

    setTasks({ ...tasks });
  };

  const [tasks, setTasks] = useState<TasksStateType>({
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

  const addTask = (taskTitle: string, todolistId: string) => {
    const newTast = { id: v1(), title: taskTitle, isDone: false };

    setTasks({ ...tasks, [todolistId]: [newTast, ...tasks[todolistId]] });
  };

  const removeTask = (taskId: string, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId) });
  };

  const changeTaskStatus = (taskStatus: boolean, taskId: string, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) =>
        t.id === taskId ? { ...t, isDone: taskStatus } : t
      ),
    });
  };

  const changeFilter = (filter: FilterValueType, todolistId: string) => {
    setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter } : tl)));
  };

  return (
    <div className="App">
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
          />
        );
      })}
    </div>
  );
}

export default App;
