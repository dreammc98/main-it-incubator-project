import { FilterValueType, TasksStateType, TasksType, TodolistType } from "../../App";
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
import { useSelector, useDispatch } from "react-redux";
import { AppRootStateType } from "../../store/store";
import {
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "../../module/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "../../module/tasks-reducer";

type TodolistPropsType = {
  todolist: TodolistType;
};

export function TodolistWithRedux({ todolist }: TodolistPropsType) {
  const { id, filter, title } = todolist;

  let tasks = useSelector<AppRootStateType, TasksType[]>((state) => state.tasks[id]);

  const dispatch = useDispatch();

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const removeTask = (taskId: string) => {
    dispatch(removeTaskAC(taskId, id));
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
    const taskStatus = e.currentTarget.checked;
    dispatch(changeTaskStatusAC(taskStatus, taskId, id));
  };

  const getActiveFilter = (prop: string) => {
    return filter === prop ? "active-filter" : "";
  };

  const addTaskHandler = (title: string) => {
    dispatch(addTaskAC(id, title));
  };

  const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(id, taskId, newTitle));
  };

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(id, title));
  };

  const changeFilter = (filter: FilterValueType) => {
    dispatch(changeFilterAC(filter, id));
  };

  if (filter === "active") {
    tasks = tasks.filter((task) => !task.isDone);
  }

  if (filter === "completed") {
    tasks = tasks.filter((task) => task.isDone);
  }

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
                <IconButton aria-label="delete" onClick={() => removeTask(task.id)}>
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
          onClick={() => changeFilter("all")}
        >
          All
        </Button>

        <Button
          variant={filter === "active" ? "outlined" : "contained"}
          color="success"
          className={getActiveFilter("active")}
          onClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
          className={getActiveFilter("completed")}
          onClick={() => changeFilter("completed")}
          variant={filter === "completed" ? "outlined" : "contained"}
          color="warning"
        >
          Completed
        </Button>
      </div>
      {/* <div>{date}</div> */}
    </Paper>
  );
}
