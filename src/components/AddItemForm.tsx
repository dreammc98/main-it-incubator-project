import { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = memo(({ addItem }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");

  const [error, setError] = useState<null | string>(null);

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.currentTarget.value);
  };

  const addTaskHandler = () => {
    if (taskTitle.trim() !== "") {
      addItem(taskTitle.trim());
    }

    setTaskTitle("");
  };

  const addTaskOnKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && taskTitle.length <= stringLengthInput && taskTitle.length > 0) {
      addTaskHandler();
    }
    return;
  };

  const stringLengthInput = 15;

  const isAddTaskButtonDisabled = taskTitle.length > stringLengthInput || !taskTitle;

  const userTaskTitleLengthWarning = taskTitle.length > stringLengthInput && (
    <div>Maximum length {stringLengthInput} characters</div>
  );

  if (taskTitle.length > stringLengthInput && !error) {
    setError("Maximum length 15 characters");
  }

  if (taskTitle.length <= stringLengthInput && !!error) {
    setError(null);
  }

  const buttonTypes = {
    minWidth: "40px",
    minHeight: "40px",
    maxWidth: "40px",
    maxHeight: "40px",
  };

  return (
    <>
      <TextField
        error={!!error}
        id="outlined-basic"
        label="Enter a title..."
        variant="outlined"
        className={error ? "error" : ""}
        value={taskTitle}
        onChange={changeTaskTitleHandler}
        onKeyUp={addTaskOnKeyHandler}
        size="small"
        helperText={error}
      />

      <Button
        onClick={addTaskHandler}
        disabled={isAddTaskButtonDisabled}
        variant="contained"
        style={buttonTypes}
      >
        +
      </Button>

      {/* <Button   />
      {error && <div className="error-message">{error}</div>}
      {userTaskTitleLengthWarning} */}
    </>
  );
});
