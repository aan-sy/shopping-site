import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';

export default function CartState() {
  const { uid } = useAuthContext();
  const {data: cartItems} = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => getCart(uid),
  })

  return (
    <span>
      {cartItems && `(${cartItems.length})`}
    </span>
  );
}

