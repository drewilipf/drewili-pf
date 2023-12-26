import {
  getUserSlice,
  postUserSlice,
  putUserSlice,
  getUserByIdSlice,
  deletedUserSlice,
} from "./userSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/user";

export const getUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const users = response.data;

      dispatch(getUserSlice({ users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
export const postUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, userData);

      const users = response.data;

      dispatch(postUserSlice({ users }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};
export const putUser = (id, userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      const userId = response.data;
      dispatch(putUserSlice({ userId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const getUserId = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/bypk/${id}`);
      const user = response.data;
      dispatch(getUserByIdSlice({ user }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
export const deletedUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      const userId = response.data;
      console.log(userId);
      dispatch(deletedUserSlice({ userId }));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
};
