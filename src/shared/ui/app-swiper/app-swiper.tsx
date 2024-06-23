import { ReactNode } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { cn } from '@/shared/lib/utils';
import cls from './app-swiper.module.css';
import 'swiper/css';
import { useSwiper } from 'swiper/react';
import ArrowIcon from '@assets/icons/arrow.svg';

interface SwiperButtonProps {
  direction?: 'left' | 'right';
  className?: string;
}

export const SwiperButton = (props: SwiperButtonProps) => {
  const { direction = 'left', className } = props;
  const swiper = useSwiper();
  const onClick = () => {
    direction === 'right' ? swiper.slideNext() : swiper.slidePrev();
    swiper.update();
  };

  return (
    <button
      className={cn(cls.swiperButton, className, {
        [cls.right]: direction === 'right',
      })}
      onClick={onClick}>
      <ArrowIcon className={cls.arrow} />
    </button>
  );
};

interface AppSwiperProps {
  className?: string;
  slides: ReactNode[];
  onSlideChange?: (swiper: SwiperClass) => void;
  activeIndex?: number;
}

export const AppSwiper = (props: AppSwiperProps) => {
  const { className, slides, activeIndex, onSlideChange } = props;

  return (
    <Swiper
      className={cn(cls.appSwiper, className)}
      slidesPerView={1}
      spaceBetween={-1}
      modules={[Pagination]}
      pagination={{
        clickable: true,
        horizontalClass: cls.pagination,
        renderBullet: (index, bulletClassname) => {
          if (slides.length === 1) {
            return `<button class="${cls.bullet} ${bulletClassname} ${cls.singleBullet}"></button>`;
          }
          if (index === 0) {
            return `<button class="${cls.bullet} ${bulletClassname} ${cls.firstBullet}"></button>`;
          } else if (index === slides.length - 1) {
            return `<button class="${cls.bullet} ${bulletClassname} ${cls.lastBullet}"></button>`;
          } else {
            return `<button class="${cls.bullet} ${bulletClassname} ${cls.middleBullet}"></button>`;
          }
        },
        bulletActiveClass: cls.activeBullet,
      }}
      loop
      initialSlide={activeIndex || 0}
      onSlideChange={onSlideChange}>
      {slides.length > 1 && <SwiperButton />}
      {slides.map((slide: ReactNode, index) => (
        <SwiperSlide
          className={cls.swiperSlide}
          key={index}>
          {slide}
        </SwiperSlide>
      ))}
      {slides.length > 1 && <SwiperButton direction="right" />}
    </Swiper>
  );
};
