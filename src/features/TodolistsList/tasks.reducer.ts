import {
  addTaskArgs,
  removeTaskArgs,
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
  updateTaskArgs,
  UpdateTaskModelType,
} from "api/todolists-api";
import { AppThunk } from "app/store";
import { appActions } from "app/app.reducer";
import {
  addTodolist,
  fetchTodolists,
  removeTodolist,
  todolistsActions,
} from "features/TodolistsList/todolists.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThank } from "common/utils/createAppAsyncThank";
import { handleServerNetworkError, handleServerAppError } from "common/utils";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        console.log(action.payload.data.item);

        state[action.payload.data.item.id] = [];
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// thunks

export const fetchTasks = createAppAsyncThank<
  {
    tasks: TaskType[];
    todolistId: string;
  },
  string
>(`${slice.name}/fetchTasks`, async (todolistId: string, thankApi) => {
  const { dispatch, rejectWithValue } = thankApi;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.getTasks(todolistId);

    const tasks = res.data.items;
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks, todolistId };
  } catch (err: any) {
    handleServerNetworkError(err, dispatch);
    return rejectWithValue(null);
  }
});

export const addTask = createAppAsyncThank<{ task: TaskType }, addTaskArgs>(
  `${slice.name}/addTask`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue } = thankApi;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.createTask(arg);
      if (res.data.resultCode === 0) {
        const task = res.data.data.item;
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { task };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const removeTask = createAppAsyncThank<removeTaskArgs, removeTaskArgs>(
  `${slice.name}/removeTask`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue } = thankApi;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.deleteTask(arg);
      if (res.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

export const updateTask = createAppAsyncThank<updateTaskArgs, updateTaskArgs>(
  `${slice.name}/updateTask`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue, getState } = thankApi;

    try {
      const state = getState();
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        console.warn("task not found in the state");
        return rejectWithValue(null);
      }

      const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      };

      const res = await todolistsAPI.updateTask(arg, apiModel);

      if (res.data.resultCode === 0) {
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

// export const removeTaskTC =
//   (taskId: string, todolistId: string): AppThunk =>
//   (dispatch) => {
//     todolistsAPI.deleteTask(todolistId, taskId).then(() => {
//       dispatch(tasksActions.removeTask({ taskId, todolistId }));
//     });
//   };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};
