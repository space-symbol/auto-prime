'use client';
import { AppSwiper } from '@shared/ui/app-swiper/app-swiper';
import Image from 'next/image';
import ShopImage from '@assets/images/store-image.jpg';
import { Header } from '@widgets/header/header';
import HomeBackgroundImage from '@assets/images/home-bg.jpg';
import { useState } from 'react';
import { routes } from '@/shared/config/routes';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = (activeIndex: number) => {
    setActiveIndex(activeIndex);
  };
  const headerLinks = Object.entries(routes.navbarRoutes).filter(([_, link]) => link.fullPath !== '/');

  return (
    <main className="flex bg-transparent flex-col h-full">
      <Header
        headerLinks={headerLinks.map(([_, link]) => ({
          item: link.linkText,
          link: link.href,
        }))}
        activeIndex={activeIndex}
      />
      <AppSwiper
        onSlideChange={(swiper) => onSlideChange(swiper.realIndex)}
        className={'flex-grow'}
        slides={headerLinks.map(([_, link]) => (
          <a
            key={link.href}
            className={'h-full w-full'}
            href={link.fullPath}>
            <Image
              src={ShopImage}
              alt={link.linkText}
              priority
            />
          </a>
        ))}
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
