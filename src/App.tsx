import { useState } from "react";
import "./App.css";
import { Todolist } from "./components/Todolist/Todolist";

export type TasksType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterValueType = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<TasksType[]>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ]);

  const removeTask = (id: number) => {
    const updatedTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const [filter, setFilter] = useState<FilterValueType>("all");

  let tasksForTodolist = tasks;

  if (filter === "active") {
    tasksForTodolist = tasks.filter((task) => !task.isDone);
  }

  if (filter === "completed") {
    tasksForTodolist = tasks.filter((task) => task.isDone);
  }

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        date="17.06.2024"
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
