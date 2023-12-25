import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  userId: null,
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
    putUserSlice: (state, action) => {
      state.userId = action.payload.userId;
    },
  },
});

export const { getUserSlice, postUserSlice, putUserSlice } = userSlice.actions;
export default userSlice.reducer;
