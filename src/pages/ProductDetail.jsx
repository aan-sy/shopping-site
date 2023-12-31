import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMinus, FiPlus  } from "react-icons/fi";

export default function ProductDetail() {
  let {name, image, price, options, category, description} = useLocation().state;
  const [count, setCount] = useState(1);
  const [selected, setSelected] = useState(options && options[0]);
  const inputRef = useRef(null);

  function handleKeyDown(e) {
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
                <select name='option' id='option' value={selected} onChange={e => setSelected(e.target.value)} className='w-28'>
                  {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
                </select>
              </div>
            }
            <div className='flex gap-2'>
              <label htmlFor='quantity' className='w-20'>Qty.</label>
              <button className='p-1.5' onClick={() => setCount(prev => prev - 1 < 1 ? 1 : prev - 1)}><FiMinus /></button>
              <input 
                id='quantity'
                type='number' 
                min='1' 
                value={count} 
                onInput={e => setCount(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className='text-center w-12'
              />
              <button className='p-1.5' onClick={() => setCount(prev => prev + 1)}><FiPlus /></button>
            </div>
            <button className='border border-black p-4 mt-4 w-full'>ADD TO CART</button>
          </div>
          <div className='flex flex-col gap-4 py-6'>
            <dl className='flex flex-col gap-4'>
              <dt>Detail</dt>
              <dd className='whitespace-pre-line text-sm'>
                {description}
              </dd>
            </dl>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

