'use client';
import { Skeleton } from '@/shared/ui/skeleton';
import CloseIcon from '@/shared/public/assets/icons/close.svg';
import { useCartContext } from './cart-provider';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { getUserCart } from '@/entities/user/client';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import { cn } from '@/shared/lib/utils';
import { currencyFormatter } from '@/shared/lib/currencyFormatter';
import { CartItemDetail } from './cart-item-detail';
import CartIcon from '@/shared/public/assets/icons/cart.svg';
import { useAppSession } from '@/entities/user/client';
import { useQuery } from '@tanstack/react-query';

interface CartProps {
  className?: string;
}

export const Cart = (props: CartProps) => {
  const { className } = props;
  const { data: session } = useAppSession();
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const { isOpen, setIsOpen } = useCartContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { data: cart, isPending } = useQuery({
    ...getUserCart(session?.user?.id ?? null),
  });

  useEffect(() => {
    if (cart) {
      setCartTotalPrice(cart.totalPrice);
    }
  }, [cart]);
  const { format } = currencyFormatter;

  useEffect(() => {
    const escapeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', escapeHandler);

    return () => {
      window.removeEventListener('keydown', escapeHandler);
    };
  }, [setIsOpen]);

  const renderCartSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <Skeleton
          isPending={isPending}
          key={index}
          className="h-20 block w-full"
        />
      ));
  };

  const cartIsFilled = cart && cart.items && cart.items.length > 0;
  return (
    <>
      <div className="relative">
        <AppButton
          ref={triggerRef}
          onClick={() => {
            setIsOpen(true);
          }}
          variant="transparent"
          className={cn('p-1 !overflow-visible relative', className)}
          LeftIcon={<CartIcon className="w-8 h-6 fill-current" />}></AppButton>
        {cart && cart.items && cart.items.length > 0 && (
          <span className="absolute left-[90%] -bottom-1 text-inherit text-xs font-rubik animate-show font-semibold">
            {cart.items.length > 100 ? '99+' : cart.items.length}
          </span>
        )}
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enter: 'opacity-0',
          enterActive: 'opacity-100 transition-all',
          exit: 'opacity-0 transition-all',
        }}
        unmountOnExit
        nodeRef={overlayRef}>
        <div
          onClick={() => setIsOpen(false)}
          className="fixed bg-black/80 top-0 right-0 w-screen h-screen z-cart"
          aria-hidden="true"
          ref={overlayRef}
        />
      </CSSTransition>
      <CSSTransition
        in={isOpen}
        timeout={100}
        classNames={{
          enter: '!right-0 transition-all',
          enterDone: '!right-0 transition-all',
          exit: '!right-[-100%] transition-all',
          exitDone: '!right-[-100%] transition-all',
        }}
        unmountOnExit
        nodeRef={cartRef}>
        <div
          ref={cartRef}
          className="fixed top-0 right-[-100%] h-full bg-cart text-cart-foreground w-full z-cart sm:w-cart">
          <FocusLock
            returnFocus={true}
            className={cn('flex flex-col h-full')}>
            <AppButton
              className="!absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
              variant="transparent"
              LeftIcon={<CloseIcon className="h-4 w-4 fill-cart-foreground" />}
            />
            <h2 className="px-4 mb-2 pt-4">Корзина</h2>
            <div className="flex flex-col px-3 pb-3 pt-2 overflow-auto gap-6 flex-grow">
              {isPending ? (
                renderCartSkeletons()
              ) : cart && cart.items && cart.items?.length > 0 ? (
                cart.items.map((item) => (
                  <CartItemDetail
                    key={item.detail.id}
                    item={item}
                    onChange={(totalPrice) => {
                      setCartTotalPrice(totalPrice);
                    }}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <p className="text-lg">Корзина пуста</p>
                </div>
              )}
            </div>
            {cartIsFilled && (
              <div className="flex flex-col pb-1">
                <div className="flex justify-between border-t px-6 py-4">
                  <h3 className="text-lg">Итого:</h3>
                  <div>
                    <span className="text-lg text-accent">{format(cart.totalPrice)}</span>
                  </div>
                </div>
                <AppButton
                  className="!h-12 mx-6"
                  variant="background">
                  Перейти к оформлению
                </AppButton>
              </div>
            )}
          </FocusLock>
        </div>
      </CSSTransition>
    </>
  );
};
