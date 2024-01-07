import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiMinus, FiPlus  } from "react-icons/fi";
import useProduct from '../hooks/useProduct';
import AddToCart from '../components/AddToCart';

export default function ProductDetail() {
  const { productId } = useParams();
  const { productQuery } = useProduct();
  const {isLoading, error, data: product} = productQuery(productId);
  const [selectedProduct, setSelectedProduct] = useState({quantity: 1, option: ''});

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  useEffect(() => {
    if (product) {
      const {id, name, image, price} = product;
      setSelectedProduct({id, name, image, price, quantity: 1, option: product.options ? product.options[0] : ''})
    }
  }, [product])

  const handleMinus = () => {setSelectedProduct(product => ({...product, quantity: (product.quantity - 1) < 1 ? 1 : product.quantity - 1}))}
  const handlePlus = () => {setSelectedProduct(product => ({...product, quantity: product.quantity + 1}))}
  const handleChangeOption = (e) => {setSelectedProduct(product => ({...product, option: e.target.value}))}

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
                <select name='option' id='option' value={selectedProduct.option} onChange={handleChangeOption} className='w-28'>
                  {product.options.map((option, i) => <option key={i} value={option}>{option}</option>)}
                </select>
              </div>
            }
            <div className='flex gap-2'>
              <label htmlFor='quantity' className='w-20'>Quantity</label>
              <button className='p-1.5' onClick={handleMinus} aria-label='minus quantity'><FiMinus /></button>
              <input 
                id='quantity'
                type='number' 
                min='1' 
                value={selectedProduct.quantity} 
                disabled
                className='text-center w-12 bg-transparent'
              />
              <button className='p-1.5' onClick={handlePlus} aria-label='plus quantity'><FiPlus /></button>
            </div>
            <AddToCart selectedProduct={selectedProduct} />
          </div>
          <div className='flex flex-col gap-4 py-6'>
            <dl className='flex flex-col gap-4'>
              <dt>Detail</dt>
              <dd className='whitespace-pre-line break-all text-sm'>
                {product.description}
              </dd>
            </dl>
          </div>
        </figcaption>
      </figure>}
    </section>
  );
}

