import Image from 'next/image';
import { useCartContext } from './cart-provider';
import { currencyFormatter } from '@/shared/lib/currencyFormatter';
import { AppInputIncrement } from '@/shared/ui/app-input/app-input';
import Link from 'next/link';
import { CartItemEntity } from '@/entities/user/_domain/types';
import { useState } from 'react';
import { debounce } from 'lodash-es';
import { useRemoveFromCart } from '../server';

interface CartItemProps {
  cart: CartItemEntity;
}
const debouncedSetQuantity = debounce((value) => {});
export const CartItem = ({ cart }: CartItemProps) => {
  const { discountEndDate, discountPercentage, id, images, name, price, quantityAvailable, priceAfterDiscount } = cart;
  const [quantity, setQuantity] = useState(cart.quantity);
  const { removeFromCart } = useRemoveFromCart({});

  const { setIsOpen } = useCartContext();
  const { format } = currencyFormatter;

  return (
    <div className="grid grid-cols-4 grid-rows-6 h-40 w-full gap-2">
      <Link
        onClick={() => setIsOpen(false)}
        href={`/store/main/${id}`}
        className="flex gap-4 col-span-full row-span-4">
        <div className="w-full flex-shrink-0 basis-2/4 h-full">
          <Image
            className="w-full h-full object-contain rounded-sm"
            src={images[0]}
            width={100}
            height={100}
            alt={name}
          />
        </div>
        <h3 className="text-sm relative overflow-hidden">
          <span className="absolute w-full h-1/3 bg-gradient-to-t from-card to-transparent bottom-0" />
          {name}
        </h3>
      </Link>
      <div className="flex flex-col whitespace-nowrap col-span-2 row-span-2 col-start-1 pl-4">
        {discountPercentage ? (
          <>
            <div className={'text-accent text-base'}>{format(priceAfterDiscount * (quantity || 1))}</div>
            <s className={'text-sm text-gray-500'}>{format(price * (quantity || 1))}</s>
          </>
        ) : (
          <div className={'text-accent'}>{format(price * (quantity || 1))}</div>
        )}
      </div>
      <AppInputIncrement
        min={0}
        onDecrement={(value) => {
          if (value < 1) {
            return removeFromCart(id);
          }
        }}
        onChange={(value) => {
          setQuantity(value);
          debouncedSetQuantity(value);
        }}
        onBlur={(value) => {
          if (value < 1) {
            removeFromCart(id);
          }
        }}
        max={quantityAvailable}
        className="text-base h-8 col-start-3 row-span-2 col-span-2"
        value={quantity}
      />
    </div>
  );
};
