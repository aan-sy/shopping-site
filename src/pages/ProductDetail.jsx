import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiMinus, FiPlus  } from "react-icons/fi";
import { getProducts } from '../api/firebase';

export default function ProductDetail() {
  const { productId } = useParams();
  const {isLoading, error, data: product} = useQuery({ 
    queryKey: ['product', productId], 
    queryFn: async () => getProducts(productId),
    staleTime: 1000 * 60 * 5,
  })
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState(product && product.options && product.options[0]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  if(isLoading) {return <p>Loading...</p>}
  if(error) {return <p>error</p>}
  return (
    <section>
      {product && <figure className='flex flex-col md:flex-row gap-8 justify-center'>
        <img src={product.image} alt={product.name} className='w-full md:w-2/4 object-contain' />
        <figcaption className='w-full md:w-1/3'>
          <div className='flex flex-col gap-2 pb-6 border-b'>
            <h2 className='text-2xl'>{product.name}</h2>
            <p className='text-sm'>{`KRW ${product.price.toLocaleString('kr-KO')}`}</p>
          </div>
          <div className='py-6 flex flex-col gap-4 items-start'>
            {product.options && 
              <div className='flex gap-2'>
                <label htmlFor='option' className='w-20'>Option</label>
                <select name='option' id='option' value={selected} onChange={e => setSelected(e.target.value)} className='w-28'>
                  {product.options.map((option, i) => <option key={i} value={option}>{option}</option>)}
                </select>
              </div>
            }
            <div className='flex gap-2'>
              <label htmlFor='quantity' className='w-20'>Quantity</label>
              <button className='p-1.5' onClick={() => setCount(prev => prev - 1 < 1 ? 1 : prev - 1)} aria-label='decrease quantity'><FiMinus /></button>
              <input 
                id='quantity'
                type='number' 
                min='1' 
                value={count} 
                disabled
                className='text-center w-12 bg-transparent'
              />
              <button className='p-1.5' onClick={() => setCount(prev => prev + 1)} aria-label='increase quantity'><FiPlus /></button>
            </div>
            <button className='border border-black p-4 mt-4 w-full'>ADD TO CART</button>
          </div>
          <div className='flex flex-col gap-4 py-6'>
            <dl className='flex flex-col gap-4'>
              <dt>Detail</dt>
              <dd className='whitespace-pre-line text-sm'>
                {product.description}
              </dd>
            </dl>
          </div>
        </figcaption>
      </figure>}
    </section>
  );
}

