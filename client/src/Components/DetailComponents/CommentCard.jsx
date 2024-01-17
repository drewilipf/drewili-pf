import React from "react";
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

function CommentCard({ username, comment, createdAt, rating }) {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isHalfStar = i - 0.5 === rating;
      const isFullStar = i <= rating;

      stars.push(
        <span key={i} style={{ display: "inline-block", marginRight: "3px" }}>
          {isFullStar ? (
            <TiStarFullOutline color="#e62f05" />
          ) : isHalfStar ? (
            <TiStarHalfOutline color="#e62f05" />
          ) : (
            <TiStarOutline color="#e62f05" />
          )}
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="border border-chiliRed rounded-md p-4 w-3/4">
      <div className="flex">
        <div className="border-r border-chiliRed pr-4">
          <h2 className="text-left font-bold">{username}</h2>
          <h3 className="text-left text-onyx">{createdAt}</h3>
          {rating !== undefined && (
            <div className="text-left">
              
              <div>{renderStars()}</div>
            </div>
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