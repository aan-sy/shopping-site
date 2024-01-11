import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';

const SHIPPING = 3000;
const dlStyle = 'flex justify-between py-2 border-b border-black';

export default function Cart() {
  const { cartQuery: {isLoading, data: cartItems} } = useCart();
  const hasItem = cartItems && cartItems.length > 0;

  const totalPrice = cartItems && cartItems.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  if(isLoading) return <p>Loading..</p>

  return (
    <section>
      <h2 className='pb-4 text-xl border-b border-black'>CART</h2>
      {hasItem || 
        <div className='flex flex-col gap-12 items-center py-20'>
          <p>장바구니에 담긴 상품이 없습니다.</p>
        </div>
      }
      {hasItem && 
        <section>
          <ul>
            {cartItems.map(item => <CartItem key={item.cartId} item={item} />)}
          </ul>
          <dl className={`${dlStyle} text-sm text-gray-500`}>
            <dt>Order</dt>
            <dd>{totalPrice.toLocaleString('kr-KO')}</dd> 
          </dl>
          <dl className={`${dlStyle} text-sm text-gray-500`}>
            <dt>Shipping</dt>
            <dd>{totalPrice < 70000 ? SHIPPING.toLocaleString('kr-KO') : 0}</dd>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt>Total</dt>
            <dd>{totalPrice < 70000 ? (totalPrice + SHIPPING).toLocaleString('kr-KO') : totalPrice.toLocaleString('kr-KO')}</dd>
          </dl>
          {totalPrice < 70000 && <p className='text-xs text-gray-500 mt-4'>70,000원 미만의 주문은 배송료를 청구합니다.</p>}
          <button className='border border-black w-full md:w-[30rem] md:px-32 py-4 mt-4 md:mt-16 mx-auto block'>CHECK OUT</button>
        </section>
      }
      <Link to='/shop' className='border border-black w-full md:w-[30rem] md:px-32 py-4 mt-4 mx-auto block text-center'>BACK TO SHOP</Link>
    </section>
  );
}

