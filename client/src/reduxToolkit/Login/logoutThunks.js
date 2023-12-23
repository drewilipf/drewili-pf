import { logoutSuccess } from "./loginSlice";

export const postLogout = () => async (dispatch) => {
  dispatch(logoutSuccess());
};
