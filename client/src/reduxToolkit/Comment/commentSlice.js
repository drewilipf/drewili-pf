import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {
    getCommentsStart: (state) => {
      state.status = "loading";
    },
    getCommentsSuccess: (state, action) => {
      state.status = "succeeded";
      state.comments = action.payload.comments;
    },
    getCommentsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    postCommentStart: (state) => {
      state.status = "loading";
    },
    postCommentSuccess: (state, action) => {
      state.status = "succeeded";
      state.comments.push(action.payload.newComment);
    },
    postCommentFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    updateCommentStart: (state) => {
      state.status = "loading";
    },
    updateCommentSuccess: (state, action) => {
      state.status = "succeeded";
      const updatedComment = action.payload.updatedComment;
      const index = state.comments.findIndex((comment) => comment.id === updatedComment.id);
      if (index !== -1) {
        state.comments[index] = updatedComment;
      }
    },
    updateCommentFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
  },
});

export const {
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure,
  postCommentStart,
  postCommentSuccess,
  postCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updateCommentFailure,
} = commentSlice.actions;

export default commentSlice.reducer;