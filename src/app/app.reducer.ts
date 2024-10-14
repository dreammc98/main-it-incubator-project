import { Dispatch } from "redux";
import { authActions } from "features/auth/model/auth.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "features/auth/api/authAPI";
import { createAppAsyncThunk } from "common/utils";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
  },

  extraReducers(builder) {
    builder;
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
