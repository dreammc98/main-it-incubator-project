import { v1 } from "uuid";
import { TodolistType } from "../App";
import {
  addTodolistAC,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

test("correct todolist should be remove", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  //Стартовый State 1
  const startState: TodolistType[] = [
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  //Action 2

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию
  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  //Стартовый State 1
  const startState: TodolistType[] = [
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  //Action 2

  const endState = todolistsReducer(startState, addTodolistAC());

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию
  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(addTodolistAC().payload.title);
});

test("correct todolist should change its name", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  //Стартовый State 1
  const startState: TodolistType[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  //Action 2

  const endState = todolistsReducer(startState, changeTodolistTitle(todolistId2));

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(changeTodolistTitle(todolistId2).payload.title);
});

test("correct todolist should change its filter", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  //Стартовый State 1
  const startState: TodolistType[] = [
    { id: todolistId1, title: "what to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  //Action
  const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2));

  // 3. Проверяем что наши действия (изменения State) соответствуют ожиданию
  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(changeTodolistFilter(todolistId2).payload.filter);
});
