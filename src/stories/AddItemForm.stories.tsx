import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { AddItemForm, PropsType } from "../components/AddItemForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {
  args: {
    addItem: fn(),
  },
};

const AddItemFormError = memo(({ addItem }: PropsType) => {
  const [taskTitle, setTaskTitle] = useState("");

  const [error, setError] = useState<null | string>("Maximum length 15 characters");

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

  // if (taskTitle.length > stringLengthInput && !error) {
  //   setError("Maximum length 15 characters");
  // }

  // if (taskTitle.length <= stringLengthInput && !!error) {
  //   setError(null);
  // }

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

export const AddItemFormErrorStory = {
  render: () => <AddItemFormError addItem={action("Button clicked inside form")} />,
};
