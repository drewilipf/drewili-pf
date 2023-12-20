import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../../reduxToolkit/Comment/commentSlice"; 

const CommentInput = ({ user_id, product_id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (comment.trim() === "") {
      alert("Por favor, introduce un comentario antes de enviar.");
      return;
    }

    dispatch(postComment({ user_id, product_id, comment }));
    setComment("");
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        placeholder="Deja tu comentario..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <br />
      <button onClick={handlePostComment}>Enviar Comentario</button>
    </div>
  );
};

export default CommentInput;