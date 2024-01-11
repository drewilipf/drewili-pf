import {
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
} from "./commentSlice";
import axios from "axios";

const API_URL = "https://drewili-pf-back.onrender.com/comment";



export const getComments = () => {
  return async (dispatch) => {
    try {
      dispatch(getCommentsStart());
      const response = await axios.get(API_URL);
      dispatch(getCommentsSuccess({ comments: response.data }));
      
      // Calculate and set average ratings for each product
      response.data.forEach(comment => {
        dispatch(setAverageStars({ productId: comment.productId, averageStars: calculateAverageStarsByProduct(response.data, comment.productId) }));
      });
    } catch (error) {
      dispatch(getCommentsFailure({ error: error.message }));
    }
  };
};

export const postComment = (user_id, product_id, comment) => {
  return async (dispatch, getState) => {
    try {
      dispatch(postCommentStart());
      const response = await axios.post(API_URL, { user_id, product_id, comment });
      dispatch(postCommentSuccess({ newComment: response.data }));
      
      // Calculate and set average rating for the specific product
      dispatch(setAverageStars({ productId: product_id, averageStars: calculateAverageStarsByProduct([...getState().comments, response.data], product_id) }));
    } catch (error) {
      dispatch(postCommentFailure({ error: error.message }));
    }
  };
};

export const updateComment = (commentId, updatedComment) => {
  return async (dispatch, getState) => {
    try {
      dispatch(updateCommentStart());
      const response = await axios.put(`${API_URL}/${commentId}`, { updatedComment });
      dispatch(updateCommentSuccess({ updatedComment: response.data }));
      
      dispatch(setAverageStars({ productId: response.data.productId, averageStars: calculateAverageStarsByProduct([...getState().comments, response.data], response.data.productId) }));
    } catch (error) {
      dispatch(updateCommentFailure({ error: error.message }));
    }
  };
};

