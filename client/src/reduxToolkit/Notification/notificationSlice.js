import { createSlice } from "@reduxjs/toolkit";



const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: [],
    emailData: {},
    status: "idle",
    error: null,
  },
  reducers: {
    postNotificationStart: (state) => {
      state.status = "loading";
    },
    postNotificationSuccess: (state, action) => {
      state.status = "succeeded";
      state.notification.push(action.payload);
    },
    postNotificationFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    putEmaildata: (state, action) => {
      state.emailData = action.payload;
    },
  },
  });

export const {
  postNotificationStart,
  postNotificationSuccess,
  postNotificationFailure,
  putEmaildata
} = notificationSlice.actions;

export default notificationSlice.reducer;