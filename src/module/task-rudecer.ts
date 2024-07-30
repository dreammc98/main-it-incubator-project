import { v1 } from "uuid";
import { TaskType } from "../App";

export const taksReducer = (state: TaskType[], action: TaskReducerType): TaskType[] => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return state.filter((t) => t.id !== action.payload.id);
    }
    case "ADD-TASK": {
      const newTask = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      return [newTask, ...state];
    }
    default:
      return state;
  }
};

type TaskReducerType = RemoveTask | AddTask;

type RemoveTask = {
  type: "REMOVE-TASK";
  payload: {
    id: string;
  };
};

export const RemoveTaskAC = (id: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      id,
    },
  } as const;
};

type AddTask = {
  type: "ADD-TASK";
  payload: {
    title: string;
  };
};

export const AddTaskAc = (title: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      title,
    },
  } as const;
};
