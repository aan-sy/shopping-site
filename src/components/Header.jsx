import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className='mb-8'>
      <nav className='flex flex-wrap md:flex-nowrap gap-4 justify-start md:justify-between items-center text-base'>
        <Link to='/' className='w-full md:w-auto'>
          <h1 className='w-60'><img src='/images/logo.png' alt='urbanic30' /></h1>
        </Link>
        <div className='md:order-first flex gap-x-4 justify-end md:justify-start md:w-64'>
          <Link to='/shop'>SHOP</Link>
          <Link to='/shop/new'>ADD NEW</Link>
        </div>
        <div className='flex gap-x-4 justify-end md:w-64'>
          <button>LOGIN</button>
          <Link to='/order/cart'>CART</Link>
        </div>
      </nav>
    </header>
  );
}

