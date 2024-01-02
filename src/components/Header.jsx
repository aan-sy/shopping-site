import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import User from './User';

export default function Header() {
  const { user, login, logout } = useAuthContext();
  const [count, setCount] = useState(0);
  
  return (
    <header className='mb-12'>
      <nav className='flex flex-wrap lg:flex-nowrap gap-4 justify-start lg:justify-between items-center text-base'>
        <Link to='/' className='w-full lg:w-auto'>
          <h1 className='w-60'><img src='/images/logo.png' alt='urbanic30' /></h1>
        </Link>
        <div className='lg:order-first flex gap-x-4 justify-end lg:justify-start lg:w-64'>
          <Link to='/shop'>SHOP</Link>
          {user && user.isAdmin && <Link to='/shop/newProduct'>ADD NEW</Link>}
        </div>
        <div className='flex gap-x-4 justify-end lg:w-64'>
          <Link to='/order/cart'>CART {<span>{`(${count})`}</span>}</Link>
          {!user && <button onClick={login}>LOGIN</button>}
          {user && <button onClick={logout}>LOGOUT</button>}
          {user && <User user={user} />}
        </div>
      </nav>
    </header>
  );
}