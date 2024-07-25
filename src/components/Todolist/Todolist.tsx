import { FilterValueType, TasksType } from "../../App";
import { AddItemForm } from "../AddItemForm";
import { Button } from "../Button";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { EditableSpan } from "../EditableSpan";

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

  return (
    <div>
      <div className="todolist-title-container">
        {/* <h3>{title}</h3> */}
        <EditableSpan oldTitle={title} changeTitleHandler={changeTodolistTitleHandler} />
        <Button title={"x"} onClick={removeTodolistHandler} />
      </div>

      <div>
        <AddItemForm addItem={addTaskHandler} />
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatusHandler(e, task.id)}
                />
                <EditableSpan
                  oldTitle={task.title}
                  changeTitleHandler={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}
                />
                <Button onClick={() => removeTask(task.id, todolistId)} title="x" />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Тасок нет</p>
      )}
      <div>
        <Button
          className={getActiveFilter("all")}
          onClick={() => changeFilter("all", todolistId)}
          title="All"
        />
        <Button
          className={getActiveFilter("active")}
          onClick={() => changeFilter("active", todolistId)}
          title="Active"
        />
        <Button
          className={getActiveFilter("completed")}
          onClick={() => changeFilter("completed", todolistId)}
          title="Completed"
        />
      </div>
      <div>{date}</div>
    </div>
  );
}
