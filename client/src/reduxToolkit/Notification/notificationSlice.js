import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: [],
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
    }
  },
});

export const {
  postNotificationStart,
  postNotificationSuccess,
  postNotificationFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;