import { postLogoutSuccess } from "./logoutSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/auth/logout";

export const postLogout = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL);
      const logout = response.data;
      console.log(logout);

      dispatch(postLogoutSuccess(logout));
      return response;
    } catch (error) {
      console.error("Error of logout:", error);
      throw error;
    }
  };
};
