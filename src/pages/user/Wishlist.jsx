import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchWishlist } from '../../redux/slices/wishlistSlice';
import ProductCard from '../../components/productComponents/ProductCard';
import Loading from './../../components/sharedComponents/Loading';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
      dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
      <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
          {items.length === 0 ? (
              <p>No items in wishlist</p>
          ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {items.map((product) => (
                      <ProductCard key={product?._id} productData={product} />
                  ))}
              </div>
          )}
      </div>
  );
};



export default Wishlist