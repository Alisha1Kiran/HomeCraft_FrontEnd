import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";
import { fetchProductByName } from "../../redux/slices/productSlice";
import {
  fetchProductReviews,
  resetReviews,
} from "../../redux/slices/reviewSlice";
import getGuestId from "../../utils/getGuestId";
import showToaster from "../../utils/showToaster";
import toast from "react-hot-toast";
import RatingStar from "./RatingStar";
import Review from "./Review";

const ProductDetails = () => {
  const { productName } = useParams();
  console.log("productName : ", productName);
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );
  const { reviews, loadingReview } = useSelector((state) => state.review);
  const { user } = useSelector((state) => state.auth);
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const theme = useSelector((state) => state.theme.theme);

  const averageRating = selectedProduct?.ratings || 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false); // Moved here to ensure it's always executed

  useEffect(() => {
    if (productName) {
      dispatch(fetchProductByName(productName));
    }
  }, [dispatch, productName]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setCurrentIndex(0);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct?._id) {
      // If reviews are already fetched and match the selected product, no need to dispatch again
      if (!reviews?.length || reviews[0]?.product_id !== selectedProduct._id) {
        dispatch(resetReviews()); // Reset reviews if the selected product changes
        dispatch(fetchProductReviews(selectedProduct._id)); // Fetch new reviews
      }
    }
  }, [dispatch, selectedProduct?._id, reviews?.length]);

  console.log("Review : ", reviews);

  useEffect(() => {
    if (selectedProduct) {
      setIsInWishlist(
        wishlist.some((item) => item._id === selectedProduct._id)
      );
    }
  }, [wishlist, selectedProduct]);

  // ** Move loading and error checks after hooks to avoid breaking hook order **
  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedProduct) return <p>No product found.</p>;

  const handleAddToCart = async () => {
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;
    await dispatch(
      addToCart({
        user_id,
        product_id: selectedProduct._id,
        quantity: 1,
        guest_id,
      })
    );
    toast.success("Added Item to cart");
  };

  const handleWishlistClick = async () => {
    if (!user) {
      showToaster("Please log in to use wishlist");
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(selectedProduct._id));
        toast.success("Removed Item from wishlist");
        setIsInWishlist(false);
      } else {
        await dispatch(addToWishlist(selectedProduct._id));
        toast.success("Added Item to wishlist");
        setIsInWishlist(true);
      }
    } catch (error) {
      toast.error(`Failed to update wishlist: ${error.message}`);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 pt-50 md:grid-cols-2 gap-6">
        {/* Left Side - Image Carousel */}
        <div className="flex flex-col items-center animate-slideInLeft relative">
          <img
            src={selectedProduct.images[currentIndex].url}
            alt={selectedProduct.name}
            className="w-full max-w-md rounded-lg shadow-md object-cover"
          />

          {/* Carousel Buttons */}
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 glass text-white p-2 rounded-l-full"
            onClick={handlePrevious}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 glass text-white p-2 rounded-r-full"
            onClick={handleNext}
          >
            <ChevronRight />
          </button>

          {/* Thumbnail Selection */}
          <div className="flex gap-2 mt-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={image._id}
                src={image.url}
                alt="Thumbnail"
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 
                ${
                  index === currentIndex ? "border-primary" : "border-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div
          className={`space-y-4 animate-slideInRight ${
            theme === "dark" ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <h1 className="text-2xl font-bold capitalize">
            {selectedProduct.name}
          </h1>

          <div className="flex gap-2">
            <RatingStar rating={selectedProduct?.ratings || 0} />
            {reviews.length === 0 ? (
              <p>
                <span className="text-blue-500 cursor-pointer underline">
                  Be the first to review!
                </span>
              </p>
            ) : (
              <a href="#reviews" className="text-blue-500 underline">
                Read all reviews
              </a>
            )}
          </div>
          <p className="text-2xl font-semibold">Rs. {selectedProduct.price}</p>

          <div className="flex gap-3 items-center">
            <button
              className="w-full py-2 bg-sky-700 font-bold text-lg cursor-pointer text-gray-200"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            <button
              className="w-15 h-11 border-1 flex justify-center items-center cursor-pointer"
              onClick={handleWishlistClick}
            >
              <Heart
                className={`w-6 h-6 ${
                  isInWishlist ? " text-red-500" : "text-gray-500"
                }`}
                fill={isInWishlist ? "red" : "none"}
              />
            </button>
          </div>

          <table className="table table-zebra w-full border rounded-lg">
            <tbody>
              <tr>
                <td className="font-semibold">Weight</td>
                <td>{selectedProduct.specifications.weight}</td>
              </tr>
              <tr>
                <td className="font-semibold">Color</td>
                <td>{selectedProduct.specifications.color}</td>
              </tr>
              <tr>
                <td className="font-semibold">Material</td>
                <td>{selectedProduct.specifications.material}</td>
              </tr>
              <tr>
                <td className="font-semibold">Dimensions</td>
                <td>{selectedProduct.specifications.dimensions}</td>
              </tr>
              <tr>
                <td className="font-semibold">Features</td>
                <td>{selectedProduct.specifications.features}</td>
              </tr>
              <tr>
                <td className="font-semibold">General Info</td>
                <td>{selectedProduct.specifications.general}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="reviews">
        <Review />
      </div>
    </>
  );
};

export default ProductDetails;
