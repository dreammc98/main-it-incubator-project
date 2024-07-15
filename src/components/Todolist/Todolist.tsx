import { FilterValueType, TasksType } from "../../App";
import { Button } from "../Button";
import { ChangeEvent, MouseEventHandler, useState } from "react";

type TodolistPropsType = {
  title?: string;
  tasks: TasksType[];
  date?: string;
  filter?: string;
  addTask: (taskTitle: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (filter: FilterValueType, id: string) => void;
  changeTaskStatus: (isDone: boolean, id: string, todolistId: string) => void;
  todolistId: string;
  removeTodolist: (todolistId: string) => void;
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
  } = props;

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const [taskTitle, setTaskTitle] = useState("");

  const [error, setError] = useState<null | string>(null);

  const stringLengthInput = 15;

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(event.currentTarget.value);
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newStatusValue = e.currentTarget.checked;
    changeTaskStatus(newStatusValue, id, todolistId);
  };

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addTask(taskTitle.trim(), todolistId);
    } else {
      setError("Title is required");
    }

    setTaskTitle("");
  };

  const addTaskOnKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler();
    }
    return;
  };

  const getActiveFilter = (prop: string) => {
    return filter === prop ? "active-filter" : "";
  };

  const isAddTaskButtonDisabled = taskTitle.length > stringLengthInput || !taskTitle;

  const userTaskTitleLengthWarning = taskTitle.length > stringLengthInput && (
    <div>Maximum length {stringLengthInput} characters</div>
  );

  return (
    <div>
      <div className="todolist-title-container">
        <h3>{title}</h3>
        <Button title={"x"} onClick={removeTodolistHandler} />
      </div>

      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={(event) => changeTaskTitleHandler(event)}
          onKeyUp={(event) => addTaskOnKeyHandler(event)}
        />
        <Button title="+" onClick={addTaskHandler} disabled={isAddTaskButtonDisabled} />
        {error && <div className="error-message">{error}</div>}
        {userTaskTitleLengthWarning}
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
                <span>{task.title}</span>
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
