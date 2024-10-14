import { Dispatch } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import axios from "axios";

/**
 * Handles the server network error and performs the appropriate actions.
 * @param {unknown} err - The error object
 * @param {Dispatch} dispatch - The Redux dispatch function for sending actions
 */

export const handleServerNetworkError = (err: unknown, dispatch: Dispatch): void => {
  let errorMessage = "Some error occurred";

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
