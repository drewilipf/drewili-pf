import { logoutSuccess } from "./loginSlice";

export const postLogout = () => async (dispatch) => {
  await dispatch(logoutSuccess());
};
