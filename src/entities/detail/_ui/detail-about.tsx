'use client';
import classNames from 'classnames';
import { DetailEntity } from '../client';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { useState } from 'react';
import { AppInputIncrement } from '@/shared/ui/app-input/app-input';
import { currencyFormatter } from '@/shared/lib/currencyFormatter';
import { useAddToCart, useRemoveFromCart } from '@/features/cart/server';
import { toast } from '@/shared/ui/use-toast';
import { useGetUserCart } from '@/entities/user/_queries';

interface DetailAboutProps {
  className?: string;
  detail: DetailEntity;
}

export const DetailAbout = ({ className, detail }: DetailAboutProps) => {
  const {
    name,
    description,
    price,
    images,
    discountPercentage,
    discountEndDate,
    quantityAvailable,
    priceAfterDiscount,
  } = detail;
  const [quantity, setAmount] = useState(1);
  const { cart } = useGetUserCart();
  const { removeFromCart } = useRemoveFromCart({});

  const { addToCart } = useAddToCart({
    onSuccess: () => {
      toast({
        title: 'Товар добавлен в корзину',
        description: `Товар "${name}" добавлен в корзину`,
        variant: 'success',
      });
    },
    onError: (error) => {
      toast({
        title: 'Произошла ошибка',
        description: error.message,
        variant: 'warning',
      });
    },
  });
  const { format } = currencyFormatter;
  const isInCart = cart?.some((item) => item.id === detail.id);
  return (
    <div className={cn(classNames('flex flex-col gap-6 pb-10', className))}>
      <h1>{name}</h1>
      <div className="flex flex-col grid-rows-2 grid-flow-row gap-6 md:grid-rows-1 md:grid md:grid-cols-5">
        <Image
          className="w-auto md:h-96 object-cover col-span-3 rounded-sm aspect-auto place-self-center"
          src={images[0]}
          width={1920}
          height={1080}
          alt={detail.name}
        />
        <div className="flex flex-col gap-6 col-span-2 justify-end">
          <div className="font-rubik flex flex-col gap-4 items-center">
            <div className="font-rubik flex flex-col items-center md:items-start">
              <div className="flex gap-2 whitespace-nowrap items-start w-full text-xl">
                {discountPercentage > 0 ? (
                  <>
                    <span className="text-accent">{format(priceAfterDiscount * (quantity || 1))}</span>
                    <s className="text-foreground-secondary text-base select-none">{format(price * (quantity || 1))}</s>
                  </>
                ) : (
                  <span className="text-accent">{format(price * (quantity || 1))}</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <AppInputIncrement
                className="!w-44"
                min={isInCart ? 0 : 1}
                max={quantityAvailable}
                onBlur={(value) => {
                  if (value < 1) {
                    if (isInCart) {
                      removeFromCart(detail.id);
                    }
                    return setAmount(1);
                  }
                }}
                onDecrement={(value) => {
                  if (value < 1 && isInCart) {
                    removeFromCart(detail.id);
                    return setAmount(1);
                  }
                }}
                onChange={(value) => {
                  setAmount(value);
                }}
                value={quantity}
              />
              {!isInCart ? (
                <AppButton
                  onClick={() => addToCart({ detailId: detail.id, quantity: quantity })}
                  fullWidth
                  variant="background">
                  В корзину
                </AppButton>
              ) : null}
            </div>
          </div>
          <span className="text-xs text-gray-500 select-none">В наличии: {detail.quantityAvailable}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6 justify-between h-full">
        <section className="flex font-rubik flex-col gap-2 self-start">
          <h2>Описание</h2>
          <p>{description}</p>
        </section>
      </div>
    </div>
  );
};
