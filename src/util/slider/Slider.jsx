import React, { useEffect, useState } from 'react';
import './Slider.css';
import { useQuery } from '@tanstack/react-query';
import { getMainImages } from '../../api/firebase';
import { useDeviceContext } from '../../context/DeviceContext';
import Slide from './Slide';

export default function Slider() {
  const { hasTouchScreen } = useDeviceContext();
  const {isLoading, error, data: images} = useQuery({
    queryKey: ['mainImages'],
    queryFn: async () => getMainImages(),
    staleTime: 1000 * 60 * 5,
  })
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [slideCount, setSlideCount] = useState(0);
  const [prevTimeStamp, setPrevTimeStamp] = useState(null);

  const showSlide = () => {
    const result = slides.map((slide, i) => {
      if (i === currentSlide) {
        return {...slide, transform: 'translateY(0%)'}
      } else if (i === (currentSlide + 1)) {
        return {...slide, transform: 'translateY(100%)'}
      } else if (i > (currentSlide + 1)) {
        return {...slide, transform: 'translateY(200%)'}
      } else {
        return {...slide, transform: 'translateY(0%)'}
      }
    })
    setSlides(result);
  }

  useEffect(() => {
    if(images) {
      setSlideCount(images.length);
      const initialSlides = images.map((image, i) => {
        if (i === 0) {
          return {url: image, transform: 'translateY(0%)'}
        } else if (i === 1) {
          return {url: image, transform: 'translateY(100%)'}
        } else if (i > 1) {
          return {url: image, transform: 'translateY(200%)'}
        }
      })
      setSlides(initialSlides);
    }
  }, [images])

  useEffect(() => {
    slides.length !== 0 && showSlide();
  }, [currentSlide])

  const controlSpeed = (timeStamp) => {
    const diff = prevTimeStamp ? timeStamp - prevTimeStamp : null;
    setPrevTimeStamp(timeStamp);
    return !!diff && diff < 200 ? true : false;
  }

  const scrollDown = (e) => {
    if (currentSlide === (slideCount - 1)) return;
    if (!hasTouchScreen && controlSpeed(e.timeStamp)) return;
    setCurrentSlide(index => index + 1);
  }

  const scrollUp = (e) => {
    if (currentSlide === 0) return;
    if (!hasTouchScreen && controlSpeed(e.timeStamp)) return;
    setCurrentSlide(index => index - 1);
  }

  const handleWheel = (e) => {
    if (!e.deltaY) {
      return
    } else if (e.deltaY > 0) {
      scrollDown(e)
    } else {
      scrollUp(e)
    }
  }

  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const getPositionY = e => e.touches[0] ? e.touches[0].clientY : null;

  const handleTouchStart = (e) => setStartY(getPositionY(e))
  const handleTouchMove = (e) => setCurrentY(getPositionY(e))
  const handleTouchEnd = (e) => {
    if (startY === currentY) return;
    startY < currentY ? scrollUp() : scrollDown();
  } 

  if (isLoading) return <p className='fixed'>Loading...</p>
  if (error) return <p className='fixed'>Something wrong...</p>
  return (
    <ul 
      className='slider'
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {(slides.length !== 0) && slides.map((slide, i) => <Slide key={i} slide={slide} />)}
    </ul>
  );
}