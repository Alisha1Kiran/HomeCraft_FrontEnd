import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import { fetchProductByName } from "../../redux/slices/productSlice";
import getGuestId from "../../utils/getGuestId";
import showToaster from "../../utils/showToaster";

const ProductDetails = () => {
  const { productName } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (productName) {
      dispatch(fetchProductByName(productName));
    }
  }, [dispatch, productName]);

  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setCurrentIndex(0); // Reset to first image when product changes
    }
  }, [selectedProduct]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedProduct) return <p>No product found.</p>;

  const handleAddToCart = () => {
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;

    dispatch(
      addToCart({ user_id, product_id: selectedProduct._id, quantity: 1, guest_id })
    );
  };

  const handleWishlistClick = () => {
    !user && showToaster();
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
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                ${index === currentIndex ? "border-primary" : "border-gray-300"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="space-y-4 animate-slideInRight">
        <h1 className="text-3xl font-bold capitalize">{selectedProduct.name}</h1>
        <p className="text-lg font-semibold text-primary">{selectedProduct.price}/-</p>
        
        <div className="flex gap-3 items-center">
          <button
            className="w-full py-2 bg-sky-700 font-bold text-lg cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className="w-15 h-11 border-1 flex justify-center items-center cursor-pointer"
            onClick={handleWishlistClick}
          >
            <Heart />
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
  );
};

export default ProductDetails;
