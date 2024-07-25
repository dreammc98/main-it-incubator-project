import { ChangeEvent, useState } from "react";
import { Button } from "./Button";

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");

  const [error, setError] = useState<null | string>(null);

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim());
    } else {
      setError("Title is required");
    }

    setTaskTitle("");
  };

  const addTaskOnKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskTitle.length <= stringLengthInput) {
      addTaskHandler();
    }
    return;
  };

  const stringLengthInput = 15;

  const isAddTaskButtonDisabled = taskTitle.length > stringLengthInput || !taskTitle;

  const userTaskTitleLengthWarning = taskTitle.length > stringLengthInput && (
    <div>Maximum length {stringLengthInput} characters</div>
  );

  return (
    <>
      <input
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={(event) => changeTaskTitleHandler(event)}
        onKeyUp={(event) => addTaskOnKeyHandler(event)}
      />

      <Button title="+" onClick={addTaskHandler} disabled={isAddTaskButtonDisabled} />
      {error && <div className="error-message">{error}</div>}
      {userTaskTitleLengthWarning}
    </>
  );
};
