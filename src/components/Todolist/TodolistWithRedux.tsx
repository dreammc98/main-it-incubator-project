import { FilterValueType, TasksType, TodolistType } from "../../App";
import { AddItemForm } from "../AddItemForm";
import { ChangeEvent, useMemo, useState, useCallback, memo } from "react";
import { EditableSpan } from "../EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
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
import { Task } from "../Task";

type TodolistPropsType = {
  todolist: TodolistType;
};

export const TodolistWithRedux = memo(({ todolist }: TodolistPropsType) => {
  const { id, filter, title } = todolist;

  let tasks = useSelector<AppRootStateType, TasksType[]>((state) => state.tasks[id]);

  const dispatch = useDispatch();

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const removeTask = useCallback(
    (taskId: string) => {
      dispatch(removeTaskAC(taskId, id));
    },
    [dispatch]
  );

  const changeTaskStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
      const taskStatus = e.currentTarget.checked;
      dispatch(changeTaskStatusAC(taskStatus, taskId, id));
    },
    [dispatch]
  );

  const getActiveFilter = (prop: string) => {
    return filter === prop ? "active-filter" : "";
  };

  const addTaskHandler = useCallback(
    (title: string) => {
      dispatch(addTaskAC(id, title));
    },
    [addTaskAC, id]
  );

  const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(id, taskId, newTitle));
  }, []);

  const changeTodolistTitleHandler = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC(id, title));
  }, []);

  const changeFilter = useCallback(
    (filter: FilterValueType) => {
      dispatch(changeFilterAC(filter, id));
    },
    [filter, id]
  );

  tasks = useMemo(() => {
    if (filter === "active") {
      tasks = tasks.filter((task) => !task.isDone);
    }

    if (filter === "completed") {
      tasks = tasks.filter((task) => task.isDone);
    }
    return tasks;
  }, [tasks, filter]);

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
              <Task
                key={task.id}
                task={task}
                changeTaskStatusHandler={changeTaskStatusHandler}
                changeTaskTitleHandler={changeTaskTitleHandler}
                removeTask={removeTask}
              />
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
});
