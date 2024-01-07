import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import { addNewProduct } from '../api/firebase';

export default function useProduct() {
  const productListQuery = useQuery({ 
    queryKey: ['products'], 
    queryFn: async () => getProducts(),
    staleTime: 1000 * 60 * 5,
  })

  const productQuery = (productId) => useQuery({ 
    queryKey: ['product', productId], 
    queryFn: async () => getProducts(productId),
    staleTime: 1000 * 60 * 5,
  })

  const queryClient = useQueryClient();
  const addProduct = useMutation({
    mutationFn: ({product, url}) => addNewProduct(product, url),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  })

  return { productListQuery, productQuery, addProduct }
}

