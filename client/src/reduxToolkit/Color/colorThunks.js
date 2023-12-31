import { getColorSlice, postColorSlice } from "./colorSlice";
import axios from "axios";

const API_URL = "http://localhost:3001/color";

export const getColor = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL);

      const color = response.data;

      dispatch(getColorSlice({ color }));
    } catch (error) {
      console.error("Error fetching color:", error);
    }
  };
};
export const postColor = (co) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URL, co);

      const color = response.data;

      dispatch(postColorSlice({ color }));
    } catch (error) {
      console.error("Error create color:", error);
    }
  };
};
