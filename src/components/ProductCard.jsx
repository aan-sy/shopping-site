import React from 'react';
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  let {id, image, name, price} = product;

  return (
    <Link to={`/shop/detail/${id}`} state={product}>
      <li className='flex flex-col gap-2'>
        <img src={image} alt={name} />
        <div>
          <p>{name}</p>
          <p>{`KRW ${price.toLocaleString('kr-KO')}`}</p>
        </div>
      </li>
    </Link>

  );
}

