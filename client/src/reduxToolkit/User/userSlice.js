import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSlice: (state, action) => {
      state.users = action.payload.users;
    },
    postUserSlice: (state, action) => {
      state.users = action.payload.users;
    },
  },
});

export const { getUserSlice, postUserSlice } = userSlice.actions;
export default userSlice.reducer;
