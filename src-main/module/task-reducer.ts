import { TasksType } from "../App";

export const taskReducer = (state: TasksType[], action: TaskReducerType): TasksType[] => {
  switch (action.type) {
    case "REMOVE-TASK": {

      { ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId) }

      return {...state, }
    }
    default:
      return state;
  }
};

type TaskReducerType = RemoveTaskActionType;

type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  payload: {
    id: string;
  };
};

export const removeTaskAC = (taskId: string,todolistId:string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      taskId,
      todolistId
    },
  };
};
