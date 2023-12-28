import React, { useState } from 'react';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();

  const handleChange = (e) => {
    let {name, value, files} = e.target;

    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }

    value = (name !== 'options') ? value : value.split(',');
    setProduct(product => ({...product, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className='flex flex-col items-center'>
      <h2 className='mb-8 text-xl'>Add New Product</h2>
      <div className='flex gap-8 justify-center flex-col md:flex-row w-full'> 
        {file && <div className='border w-full md:w-2/4'><img src={URL.createObjectURL(file)} alt="image" /></div>}
        <form 
          className='flex flex-col gap-4 w-full md:w-2/4 max-w-screen-md'
          onSubmit={handleSubmit}
        >
          <input 
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange} 
            className='border border-gray-300 rounded-lg p-2'
          />
          <input 
            type='text'
            name='name'
            value={product.name ?? ''}
            placeholder='상품 이름'
            required
            onChange={handleChange} 
            className='border border-gray-300 rounded-lg p-2'
          />
          <input 
            type='number'
            name='price'
            value={product.price ?? ''}
            placeholder='상품 가격'
            required
            onChange={handleChange} 
            className='border border-gray-300 rounded-lg p-2'
          />
          <input 
            type='text'
            name='options'
            value={product.options ?? ''}
            placeholder='상품 옵션 (쉼표(,)로 구분)'
            required
            onChange={handleChange} 
            className='border border-gray-300 rounded-lg p-2'
          />
          <textarea 
            name='description' 
            cols='30' rows='10' 
            value={product.description ?? ''}
            placeholder='상품 설명' 
            required
            onChange={handleChange}
            className='border border-gray-300 rounded-lg p-2'
          />
          <button className='bg-gray-100 rounded-lg p-4'>등록</button>
        </form>
      </div>
    </section>
  );
}