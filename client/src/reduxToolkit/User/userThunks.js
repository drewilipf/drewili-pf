import { getUserSlice, postUserSlice } from "./userSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/user";

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data);
      const users = response.data;
      console.log("User thunks:", users);
      dispatch(getUserSlice({ users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
export const postUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL);
      console.log("API Response:", response.data);
      const users = response.data;
      console.log("User thunks:", users);
      dispatch(postUserSlice({ users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
