import { createSlice } from "@reduxjs/toolkit";

const calculateAverageStarsByProduct = (comments, productId) => {
  const productComments = comments.filter(
    (comment) => comment.productId === productId
  );
  const totalStars = productComments.reduce(
    (sum, comment) => sum + comment.rating,
    0
  );
  const average =
    productComments.length > 0 ? totalStars / productComments.length : null;
  return Number.isFinite(average) ? average : null;
};

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    averageStars: {},
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

      state.comments.forEach((comment) => {
        state.averageStars[comment.productId] = calculateAverageStarsByProduct(
          state.comments,
          comment.productId
        );
      });
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
      state.averageStars = calculateAverageStars(state.comments);
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
      const index = state.comments.findIndex(
        (comment) => comment.id === updatedComment.id
      );
      if (index !== -1) {
        state.comments[index] = updatedComment;
        state.averageStars = calculateAverageStars(state.comments);
      }
    },
    updateCommentFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload.error;
    },
    setAverageStars: (state, action) => {
      const { productId, averageStars } = action.payload;
      state.averageStars[productId] = averageStars;
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
  setAverageStars,
} = commentSlice.actions;

export default commentSlice.reducer;
