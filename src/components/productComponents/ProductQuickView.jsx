import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight, X } from "lucide-react"; // Import X icon
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import getGuestId from "../../utils/getGuestId";
import showToaster from "../../utils/showToaster";

const ProductQuickView = ({ productData, closeModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const theme = useSelector((state) => state.theme.theme);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (productData) {
      setIsInWishlist(wishlist.some((item) => item._id === productData._id));
    }
  }, [wishlist, productData]);

  if (!productData) {
    return null; // or any fallback component like a loading indicator
  }

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;
    await dispatch(addToCart({ user_id, product_id: productData._id, quantity: 1, guest_id }));
    toast.success("Added Item to cart");
  };

  const handleWishlistClick = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (!user) {
      showToaster("Please log in to use wishlist");
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(productData._id));
        toast.success("Removed Item from wishlist");
        setIsInWishlist(false);
      } else {
        await dispatch(addToWishlist(productData._id));
        toast.success("Added Item to wishlist");
        setIsInWishlist(true);
      }
    } catch (error) {
      toast.error(`Failed to update wishlist: ${error.message}`);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productData.images.length - 1 : prevIndex - 1
    );
  };

  // Prevent navigation on carousel dot click
  const handleDotClick = (e, index) => {
    e.preventDefault(); // Prevent the default anchor behavior
    setCurrentIndex(index);
  };

  return (
    <div className="modal-box w-11/12 h-10/12 max-w-2xl relative">
      {/* Close Icon */}
      <button
        onClick={(event) => { event.stopPropagation(); event.preventDefault(); closeModal(); }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex gap-6 mt-7">
        {/* Left Section: Image Carousel */}
        <div className="flex-1">
          <div className="carousel w-full">
            {/* Only display the image that matches the currentIndex */}
            <div className="carousel-item w-full">
              <img
                src={productData.images[currentIndex].url} // Use currentIndex to show the correct image
                alt={productData.name}
                className="w-full rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {productData.images.map((_, index) => (
              <a
                href={`#carousel-item-${index}`}
                onClick={(e) => handleDotClick(e, index)} // Handle the click here
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-400'}`}
                key={index}
              />
            ))}
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex-1 max-h-96 overflow-y-auto">
          {/* Product Title */}
          <h3 className="font-bold text-2xl mb-4">{productData.name}</h3>

          {/* Product Price */}
          <div className="mt-4">
            <h4 className="font-semibold text-xl text-green-600">Price: ₹{productData.price}</h4>
          </div>

          {/* Product Specifications */}
          <div className="mt-4 space-y-2">
            <h5 className="font-semibold text-lg">Specifications:</h5>
            <ul className={`list-disc pl-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"} `}>
              {Object.entries(productData.specifications).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex gap-3 mt-4 items-center">
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
              <Heart className={`w-6 h-6 ${isInWishlist ? " text-red-500" : "text-gray-500"}`} fill={isInWishlist ? "red" : "none"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
