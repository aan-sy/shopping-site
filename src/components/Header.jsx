import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='flex gap-x-4 text-base justify-between items-center mb-8'>
      <Link to='/'>
        <h1 className='w-60'><img src='/images/logo.png' alt='urbanic30' /></h1>
      </Link>
      <div className='flex gap-x-4 justify-end w-full md:w-28'>
        <Link to='/order/cart'>CART</Link>
        <Link to=''>LOGIN</Link>
      </div>
      <Link to='/shop' className='md:order-first md:w-28'>SHOP</Link>
    </header>
  );
}

