import { FilterValueType, TasksType } from "../../App";
import { Button } from "../Button";
import { MouseEventHandler } from "react";

type TodolistPropsType = {
  title?: string;
  tasks: TasksType[];
  date?: string;
  removeTask: (id: number) => void;
  changeFilter: (filter: FilterValueType) => void;
};

export function Todolist({ title, tasks, date, removeTask, changeFilter }: TodolistPropsType) {
  // debugger;
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
                <input type="checkbox" defaultChecked={task.isDone} />
                <span>{task.title}</span>
                <Button onClick={() => removeTask(task.id)} title="x" />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Тасок нет</p>
      )}
      <div>
        <Button onClick={() => changeFilter("all")} title="All" />
        <Button onClick={() => changeFilter("active")} title="Active" />
        <Button onClick={() => changeFilter("completed")} title="Completed" />
      </div>
      <div>{date}</div>
    </div>
  );
}
