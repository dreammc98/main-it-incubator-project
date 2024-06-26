import { ChangeEvent, useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";
import { v1 } from "uuid";

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValueType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TasksType[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Typescript", isDone: false },
    { id: v1(), title: "RTK query", isDone: false },
  ]);

  const addTask = (taskTitle: string) => {
    const newTast = { id: v1(), title: taskTitle, isDone: false };
    setTasks([newTast, ...tasks]);
  };

  const removeTask = (id: string) => {
    const updatedTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const [filter, setFilter] = useState<FilterValueType>("all");

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        date="17.06.2024"
        addTask={addTask}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
