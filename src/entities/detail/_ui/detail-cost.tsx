'use client';
import { useAddToCart, useRemoveFromCart } from '@/features/cart/client';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { AppInputIncrement } from '@/shared/ui/app-input/app-input';
import { useState } from 'react';
import { currencyFormatter } from '@/shared/lib/currencyFormatter';
import { CartItemEntity } from '@/entities/user/client';
import { cn } from '@/shared/lib/utils';

type PriceInfoProps = {
  price: number;
  discountedPrice: number | null;
  quantityAvailable: number;
};

interface DetailAboutProps {
  id: number;
  priceInfo: PriceInfoProps;
  cartItem: CartItemEntity | null;
  className?: string;
}
const { format } = currencyFormatter;

export const DetailCost = (props: DetailAboutProps) => {
  const { id, priceInfo, cartItem, className } = props;
  const { price, discountedPrice, quantityAvailable } = priceInfo;
  const [quantity, setAmount] = useState<number>(cartItem?.quantity || 1);
  const { removeFromCart } = useRemoveFromCart({});
  const { addToCart } = useAddToCart({});
  return (
    <div className={cn('flex flex-col gap-6 col-span-2 h-full justify-end', className)}>
      <div className="font-rubik flex flex-col flex-wrap self-center gap-6 items-center max-w-80">
        <div className="flex flex-col gap-4 justify-center sm:gap-6 items-center w-full">
          <div>
            <div className="whitespace-nowrap relative inline-block">
              <span className="text-primary-foreground text-xl">
                {discountedPrice ? format(discountedPrice * (Number(quantity) || 1)) : format(price * (quantity || 1))}
              </span>
              {!!discountedPrice && (
                <s className="!text-foreground-secondary text-sm select-none absolute -top-6 left-[90%]">
                  {format(price * (Number(quantity) || 1))}
                </s>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
            <AppInputIncrement
              min={cartItem ? 0 : 1}
              max={quantityAvailable}
              onBlur={(value) => {
                if (value < 1) {
                  if (cartItem) return removeFromCart(cartItem.id);
                }
              }}
              onDecrement={(value) => {
                if (value < 1 && cartItem) {
                  removeFromCart(cartItem.id);
                  return setAmount(1);
                }
              }}
              onChange={(value) => {
                setAmount(value as number);
              }}
              value={quantity}
            />
            <AppButton
              onClick={() => (cartItem ? removeFromCart(cartItem.id) : addToCart({ detailId: id, quantity: quantity }))}
              fullWidth
              className="h-10"
              variant={cartItem ? 'destructive' : 'background'}>
              {cartItem ? 'Удалить из корзины' : 'Добавить в корзину'}
            </AppButton>
          </div>
        </div>
      </div>
      <span className="text-sm text-gray-500 select-none">В наличии: {quantityAvailable}</span>
    </div>
  );
};
