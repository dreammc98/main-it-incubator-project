import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { action } from "@storybook/addon-actions";
import { AddItemForm, PropsType } from "../components/AddItemForm";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { Task } from "../components/Task";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    changeTaskStatusHandler: fn(),
    changeTaskTitleHandler: fn(),
    removeTask: fn(),
    task: { id: "sdfsdfsf", isDone: false, title: "bbc" },
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {
  args: {},
};

export const TaskIsDoneStory: Story = {
  args: {
    task: { id: "1", isDone: true, title: "ccs" },
  },
};

export const TaskToggleStory = {
  render: () => {
    const [task, setTask] = useState({ id: "12", isDone: false, title: "css" });

    function changeTaskStatusHandler() {
      setTask({ ...task, isDone: !task.isDone });
    }

    function changeTaskTitleHandler(taskId: string, newTitle: string) {
      setTask({ ...task, title: newTitle });
    }

    return (
      <Task
        task={task}
        changeTaskTitleHandler={changeTaskTitleHandler}
        changeTaskStatusHandler={changeTaskStatusHandler}
        removeTask={action("removeTask")}
      />
    );
  },
};
