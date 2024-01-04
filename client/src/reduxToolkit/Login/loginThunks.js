import { postLoginSuccess } from "./loginSlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/auth/login";

export const postLogin = (loginData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, loginData);
      const login = response.data;

      dispatch(postLoginSuccess(login));
      return response;
    } catch (error) {
      console.error("Error of login:", error);
      throw error;
    }
  };
};
