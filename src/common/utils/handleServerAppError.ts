import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/BaseResponse";

/**
 * Handles the error on the client and takes appropriate action.
 * @template D - The type of data in the server response
 * @param {BaseResponse<D>} data - The server response
 * @param {Dispatch} dispatch - The Redux dispatch function for sending actions
 * @param {boolean} [isShowError=true] - A flag indicating whether to show the error to the user. Defaults to true.
 */
export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch, isShowError: boolean = true) => {
  if (isShowError) {
    const error = { error: data.messages.length ? data.messages[0] : "Some error occurred" };
    dispatch(appActions.setAppError(error));
  }

  dispatch(appActions.setAppStatus({ status: "failed" }));
};
