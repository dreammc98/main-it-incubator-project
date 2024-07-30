import { FilterValueType, TasksType } from "../../App";
import { AddItemForm } from "../AddItemForm";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { EditableSpan } from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";

type TodolistPropsType = {
  title?: string;
  tasks: TasksType[];
  date?: string;
  filter?: string;
  addTask: (taskTitle: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  changeTaskStatus: (isDone: boolean, id: string, todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  todolistId: string;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void;
};

export function Todolist(props: TodolistPropsType) {
  const {
    title,
    tasks,
    date,
    filter,
    addTask,
    removeTask,
    changeFilter,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    changeTaskTitle,
    changeTodolistTitle,
  } = props;

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(newStatusValue, id, todolistId);
  };

  const getActiveFilter = (prop: string) => {
    return filter === prop ? "active-filter" : "";
  };

  const addTaskHandler = (title: string) => {
    addTask(title, todolistId);
  };

  const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
    changeTaskTitle(todolistId, taskId, newTitle);
  };

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolistId, title);
  };

  type ButtonType = "contained" | "text" | "outlined";

  let [variants, setVariants] = useState<ButtonType>("contained");

  return (
    <Paper
      elevation={3}
      sx={{ p: "10px", display: "flex", flexDirection: "column", alignSelf: "flex-start" }}
    >
      <div className="todolist-header">
        {/* <h3>{title}</h3> */}
        <EditableSpan oldTitle={title} changeTitleHandler={changeTodolistTitleHandler} />
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>

      <div style={{ textAlign: "center" }}>
        <AddItemForm addItem={addTaskHandler} />
      </div>
      {tasks.length > 0 ? (
        <List>
          {tasks.map((task) => {
            return (
              <ListItem key={task.id} className={task.isDone ? "is-done" : ""} sx={{ p: 0 }}>
                <Checkbox
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatusHandler(e, task.id)}
                />

                <EditableSpan
                  oldTitle={task.title}
                  changeTitleHandler={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}
                />
                <IconButton aria-label="delete" onClick={() => removeTask(task.id, todolistId)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <p>Тасок нет</p>
      )}
      <div style={{ display: "flex", gap: "5px" }}>
        <Button
          variant={filter === "all" ? "outlined" : "contained"}
          color="primary"
          className={getActiveFilter("all")}
          onClick={() => changeFilter("all", todolistId)}
        >
          All
        </Button>

        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="success"
          className={getActiveFilter("active")}
          onClick={() => changeFilter("active", todolistId)}
        >
          Active
        </Button>
        <Button
          className={getActiveFilter("completed")}
          onClick={() => changeFilter("completed", todolistId)}
          variant={filter === "completed" ? "outlined" : "contained"}
          color="warning"
        >
          Completed
        </Button>
      </div>
      <div>{date}</div>
    </Paper>
  );
}
