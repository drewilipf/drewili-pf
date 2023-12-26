import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  user: null,
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
    getUserByIdSlice: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { getUserSlice, postUserSlice, putUserSlice, getUserByIdSlice } =
  userSlice.actions;
export default userSlice.reducer;
