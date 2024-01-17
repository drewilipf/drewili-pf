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

const calculateAverageStarsByProduct = (comments, productId) => {
  const productComments = comments.filter(comment => comment.productId === productId);
  const totalStars = productComments.reduce((sum, comment) => sum + comment.rating, 0);
  const average = productComments.length > 0 ? totalStars / productComments.length : null;
  return Number.isFinite(average) ? average : null;
};

export const getComments = () => {
  return async (dispatch) => {
    try {
      dispatch(getCommentsStart());
      const response = await axios.get(API_URL);
      dispatch(getCommentsSuccess({ comments: response.data }));

     
      response.data.forEach(comment => {
        dispatch(setAverageStars({ productId: comment.productId, averageStars: calculateAverageStarsByProduct(response.data, comment.productId) }));
      });
    } catch (error) {
      dispatch(getCommentsFailure({ error: error.message }));
    }
  };
};

export const postComment = (user_id, product_id, comment, rating) => {
  return async (dispatch, getState) => {
    try {
      
      dispatch(postCommentStart());
      const response = await axios.post(API_URL, { user_id, product_id, comment, rating });
      dispatch(postCommentSuccess({ newComment: response.data }));

      const updatedComments = [...getState().comments, response.data];
     

      const averageStars = calculateAverageStarsByProduct(updatedComments, product_id);
      

      dispatch(setAverageStars({ productId: product_id, averageStars }));
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

      const updatedComments = [...getState().comments, response.data];
      

      const averageStars = calculateAverageStarsByProduct(updatedComments, response.data.productId);
      

      dispatch(setAverageStars({ productId: response.data.productId, averageStars }));
    } catch (error) {
      dispatch(updateCommentFailure({ error: error.message }));
    }
  };
};