import Image from 'next/image';
import { useCartContext } from './cart-provider';
import { currencyFormatter } from '@/shared/lib/currencyFormatter';
import { AppInputIncrement } from '@/shared/ui/app-input/app-input';
import Link from 'next/link';
import { useState } from 'react';
import { debounce } from 'lodash-es';
import { CartItemWithDetail } from '../_domain/types';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { useRemoveFromCart } from '../_vm/use-remove-from-cart';

interface CartItemProps {
  item: CartItemWithDetail;
  onChange?: (price: number) => void;
  onRemove?: () => void;
}

const debouncedSetQuantity = debounce((value) => {});
export const CartItemDetail = ({ item, onChange, onRemove }: CartItemProps) => {
  const { detail } = item;
  const [quantity, setQuantity] = useState(item.quantity);
  const { removeFromCart } = useRemoveFromCart({});
  const { setIsOpen } = useCartContext();
  const { format } = currencyFormatter;

  return (
    <div className="grid grid-cols-10 grid-rows-6 h-40 w-full gap-2">
      <Link
        onClick={() => setIsOpen(false)}
        href={`/store/main/${detail.id}`}
        className="flex gap-4 col-span-full row-span-4">
        <div className="w-full flex-shrink-0 flex justify-center basis-2/4 h-full">
          <Image
            className="w-auto h-full object-cover inline-block rounded"
            src={detail.images[0]}
            height={100}
            width={100}
            alt={detail.name}
          />
        </div>
        <div className="text-sm flex flex-col gap-1 relative overflow-hidden">
          <span className="absolute w-full h-1/3 bg-gradient-to-t from-card to-transparent bottom-0" />
          <h3>{detail.name}</h3>
          <p>{detail.description}</p>
        </div>
      </Link>
      <div className="flex flex-col whitespace-nowrap col-span-4 row-span-2 col-start-1 pl-4">
        {detail.discountedPrice ? (
          <>
            <div className={'text-accent text-base'}>{format(detail.discountedPrice * (quantity || 1))}</div>
            <s className={'text-sm text-gray-500'}>{format(detail.price * (quantity || 1))}</s>
          </>
        ) : (
          <div className={'text-accent'}>{format(detail.price * (quantity || 1))}</div>
        )}
        <span className="text-sm">В наличии: {detail.quantityAvailable}</span>
      </div>
      <div className="flex flex-col justify-center row-span-2 col-span-3 col-start-6">
        <AppInputIncrement
          className="text-base h-8"
          min={0}
          onDecrement={(value) => {
            if (value < 1) {
              return removeFromCart(item.id);
            }
          }}
          onChange={(amount) => {
            setQuantity(Number(amount));
            debouncedSetQuantity(amount);
            onChange?.(Number(amount) * detail.price);
          }}
          onBlur={(value) => {
            if (value < 1) {
              removeFromCart(detail.id);
            }
          }}
          max={detail.quantityAvailable}
          value={quantity}
        />
      </div>
      <AppButton
        variant="transparent"
        onClick={() => removeFromCart(item.id)}></AppButton>
    </div>
  );
};
