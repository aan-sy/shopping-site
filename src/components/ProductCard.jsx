import React from 'react';

export default function ProductCard({ product }) {
  let {id, image, name, price} = product;

  return (
    <li className='flex flex-col gap-2'>
      <img src={image} alt={name} />
      <div>
        <p>{name}</p>
        <p>{`₩${price.toLocaleString('kr-KO')}`}</p>
      </div>
    </li>
  );
}

