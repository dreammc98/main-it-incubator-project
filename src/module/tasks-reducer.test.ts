import { TasksStateType } from "../App";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteAllTasks,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  });
});

test("correct task should be all deleted", () => {
  const action = deleteAllTasks("todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(Object.keys(endState).length).toBe(1);
});

test("correct task should be added to correct array", () => {
  const action = addTaskAC("todolistId2", "juce");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const action = changeTaskStatusAC(false, "2", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1[0].isDone).toBe(false);
  expect(endState.todolistId2[1].isDone).toBe(false);
});

test("correct todolist should change its name", () => {
  const endState = tasksReducer(startState, changeTaskTitleAC("todolistId2", "2", "test"));

  expect(endState["todolistId1"][0].title).toBe("CSS");
  expect(endState["todolistId2"][1].title).toBe("test");
});
