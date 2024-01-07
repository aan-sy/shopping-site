import React from 'react';
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import useCart from '../hooks/useCart';

export default function CartItem({ item }) {
  const {image, name, price, option, quantity, cartId} = item;
  const { addOrUpdateCart, removeCartItem } = useCart();
  
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateCart.mutate({...item, quantity: quantity - 1})
  }
  const handlePlus = () => {addOrUpdateCart.mutate({...item, quantity: quantity + 1})}
  const handleDelete = () => {removeCartItem.mutate({ cartId })}

  return (
    <li className='py-8 border-b border-black flex justify-between gap-8'>
      <figure className='flex items-center gap-4 w-full'>
        <img src={image} alt={name} className='w-32' />
        <figcaption className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full'>
          <div className='flex flex-col gap-1 text-sm md:text-base grow'>
            <p>{name}</p>
            <p>KRW {price.toLocaleString('kr-KO')}</p>
            {option && <p>{`option: ${option}`}</p>}
          </div>
          <div className='flex gap-6'>
            <button onClick={handleMinus}><FiMinus /></button>
            <span>{quantity}</span>
            <button onClick={handlePlus}><FiPlus /></button>
          </div>
          <p className='w-32 text-left md:text-right'>KRW {(price * quantity).toLocaleString('kr-KO')}</p>
        </figcaption>
      </figure>
      <button className='self-start md:self-center text-2xl' onClick={handleDelete}><FiX /></button>
    </li>
  );
}

