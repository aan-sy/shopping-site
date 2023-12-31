import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetail() {
  let {name, image, price, options, category, description} = useLocation().state;
  const [count, setCount] = useState(1);

  function handleKeyDown (e) {
    if ((e.target.value === '' && Number(e.key) < 1) || '.-+'.includes(e.key)) {
      e.preventDefault();      
      setCount(1);
    } 
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  return (
    <section>
      <figure className='flex flex-col md:flex-row gap-8 justify-center'>
        <img src={image} alt={name} className='w-full md:w-2/4 object-contain' />
        <figcaption className='w-full md:w-1/3'>
          <div className='flex flex-col gap-2 pb-6 border-b'>
            <h2 className='text-2xl'>{name}</h2>
            <p className='text-sm'>{`KRW ${price.toLocaleString('kr-KO')}`}</p>
          </div>
          <div className='py-6 flex flex-col gap-4 items-start'>
            {options && 
              <div className='flex gap-2'>
                <label htmlFor='option' className='w-20'>Option</label>
                <select name='option' id='option'>
                  {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
                </select>
              </div>
            }
            <div className='flex gap-2'>
              <label htmlFor='quantity' className='w-20'>Qty.</label>
              <input 
                id='quantity'
                type='number' 
                min='1' 
                value={count} 
                onInput={e => setCount(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className='border border-black p-4 mt-4 w-full'>ADD TO CART</button>
          </div>
          <div className='flex flex-col gap-4 py-6'>
            <dl className='flex flex-col gap-4'>
              <dt>Detail</dt>
              <dd className='whitespace-pre-line'>
                {description}
              </dd>
            </dl>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

