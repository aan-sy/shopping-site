import React, { useState } from 'react';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    let {name, value, files} = e.target;
    if (name === 'image') {
      setFile(files && files[0]);
      return;
    }
    setProduct(product => ({...product, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      const response = await uploadImage(file);
      const newURL = response.url;
      const _ = await addNewProduct(product, newURL);
      setIsSuccess(true);
      setTimeout(() => {setIsSuccess(false)}, 3000)
      setProduct({});
      setFile();
    } catch(e) {
      console.error(e)
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className='flex flex-col items-center'>
      <h2 className='mb-8 text-xl'>Add New Product</h2>
      <div className='flex gap-8 justify-center items-center lg:items-start flex-col lg:flex-row w-full'> 
        {file && <div className='w-auto lg:w-2/4'><img src={URL.createObjectURL(file)} alt="image" /></div>}
        <form 
          className='flex flex-col gap-4 w-full lg:w-2/4 max-w-screen-md'
          onSubmit={handleSubmit}
        >
          <input 
            type='file'
            accept='image/*'
            name='image'
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
            onChange={handleChange} 
            className='border border-gray-300 rounded-lg p-2'
          />
          <input 
            type='text'
            name='category'
            value={product.category ?? ''}
            placeholder='상품 카테고리 (outer, top, bottom, denim, accessories, shoes)'
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
          {isSuccess && <p>✔️ 등록이 완료되었습니다.</p>}
          <button className={`rounded-lg p-4 ${isUploading ? 'bg-gray-50 text-gray-300' : 'bg-gray-100'}`} disabled={isUploading}>등록</button>
        </form>
      </div>
    </section>
  );
}