import React from 'react';
import { useParams } from 'react-router-dom';

export default function Shop() {
  const { category } = useParams();

  return (
    <section>
      상품 목록
      <p>{category}</p>
    </section>
  );
}

