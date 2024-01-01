import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const { category } = useParams();
  const {isLoading, error, data: products} = useQuery({ 
    queryKey: ['products'], 
    queryFn: async () => getProducts(),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {return <p>Loading...</p>}
  if (error) {console.log(console.error(error))}
  return (
    <section >
      <nav className='flex flex-col gap-1 text-lg mb-4 text-gray-500'>
        <Link to='/shop' className='hover:text-black focus:text-black'>All</Link>
        <Link to='/shop/outer' className='hover:text-black focus:text-black'>Outer</Link>
        <Link to='/shop/top' className='hover:text-black focus:text-black'>Top</Link>
        <Link to='/shop/bottom' className='hover:text-black focus:text-black'>Bottom</Link>
        <Link to='/shop/denim' className='hover:text-black focus:text-black'>Denim</Link>
        <Link to='/shop/accessories' className='hover:text-black focus:text-black'>Accessories</Link>
        <Link to='/shop/shoes' className='hover:text-black focus:text-black'>Shoes</Link>
      </nav>
      {products && <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          !category ? 
            products.map(product => <ProductCard key={product.id} product={product} />) :
            products.filter(product => product.category === category).map(product => <ProductCard key={product.id} product={product} />)
        }
      </ul>}
    </section>
  );
}

