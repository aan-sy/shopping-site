import React from 'react';
import useCart from '../hooks/useCart';

export default function CartState() {
  const { cartQuery: {data: cartItems} } = useCart();

  return (
    <span>
      {cartItems && `(${cartItems.length})`}
    </span>
  );
}

