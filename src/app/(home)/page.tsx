'use client';
import { AppSwiper, Slide } from '@shared/ui/app-swiper/app-swiper';
import Image from 'next/image';
import ShopImage from '@assets/images/store-image.jpg';
import { Header, HeaderLink } from '@widgets/header/header';
import HomeBackgroundImage from '@assets/images/home-bg.jpg';
import { useState } from 'react';
import { routes } from '@/shared/config/routes';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const headerLinks: HeaderLink[] = [
    {
      item: 'Магазин',
      link: routes.navbarRoutes.main.href,
    },
    {
      item: 'Контакты',
      link: routes.navbarRoutes.contacts.href,
    },
    {
      item: 'О нас',
      link: routes.navbarRoutes.about.href,
    },
  ];

  const slides: Slide[] = [
    {
      slide: (
        <a
          className={'h-full w-full'}
          href={routes.navbarRoutes.main.href}>
          <Image
            src={ShopImage}
            alt={'Магазин'}
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
    <main className="flex bg-transparent flex-col h-full">
      <Header
        headerLinks={headerLinks}
        activeIndex={activeIndex}
      />
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
