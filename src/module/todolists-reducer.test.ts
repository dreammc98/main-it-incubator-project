import { v1 } from "uuid";
import { TodolistType } from "../AppWithReducers";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;

let startState: TodolistType[];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  //Стартовый State 1
  startState = [
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];
});

test("correct todolist should be remove", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));
  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const endState = todolistsReducer(startState, addTodolistAC("id3", "test"));

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe("test");
});

test("correct todolist should change its name", () => {
  //Action 2

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, "test"));

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию

  expect(endState[0].title).toBe("what to learn");
  expect(endState[1].title).toBe("test");
});

test("correct todolist should change its filter", () => {
  //Action
  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2));

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(changeTodolistFilterAC(todolistId2).payload.filter);
});
