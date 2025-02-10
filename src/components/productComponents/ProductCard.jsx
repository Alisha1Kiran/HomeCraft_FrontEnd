import React from "react";
import { Link } from "react-router-dom";
import { Eye, Heart } from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import getGuestId from "../../utils/getGuestId";
import showToaster from "../../utils/showToaster";

const ProductCard = ({ productData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Cheking User from auth

  const handleAddToCart = () => {
    const user_id = user ? user._id : null;
    const guest_id = !user ? getGuestId() : null;

    console.log("User id: ", user_id);
    console.log("Guest id: ", guest_id);

    dispatch(
      addToCart({ user_id, product_id: productData._id, quantity: 1, guest_id })
    );
  };

  const handleWishlistClick = (event) => {
    event.stopPropagation(); // Prevents navigation
    event.preventDefault(); // Prevents link default behavior
    !user && showToaster();
  };

  return (
    <div className="card glass w-64 h-[350px] shadow-xl flex flex-col z-10">
      {/* Image Section */}
      <Link to={`/view-product/${productData.name}`}>
      <figure className="h-[180px] relative">
        <img
          src={productData.images[0].url}
          alt={productData.name}
          className="rounded-xl w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button>
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={handleWishlistClick}>
            <Heart className="w-5 h-5 text-red-500 cursor-pointer" />
          </button>
        </div>
      </figure>
      </Link>

      {/* Card Body */}
      <div className="card-body flex-grow flex flex-col items-center text-center p-4 gap-2">
      <Link to={`/view-product/${encodeURIComponent(productData.name)}`}>
        <h2 className="card-title text-sm font-semibold leading-tight">
          {productData.name}
        </h2>
      </Link>
        <p className="text-lg font-bold mt-1">{productData.price}/-</p>
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
