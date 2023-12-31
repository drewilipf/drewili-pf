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
  } from "./commentSlice";
  import axios from "axios";
  
  const API_URL = "http://localhost:3001/comment";
  
  export const getComments = () => {
    return async (dispatch) => {
      try {
        dispatch(getCommentsStart());
        const response = await axios.get(API_URL);
        dispatch(getCommentsSuccess({ comments: response.data }));
      } catch (error) {
        dispatch(getCommentsFailure({ error: error.message }));
      }
    };
  };
  
  export const postComment = (user_id, product_id, comment) => {
    return async (dispatch) => {
      try {
        dispatch(postCommentStart());
        
       
        const response = await axios.post(API_URL, {user_id, product_id, comment} );
        
        dispatch(postCommentSuccess({ newComment: response.data }));
      } catch (error) {
        dispatch(postCommentFailure({ error: error.message }));
      }
    };
  };
  
  export const updateComment = (commentId, updatedComment) => {
    return async (dispatch) => {
      try {
        dispatch(updateCommentStart());
        const response = await axios.put(`${API_URL}/${commentId}`, { updatedComment });
        dispatch(updateCommentSuccess({ updatedComment: response.data }));
      } catch (error) {
        dispatch(updateCommentFailure({ error: error.message }));
      }
    };
  };