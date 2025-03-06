import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProductReview } from "../../redux/slices/reviewSlice";
import { Star } from "lucide-react";

const ReviewForm = ({ productId }) => {
  const { user } = useSelector((state) => state.auth);
  const { selectedProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { loadingReview } = useSelector((state) => state.review);

  const [reviewData, setReviewData] = useState({
    guestName: "",
    user_id: "",
    product_id: selectedProduct._id,
    rating: 0,
    comment: "",
  });

  // Handle star rating click
  const handleRatingClick = (rating) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a copy of reviewData
    const updatedReview = {
      product_id: selectedProduct._id,
      rating: reviewData.rating,
      comment: reviewData.comment,
    };

    // Include `user_id` only if the user is logged in
    if (user) {
      updatedReview.user_id = user._id;
    } else {
      updatedReview.guestName = "Guest";
    }

    dispatch(postProductReview(updatedReview)).then(() => {
      document.getElementById("review-modal").close();
      setReviewData({
        rating: 0,
        comment: "",
        guestName: "",
        user_id: "",
        product_id: selectedProduct._id,
      });
    });
  };

  return (
    <dialog id="review-modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Write a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Star Rating Input */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                className={`cursor-pointer ${
                  num <= reviewData.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-400"
                }`}
                onClick={() => handleRatingClick(num)}
              />
            ))}
          </div>

          <textarea
            name="comment"
            placeholder="Your Review"
            value={reviewData.comment}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loadingReview}
          >
            {loadingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => document.getElementById("review-modal").close()}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewForm;
