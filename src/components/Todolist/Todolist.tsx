import { FC } from "react";
import { TasksType } from "../../App";
import { Button } from "../Button";

type TodolistPropsType = {
  title?: string;
  tasks: TasksType[];
  date?: string;
};

export function Todolist({ title, tasks, date }: TodolistPropsType) {
  //   debugger;
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+" />
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Тасок нет</p>
      )}
      <div>
        <Button title="All" />
        <Button title="Active" />
        <Button title="Active" />
      </div>
      <div>{date}</div>
    </div>
  );
}
