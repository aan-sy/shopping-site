import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from '../components/ProductCard';

const linkStyle = 'w-40 hover:text-black focus:text-black';

export default function Shop() {
  const { category } = useParams();
  const [isAll, setIsAll] = useState(true);
  const {isLoading, error, data: products} = useQuery({ 
    queryKey: ['products'], 
    queryFn: async () => getProducts(),
    staleTime: 1000 * 60 * 5,
  })
  function handleClick(e) {
    if (e.target.localName !== 'a') return;
    e.target.innerText === 'ALL' ? setIsAll(true) : setIsAll(false);
  }

  if (isLoading) {return <p>Loading...</p>}
  if (error) {console.log(console.error(error))}
  return (
    <section >
      <nav className='flex flex-col gap-1 text-lg mb-4 text-gray-400' onClick={handleClick}>
        <Link to='/shop' className={`${linkStyle} ${isAll ? 'text-black' : 'text-gray-400'}`}>All</Link>
        <Link to='/shop/outer'className={linkStyle}>Outer</Link>
        <Link to='/shop/top' className={linkStyle}>Top</Link>
        <Link to='/shop/bottom' className={linkStyle}>Bottom</Link>
        <Link to='/shop/denim' className={linkStyle}>Denim</Link>
        <Link to='/shop/accessories' className={linkStyle}>Accessories</Link>
        <Link to='/shop/shoes' className={linkStyle}>Shoes</Link>
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

