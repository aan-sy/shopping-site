import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products({ category }) {
  const {isLoading, error, data: products} = useQuery({ 
    queryKey: ['products'], 
    queryFn: async () => getProducts(),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {return <p>Loading...</p>}
  if (error) {console.log(console.error(error));
  }

  return (
    <>
      {products && <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          !category ? 
            products.map(product => <ProductCard key={product.id} product={product} />) :
            products.filter(product => product.category === category).map(product => <ProductCard key={product.id} product={product} />)
        }
      </ul>}
    </>
  );
}

