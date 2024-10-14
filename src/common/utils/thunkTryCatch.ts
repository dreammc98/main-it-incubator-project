import { todolistsAPI } from "api/todolists-api";
import { appActions } from "app/app.reducer";
import { AppDispatch } from "app/store";
import { handleServerNetworkError } from "./handleServerNetworkError";

type ThunkAPI = {
  dispatch: AppDispatch;
  rejectWithValue: any;
};

/**
 * Wraps an asynchronous logic function with try-catch block and handles server network errors.
 * @param {ThunkAPI} thunkAPI - The ThunkAPI object
 * @param {() => Promise<any>} logic - The asynchronous logic function
 * @returns {Promise<any>} - The result of the logic function
 */

export const thunkTryCatch = async (thunkAPI: ThunkAPI, logic: () => Promise<any>) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    return await logic();
  } catch (err) {
    handleServerNetworkError(err, dispatch);

    return rejectWithValue;
  } finally {
    dispatch(appActions.setAppStatus({ status: "idle" }));
  }
};
