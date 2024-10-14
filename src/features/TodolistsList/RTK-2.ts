// import { todolistsAPI, TodolistType, updateTodolistArgs } from "api/todolists-api";
// import { appActions, RequestStatusType } from "app/app.reducer";
// import { AppThunk } from "app/store";
// import { asyncThunkCreator, buildCreateSlice, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { clearTasksAndTodolists } from "common/actions/common.actions";
// import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";
// import { log } from "console";

// const createAppSlice = buildCreateSlice({
//   creators: { asyncThunk: asyncThunkCreator },
// });

// const initialState: TodolistDomainType[] = [];

// const slice = createAppSlice({
//   name: "todo",
//   initialState,
//   reducers: (creators) => {
//     return {
//       removeTodolist: creators.reducer((state, action: PayloadAction<{ id: string }>) => {
//         const index = state.findIndex((todo) => todo.id === action.payload.id);
//         if (index !== -1) state.splice(index, 1);
//       }),
//       addTodolist: creators.reducer((state, action: PayloadAction<{ todolist: TodolistType }>) => {
//         const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
//         state.unshift(newTodolist);
//       }),
//       changeTodolistTitle: creators.reducer((state, action: PayloadAction<{ id: string; title: string }>) => {
//         const todo = state.find((todo) => todo.id === action.payload.id);
//         if (todo) {
//           todo.title = action.payload.title;
//         }
//       }),
//       changeTodolistFilter: creators.reducer(
//         (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
//           const todo = state.find((todo) => todo.id === action.payload.id);
//           if (todo) {
//             todo.filter = action.payload.filter;
//           }
//         },
//       ),
//       changeTodolistEntityStatus: creators.reducer(
//         (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
//           const todo = state.find((todo) => todo.id === action.payload.id);
//           if (todo) {
//             todo.entityStatus = action.payload.entityStatus;
//           }
//         },
//       ),

//       fetchTodolists: creators.asyncThunk<undefined, { todolists: TodolistType[] }, { rejectValue: null }>(
//         async (_, { dispatch, rejectWithValue }) => {
//           try {
//             dispatch(appActions.setAppStatus({ status: "loading" }));
//             const res = await todolistsAPI.getTodolists();
//             dispatch(appActions.setAppStatus({ status: "succeeded" }));
//             return { todolists: res.data };
//           } catch (e) {
//             handleServerNetworkError(e, dispatch);
//             return rejectWithValue(null);
//           }
//         },
//         {
//           fulfilled: (state, action) => {
//             return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
//           },
//         },
//       ),
//     };
//   },

//   extraReducers: (builder) => {
//     builder.addCase(clearTasksAndTodolists, () => {
//       return [];
//     });
//   },
// });

// export const todolistsReducer = slice.reducer;
// export const todolistsActions = slice.actions;

// // thunks

// export const changeTodolistTitle = createAppAsyncThunk<any, updateTodolistArgs>(
//   `${slice.name}/changeTodolistTitle`,
//   async (arg, thunkApi) => {
//     const { dispatch, rejectWithValue } = thunkApi;

//     try {
//       dispatch(appActions.setAppStatus({ status: "loading" }));
//       const res = await todolistsAPI.updateTodolist(arg);
//       dispatch(appActions.setAppStatus({ status: "succeeded" }));

//       return arg;
//     } catch (err) {
//       handleServerNetworkError(err, dispatch);

//       return rejectWithValue(null);
//     }
//   },
// );

// // export const fetchTodolists = createAppAsyncThunk<TodolistType[], {}>(
// //   `${slice.name}/fetchTodolists`,
// //   async (arg, thunkApi) => {
// //     const { dispatch, rejectWithValue } = thunkApi;

// //     try {
// //       dispatch(appActions.setAppStatus({ status: "loading" }));
// //       const res = await todolistsAPI.getTodolists();
// //       dispatch(appActions.setAppStatus({ status: "succeeded" }));

// //       return res.data;
// //     } catch (err) {
// //       handleServerNetworkError(err, dispatch);

// //       return rejectWithValue(null);
// //     }
// //   },
// // );

// export const removeTodolist = createAppAsyncThunk<any, { id: string }>(
//   `${slice.name}/removeTodolist`,
//   async (arg, thunkApi) => {
//     const { dispatch, rejectWithValue } = thunkApi;
//     try {
//       dispatch(appActions.setAppStatus({ status: "loading" }));
//       dispatch(todolistsActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: "loading" }));
//       await todolistsAPI.deleteTodolist(arg.id);
//       dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       return arg;
//     } catch (err) {
//       handleServerNetworkError(err, dispatch);

//       return rejectWithValue;
//     }
//   },
// );

// export const addTodolist = createAppAsyncThunk<any, { title: string }>(
//   `${slice.name}/addTodolist`,
//   async (arg, thunkApi) => {
//     const { dispatch, rejectWithValue } = thunkApi;
//     try {
//       dispatch(appActions.setAppStatus({ status: "loading" }));
//       const res = await todolistsAPI.createTodolist(arg.title);
//       dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       return res.data;
//     } catch (err) {
//       handleServerNetworkError(err, dispatch);

//       return rejectWithValue;
//     }
//   },
// );

// // types
// export type FilterValuesType = "all" | "active" | "completed";
// export type TodolistDomainType = TodolistType & {
//   filter: FilterValuesType;
//   entityStatus: RequestStatusType;
// };
