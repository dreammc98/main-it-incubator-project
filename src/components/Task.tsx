import { ChangeEvent, memo } from "react";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

import { EditableSpan } from "./EditableSpan";
import { TasksType } from "../AppWithRedux";

type TaskPropsType = {
  task: TasksType;
  changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>, taskId: string) => void;
  changeTaskTitleHandler: (taskId: string, newTitle: string) => void;
  removeTask: (taskId: string) => void;
};

export const Task = memo(
  ({ task, changeTaskStatusHandler, changeTaskTitleHandler, removeTask }: TaskPropsType) => {
    console.log("task");
    return (
      <ListItem key={task.id} className={task.isDone ? "is-done" : ""} sx={{ p: 0 }}>
        <Checkbox checked={task.isDone} onChange={(e) => changeTaskStatusHandler(e, task.id)} />

        <EditableSpan
          oldTitle={task.title}
          changeTitleHandler={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}
        />
        <IconButton aria-label="delete" onClick={() => removeTask(task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  }
);
