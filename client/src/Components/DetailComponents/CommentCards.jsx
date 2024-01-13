import React from "react";
import CommentCard from "./CommentCard";

function CommentCards({ comments, detailId, averageStars }) {
  const filteredComments = comments.filter((comment) => comment.productId == detailId);

  return (
    <div>
      {averageStars !== null && averageStars !== undefined && (
        <p>Average Rating: {averageStars.toFixed(2)} stars</p>
      )}

      {filteredComments && Array.isArray(filteredComments) && filteredComments.length > 0 ? (
        filteredComments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            productId={comment.productId}
            username={comment.username}
            comment={comment.comment}
            rating={comment.rating}
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