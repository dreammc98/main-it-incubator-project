import { FilterValueType, TasksType } from "../../App";
import { Button } from "../Button";
import { ChangeEvent, MouseEventHandler, useState } from "react";

type TodolistPropsType = {
  title?: string;
  tasks: TasksType[];
  date?: string;
  addTask: (taskTitle: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterValueType) => void;
};

export function Todolist({
  title,
  tasks,
  date,
  addTask,
  removeTask,
  changeFilter,
}: TodolistPropsType) {
  const [taskTitle, setTaskTitle] = useState("");

  const stringLengthInput = 15;

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value.trimStart());
  };

  const addTaskHandler = () => {
    if (taskTitle.length > stringLengthInput) {
      return;
    }
    addTask(taskTitle.trimEnd());
    setTaskTitle("");
  };

  const addTaskOnKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
    return;
  };

  const isAddTaskButtonDisabled = taskTitle.length > stringLengthInput || !taskTitle;

  const userTaskTitleLengthWarning = taskTitle.length > stringLengthInput && (
    <div>Maximum length {stringLengthInput} characters</div>
  );

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={(event) => changeTaskTitleHandler(event)}
          onKeyUp={(event) => addTaskOnKeyHandler(event)}
        />
        <Button title="+" onClick={addTaskHandler} disabled={isAddTaskButtonDisabled} />
        {userTaskTitleLengthWarning}
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
