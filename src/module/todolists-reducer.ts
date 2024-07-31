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
    newId: string;
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

type ChangeFilter = {
  type: "CHANGE-FILTER";
  payload: { filter: FilterValueType; todolistId: string };
};

type ActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | ChangeFilter;

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
      return [...state, { id: action.payload.newId, title: action.payload.title, filter: "all" }];
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
    case "CHANGE-FILTER": {
      return state.map((t) =>
        t.id === action.payload.todolistId ? { ...t, filter: action.payload.filter } : t
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

export const addTodolistAC = (newId: string, title: string) => {
  return {
    type: "ADD-TODOLIST",
    payload: { title, newId },
  } as const;
};

export const changeTodolistTitleAC = (
  todolistId: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
      id: todolistId,
      title,
    },
  } as const;
};

export const changeTodolistFilterAC = (todolistId: string): ChangeTodolistFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
      id: todolistId,
      filter: "completed",
    },
  } as const;
};

export const changeFilterAC = (filter: FilterValueType, todolistId: string): ChangeFilter => {
  return {
    type: "CHANGE-FILTER",
    payload: { filter, todolistId },
  } as const;
};
