import React from 'react';

export default function Slide({ slide }) {
  const {url, transform} = slide;
  return (
    <li className='slide' style={{transform}}>
      <img className='slide__image' src={url} alt='fall winter collection' />
    </li>
  );
}

