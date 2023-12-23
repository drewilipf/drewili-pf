import { postLoginSuccess } from "./loginSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/auth/login";

export const postLogin = (loginData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, loginData);
      const login = response.data;
      console.log(login);

      dispatch(postLoginSuccess(login));
      return response;
      console.log(login);
    } catch (error) {
      console.error("Error of login:", error);
      throw error;
    }
  };
};
