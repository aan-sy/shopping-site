import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import useCart from '../hooks/useCart';

export default function AddToCart({ selectedProduct }) {
  const { uid, login } = useAuthContext();
  const { addOrUpdateCart } = useCart();
  const handleAddToCart = () => {uid ? addOrUpdateCart.mutate(selectedProduct) : login();}

  return (
    <button className='border border-black p-4 mt-4 w-full' onClick={handleAddToCart}>ADD TO CART</button>
  );
}

