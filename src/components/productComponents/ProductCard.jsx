import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Eye, Heart } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";
import getGuestId from "../../utils/getGuestId";
import showToaster from "../../utils/showToaster";
import toast from "react-hot-toast";
import ProductQuickView from "./ProductQuickView";
import { use } from "react";

const ProductCard = ({ productData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Cheking User from auth
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const theme = useSelector((state) => state.theme.theme);
  const [showProduct, setShowproduct] = useState(null)
  const modalRef = useRef(null);

  const handleAddToCart = async () => {
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;

    console.log("User id: ", user_id);
    console.log("Guest id: ", guest_id);

    await dispatch(
      addToCart({ user_id, product_id: productData._id, quantity: 1, guest_id })
    );

    toast.success("Added Item to cart");
  };

  const [isInWishlist, setIsInWishList] = useState(
    wishlist.some((item) => item._id === productData._id)
  );
  // const isInWishlist = wishlist.some((item) => item._id === productData._id);

  const handleWishlistClick = async (event) => {
    event.stopPropagation(); // Prevents navigation
    event.preventDefault(); // Prevents link default behavior

    if (!user) {
      showToaster("Please log in to use wishlist");
      return;
    }

    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(productData._id));
        toast.success("Removed Item from wishlist");
        setIsInWishList(false);
      } else {
        await dispatch(addToWishlist(productData._id));
        toast.success("Added Item to wishlist");
        setIsInWishList(true);
      }
    } catch (error) {
      toast.error(`Failed to update wishlist: ${error.message}`);
    }
  };

  const handleQuickView = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowproduct(productData);
    if (modalRef.current) {
      modalRef.current.showModal(); // Show the modal via ref
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close(); // Close the modal
    }
  };
  return (
    <div className="card glass w-64 h-[350px] shadow-xl flex flex-col z-10">
      {/* Image Section */}
      <Link to={`/view-product/${productData.name}`} className="group">
        <figure className="h-[180px] relative overflow-hidden">
          <img
            src={productData?.images?.[0]?.url || "/placeholder.jpg"}
            alt={productData?.name || "No image available"}
            className="rounded-xl w-full h-full object-cover transition-all duration-300 group-hover:opacity-0"
          />
          <img
            src={
              productData?.images?.[1]?.url ||
              productData?.images?.[0]?.url ||
              "/placeholder.jpg"
            }
            alt={productData?.name || "No image available"}
            className="rounded-xl w-full h-full object-cover absolute top-0 left-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              onClick={handleQuickView}
            >
              <Eye className="w-5 h-5 text-gray-700 cursor-pointer" />
            </button>
          </div>

              <dialog ref={modalRef} className="modal" onClick={(event) => event.stopPropagation()}>
              {showProduct &&  <ProductQuickView productData={showProduct} closeModal={handleCloseModal}/>}
            </dialog>
          

          <div className="absolute top-2 right-2 flex gap-2">
            <button onClick={handleWishlistClick}>
              <Heart
                className={`w-5 h-5 cursor-pointer ${
                  isInWishlist ? "text-red-500" : "text-gray-500"
                }`}
                fill={isInWishlist ? "red" : "none"}
              />
            </button>
          </div>
        </figure>
      </Link>

      {/* Card Body */}
      <div
        className={`card-body flex-grow flex flex-col items-center text-center p-4 gap-2 ${
          theme === "dark" ? "text-gray-200" : "text-gray-700"
        }`}
      >
        <Link to={`/view-product/${encodeURIComponent(productData.name)}`}>
          <h2 className="card-title text-sm font-semibold leading-tight">
            {productData.name}
          </h2>
        </Link>
        <p className="text-lg font-bold mt-1">Rs. {productData.price}</p>
        {/* text-gray-700 */}
        <div className="card-actions w-full">
          <button className="btn btn-primary w-full" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
