import React from "react";
import CommentCard from "./CommentCard";

function CommentCards({ comments, detailId }) {
  const filteredComments = comments.filter((comment) => comment.productId == detailId);
  console.log(comments.map((comment) => (comment.productId)))
  console.log(detailId)
  console.log(comments)
  console.log(filteredComments)
  return (
    <div>
      {filteredComments && Array.isArray(filteredComments) && filteredComments.length > 0 ? (
        filteredComments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            productId = {comment.productId}
            username={comment.username}
            comment={comment.comment}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
          />
        ))
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
}

export default CommentCards;
