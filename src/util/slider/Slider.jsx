import React, { useEffect, useState } from 'react';
import './Slider.css';
import { useQuery } from '@tanstack/react-query';
import { getMainImages } from '../../api/firebase';
import { useDeviceContext } from '../../context/DeviceContext';
import Slide from './Slide';

export default function Slider() {
  // Global State
  const { hasTouchScreen } = useDeviceContext();
  // Async Data - Main Image URLs
  const {isLoading, error, data: images} = useQuery({
    queryKey: ['mainImages'],
    queryFn: async () => getMainImages(),
    staleTime: 1000 * 60 * 5,
  })
  // 화면에 보여질 슬라이드의 인덱스
  const [currentSlide, setCurrentSlide] = useState(0);
  // 화면에 렌더링될 슬라이드들의 정보
  const [slides, setSlides] = useState([]);
  // 마지막 슬라이드에서 다음 슬라이드로 넘어가지 않기 위한 조건 값
  const [slideCount, setSlideCount] = useState(0);
  // PC에서 wheel 이벤트가 빠르게 연속 발생할 때, 발생된 이벤트 사이의 시간 간격 계산에 사용 (슬라이드 속도 조절)
  const [prevTimeStamp, setPrevTimeStamp] = useState(null);

  // currentSlide가 변경되면, transfrom 값 변경해서 slides에 반영
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
    console.log('showSlide 호출됨 :', result)
    setSlides(result);
  }

  // 먼저 컴포넌트가 mount 되면, images 배열을 받아오고, slides의 기본 값 세팅
  useEffect(() => {
    images || console.log('mount!');
    images && console.log('images 받아옴')
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
      console.log('slides 상태에 반영할 기본값',initialSlides)
      setSlides(initialSlides);
    }
  }, [images])

  // 커포넌트가 mount 되고, images를 받아와서 slides에 반영되지 않았다면 -> showSlide 호출 X
  // currentSlide가 변경되면 호출됨 -> showSlide 호출
  useEffect(() => {
    slides.length !== 0 && console.log(`currentSlide는 ${currentSlide}`);
    slides.length !== 0 && showSlide();
  }, [currentSlide])

  // PC - wheel event, MO - touch event가 발생할 때마다 호출 (빠르고 많이 호출) -> 특히 PC에서는 이벤트 간 발생 속도 차이가 200보다 작은 경우 슬라이드 인덱스 변경을 하지 않는다.
  const controlSpeed = (timeStamp) => {
    const diff = prevTimeStamp ? timeStamp - prevTimeStamp : null;
    setPrevTimeStamp(timeStamp);
    return !!diff && diff < 200 ? true : false;
  }

  // 화면이 아래로 가는 모션일 때, currentSlide를 1씩 늘린다.
  const scrollDown = (e) => {
    if (currentSlide === (slideCount - 1)) return;
    if (!hasTouchScreen && controlSpeed(e.timeStamp)) return;
    setCurrentSlide(index => index + 1);
  }

  // 화면이 위로 가는 모션일 때, currentSlide를 1씩 줄인다.
  const scrollUp = (e) => {
    if (currentSlide === 0) return;
    if (!hasTouchScreen && controlSpeed(e.timeStamp)) return;
    setCurrentSlide(index => index - 1);
  }

  // PC 스크롤 방향 감지
  const handleWheel = (e) => {
    if (!e.deltaY) {
      return
    } else if (e.deltaY > 0) {
      scrollDown(e)
    } else {
      scrollUp(e)
    }
  }

  // MO 스크롤 방향 감지
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