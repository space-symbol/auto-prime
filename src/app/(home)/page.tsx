'use client';
import { AppSwiper, Slide } from '@shared/ui/app-swiper/app-swiper';
import Image from 'next/image';
import ShopImage from '@assets/images/store-image.jpg';
import { Header } from '@widgets/header/header';
import HomeBackgroundImage from '@assets/images/home-bg.jpg';
import { useState } from 'react';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: Slide[] = [
    {
      slide: (
        <a
          className={'h-full w-full'}
          href={'/store'}>
          <Image
            src={ShopImage}
            alt={'store'}
            priority
          />
        </a>
      ),
    },
    {
      slide: (
        <Image
          src={ShopImage}
          alt={'store'}
          priority
        />
      ),
    },
    {
      slide: (
        <Image
          src={ShopImage}
          alt={'store'}
          priority
        />
      ),
    },
  ];

  const onSlideChange = (activeIndex: number) => {
    setActiveIndex(activeIndex);
  };

  return (
    <main className="flex bg-black bg-opacity-30 flex-col h-full">
      <Header activeIndex={activeIndex} />
      <AppSwiper
        onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
        className={'flex-grow'}
        slides={slides}
      />
      <Image
        className={'absolute top-0 left-0 z-[-1] object-cover'}
        src={HomeBackgroundImage}
        alt={''}
        priority
      />
    </main>
  );
};

export default HomePage;
