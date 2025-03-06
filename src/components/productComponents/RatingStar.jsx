import React from "react";
import { useSelector } from "react-redux";
import { Star } from "lucide-react";

const RatingStar = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <div key={index} className="relative w-6 h-6">
          {/* Base Gray Star */}
          <Star className="text-gray-400 w-6 h-6 absolute" />

          {/* Fully Filled Star */}
          {index < fullStars && (
            <Star className="text-yellow-500 fill-yellow-500 w-6 h-6 absolute" />
          )}

          {/* Half-Filled Star */}
          {index === fullStars && hasHalfStar && (
            <div className="absolute w-6 h-6">
              <Star
                className="text-yellow-500 fill-yellow-500 w-6 h-6 absolute"
                style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingStar;
