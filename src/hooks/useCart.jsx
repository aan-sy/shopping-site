import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCart, addOrUpdateToCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { uid } = useAuthContext();
  const cartQuery = useQuery({
    queryKey: ['cartItems', uid || ''],
    queryFn: async () => getCart(uid),
    enabled: !!uid
  })

  const queryClient = useQueryClient();
  const addOrUpdateCart = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems', uid]);
    },
  })

  const removeCartItem = useMutation({
    mutationFn: ({ cartId }) => removeFromCart(uid, cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems', uid]);
    },
  })

  return { cartQuery, addOrUpdateCart, removeCartItem }
}

