import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  payload: {
    id: string;
  };
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  payload: {
    title: string;
  };
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  payload: {
    id: string;
    title: string;
  };
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  payload: {
    id: string;
    filter: FilterValueType;
  };
};

type ActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const todolistId1 = v1();
const todolistId2 = v1();

const initialState: TodolistType[] = [
  { id: todolistId1, title: "what to learn", filter: "all" },
  { id: todolistId2, title: "what to buy", filter: "all" },
];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionTypes
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((t) => t.id !== action.payload.id);
    }
    case "ADD-TODOLIST": {
      const newId = v1();
      return [...state, { id: newId, title: action.payload.title, filter: "all" }];
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, title: action.payload.title } : t
      );
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, filter: action.payload.filter } : t
      );
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { id: todolistId },
  } as const;
};

export const addTodolistAC = () => {
  return {
    type: "ADD-TODOLIST",
    payload: { title: "New todolist" },
  } as const;
};

export const changeTodolistTitle = (todolistId: string) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id: todolistId,
      title: "New todolist",
    },
  } as const;
};

export const changeTodolistFilter = (todolistId: string) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id: todolistId,
      filter: "completed",
    },
  } as const;
};
