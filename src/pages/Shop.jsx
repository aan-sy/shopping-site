import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Products from '../components/Products';

export default function Shop() {
  const { category } = useParams();
  
  return (
    <section >
      <nav className='flex flex-col gap-1 text-lg mb-4 text-gray-500'>
        <Link to='/shop' className='hover:text-black focus:text-black'>All</Link>
        <Link to='/shop/outer' className='hover:text-black focus:text-black'>Outer</Link>
        <Link to='/shop/top' className='hover:text-black focus:text-black'>Top</Link>
        <Link to='/shop/denim' className='hover:text-black focus:text-black'>Denim</Link>
        <Link to='/shop/accessories' className='hover:text-black focus:text-black'>Accessories</Link>
        <Link to='/shop/shoes' className='hover:text-black focus:text-black'>Shoes</Link>
      </nav>
      <Products category={category} />
    </section>
  );
}

