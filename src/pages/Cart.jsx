import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';

const SHIPPING = 3000;
const dlStyle = 'flex justify-between py-2 border-b border-black';

export default function Cart() {
  const { uid } = useAuthContext();
  const {isLoading, data: cartItems} = useQuery({
    queryKey: ['cartItems'],
    queryFn: () => getCart(uid),
  })
  const hasItem = cartItems && cartItems.length > 0;

  cartItems && console.log(cartItems)

  const totalCost = cartItems && cartItems.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  if(isLoading) return <p>Loading..</p>

  return (
    <section>
      <h2 className='pb-4 text-xl border-b border-black'>CART</h2>
      {hasItem || 
        <div className='flex flex-col gap-12 items-center py-20 border-b border-black'>
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <Link to='/shop' className='border border-black w-full md:w-auto md:px-32 py-4 text-center'>BACK TO SHOP</Link>
        </div>
      }
      {hasItem && 
        <section>
          <ul>
            {cartItems.map(item => <CartItem key={item.cardId} uid={uid} item={item} />)}
          </ul>
          <dl className={`${dlStyle} text-sm text-gray-500`}>
            <dt>Order</dt>
            <dd>{totalCost.toLocaleString('kr-KO')}</dd> 
          </dl>
          <dl className={`${dlStyle} text-sm text-gray-500`}>
            <dt>Shipping</dt>
            <dd>{totalCost < 70000 ? SHIPPING.toLocaleString('kr-KO') : 0}</dd>
          </dl>
          <dl className={`${dlStyle}`}>
            <dt>Total</dt>
            <dd>{totalCost < 70000 ? (totalCost + SHIPPING).toLocaleString('kr-KO') : totalCost.toLocaleString('kr-KO')}</dd>
          </dl>
          {totalCost < 70000 && <p className='text-xs text-gray-500 mt-4'>70,000원 미만의 주문은 배송료를 청구합니다.</p>}
          <button className='border border-black w-full md:w-auto md:px-32 py-4 mt-4 md:mt-16 mx-auto block'>CHECK OUT</button>
        </section>
      }
    </section>
  );
}

