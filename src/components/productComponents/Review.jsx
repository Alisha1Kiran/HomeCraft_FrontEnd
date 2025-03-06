import React from "react";
import { useSelector } from "react-redux";
import RatingStar from "./RatingStar";
import ReviewForm from "./ReviewForm";

const Review = () => {
  const { reviews, loadingReview } = useSelector((state) => state.review);
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`w-max-full ${theme === "dark" ? "bg-gradient-to-tl from-cyan-950 to-cyan-600" : "bg-gradient-to-tl from-orange-300 to-orange-100"} p-6 m-10 rounded-box flex flex-col justify-center items-center shadow-2xl`}>
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

      {loadingReview ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <button className="btn btn-soft text-gray-500" onClick={() => document.getElementById("review-modal").showModal()}>
          No reviews yet. Be the first to review!
        </button>
      ) : (
        <div className="w-full md:w-full overflow-hidden">
          <div className="review-carousel rounded-box p-4">
            <div className="flex space-x-4 overflow-x-auto max-w-full md:max-w-6xl">
              {reviews.map((review) => (
                <div key={review._id} className="carousel-item">
                  <div className={`card ${theme === "dark" ? "bg-gradient-to-l from-neutral-400 to-neutral-600" : "bg-gradient-to-t  from-orange-400 to-amber-100"} shadow-md p-4 w-50 rounded-box md:w-80`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{review.reviewerName}</h3>
                        <RatingStar rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-2 `}>
                      {new Date(review.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className={`btn btn-soft ${theme === "dark" ? "bg-gray-700" : "bg-yellow-500"} `} onClick={() => document.getElementById("review-modal").showModal()}>Write your review!</button>

      {/* Add Review Form Modal */}
      <ReviewForm />
    </div>
  );
};

export default Review;
