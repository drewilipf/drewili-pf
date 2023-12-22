import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    postLoginSuccess: (state, action) => {
      state.login = action.payload;
    },
  },
});
export const { postLoginSuccess } = loginSlice.actions;
export default loginSlice.reducer;
