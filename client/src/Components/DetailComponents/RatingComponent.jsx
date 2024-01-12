import React from "react";

const StarRating = ({ rating, onRatingChange }) => {

  console.log(rating, 'este es el rating');
  const handleClick = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= rating ? "text-chiliRed" : "text-gray-300"
          }`}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;