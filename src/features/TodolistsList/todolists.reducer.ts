import { todolistsAPI, TodolistType, updateTodolistArgs } from "api/todolists-api";
import { appActions, RequestStatusType } from "app/app.reducer";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThank, handleServerNetworkError } from "common/utils";
import { log } from "console";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, () => {
        return [];
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        console.log(action.payload);

        const newTodolist: TodolistDomainType = { ...action.payload.data.item, filter: "all", entityStatus: "idle" };
        state.unshift(newTodolist);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        state.push(...action.payload.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }) as const));
      });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

// thunks

export const changeTodolistTitle = createAppAsyncThank<any, updateTodolistArgs>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue } = thankApi;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.updateTodolist(arg);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      return arg;
    } catch (err) {
      handleServerNetworkError(err, dispatch);

      return rejectWithValue(null);
    }
  },
);

export const fetchTodolists = createAppAsyncThank<TodolistType[], {}>(
  `${slice.name}/fetchTodolists`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue } = thankApi;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.getTodolists();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      return res.data;
    } catch (err) {
      handleServerNetworkError(err, dispatch);

      return rejectWithValue(null);
    }
  },
);

export const removeTodolist = createAppAsyncThank<any, { id: string }>(
  `${slice.name}/removeTodolist`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue } = thankApi;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: "loading" }));
      await todolistsAPI.deleteTodolist(arg.id);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return arg;
    } catch (err) {
      handleServerNetworkError(err, dispatch);

      return rejectWithValue;
    }
  },
);

export const addTodolist = createAppAsyncThank<any, { title: string }>(
  `${slice.name}/addTodolist`,
  async (arg, thankApi) => {
    const { dispatch, rejectWithValue } = thankApi;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.createTodolist(arg.title);
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return res.data;
    } catch (err) {
      handleServerNetworkError(err, dispatch);

      return rejectWithValue;
    }
  },
);

// export const addTodolistTC = (title: string): AppThunk => {
//   return (dispatch) => {
//     dispatch(appActions.setAppStatus({ status: "loading" }));
//     todolistsAPI.createTodolist(title).then((res) => {
//       dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
//       dispatch(appActions.setAppStatus({ status: "succeeded" }));
//     });
//   };
// };
// export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
//   return (dispatch) => {
//     todolistsAPI.updateTodolist(id, title).then((res) => {
//       dispatch(todolistsActions.changeTodolistTitle({ id, title }));
//     });
//   };
// };

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
