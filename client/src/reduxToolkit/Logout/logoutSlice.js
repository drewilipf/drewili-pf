import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  logout: null,
};
export const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    postLogoutSuccess: (state, action) => {
      state.logout = action.payload;
    },
  },
});
export const { postLogoutSuccess } = logoutSlice.actions;
export default logoutSlice.reducer;
