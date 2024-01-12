import React from "react";

function CommentCard({ username, comment, createdAt, rating }) {
  return (
    <div className="border border-chiliRed rounded-md p-4 w-3/4">
      <div className="flex">
        <div className="border-r border-chiliRed pr-4">
          <h2 className="text-left font-bold">{username}</h2>
          <h3 className="text-left text-onyx">{createdAt}</h3>
          {rating !== undefined && (
            <p className="text-left">Rating: {rating} stars</p>
          )}
        </div>
        <div className="pl-4">
          <p className="text-left">{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;

