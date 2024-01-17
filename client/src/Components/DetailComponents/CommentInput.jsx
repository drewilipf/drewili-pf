import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./RatingComponent"; // Asegúrate de proporcionar la ruta correcta
import { postComment } from "../../reduxToolkit/Comment/commentThunks";

const CommentInput = ({ user_id, product_id, onCommentPosted }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [commentPosted, setCommentPosted] = useState(false);
  const comments = useSelector((state) => state.comments.comments);
  console.log(comments);
  const commentsState = useSelector((state) => state.comments);
  console.log(commentsState);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handlePostComment = () => {
    if (comment.trim() === "") {
      alert("Por favor, introduce un comentario antes de enviar.");
      return;
    }

    dispatch(postComment(user_id, product_id, comment, rating)).then(() => {
      setCommentPosted(true);
      onCommentPosted({ comment, rating });
    });
  };

  return (
    <div className="">
      <StarRating rating={rating} onRatingChange={handleRatingChange} />
      <textarea
        className="border-chiliRed border mt-4 w-3/4 h-1/2 rounded-md p-2 text-black font-arial text-base"
        rows="3"
        placeholder="Deja tu comentario..."
        value={comment}
        onChange={handleCommentChange}
        disabled={commentPosted}
      ></textarea>
      <br />
      <button
        className={`bg-chiliRed text-whiteSmoke rounded-md w-1/5 p-2 mt-2 hover:shadow-lg ${
          commentPosted && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handlePostComment}
        disabled={commentPosted}
      >
        Enviar
      </button>
    </div>
  );
};

export default CommentInput;
