'use client';
import { Skeleton } from '@/shared/ui/skeleton';
import CloseIcon from '@/shared/public/assets/icons/close.svg';
import { useCartContext } from './cart-provider';
import { AppButton } from '@/shared/ui/app-button/app-button';
import { useGetUserCart } from '@/entities/user/_queries';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import FocusLock from 'react-focus-lock';
import classNames from 'classnames';
import { currencyFormatter } from '@/shared/lib/currencyFormatter';
import { CartItemEntity } from '@/entities/user/_domain/types';
import { CartItem } from './cart-item';
import CartIcon from '@/shared/public/assets/icons/cart.svg';
import { useAppSession } from '@/entities/user/client';

interface CartProps {
  className?: string;
}

export const Cart = (props: CartProps) => {
  const { className } = props;
  const { cart, isPending } = useGetUserCart();
  const { isOpen, setIsOpen } = useCartContext();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { format } = currencyFormatter;
  const session = useAppSession();

  if (!(session.status === 'authenticated')) return null;

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

  return (
    <>
      <AppButton
        ref={triggerRef}
        onClick={() => {
          setIsOpen(true);
        }}
        variant="transparent"
        className={classNames('p-1 !overflow-visible', className)}
        LeftIcon={<CartIcon className=" w-8 h-6 fill-current" />}>
        <span className="absolute left-[70%] -bottom-1 text-inherit text-xs font-rubik font-semibold">
          {cart && cart.length > 100 ? '99+' : cart?.length}
        </span>
      </AppButton>
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
            className={classNames('flex flex-col h-full')}>
            <AppButton
              className="!absolute top-2 right-2"
              onClick={() => setIsOpen(false)}
              variant="transparent"
              LeftIcon={<CloseIcon className="h-4 w-4 fill-cart-foreground" />}
            />
            <h2 className="px-4 mb-2 pt-4">Корзина</h2>
            <div className="flex flex-col px-3 pb-3 pt-2 overflow-auto gap-4 flex-grow">
              {isPending ? (
                renderCartSkeletons()
              ) : cart && cart.length > 0 ? (
                cart.map((cart) => (
                  <CartItem
                    key={cart.id}
                    cart={cart}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <p className="text-lg">Корзина пуста</p>
                </div>
              )}
            </div>
            {cart && cart.length > 0 && (
              <div className="flex flex-col pb-1">
                <div className="flex justify-between border-t p-4">
                  <h3 className="text-lg">Итого:</h3>
                  <div>
                    <p className="text-lg text-accent">{format(cart[0].total)}</p>
                    <s className="text-md">
                      {cart &&
                        format(
                          cart.reduce((acc: number, item: CartItemEntity) => {
                            if (item.discountPercentage > 0) {
                              return acc + (item.price - item.priceAfterDiscount) * item.quantity;
                            }
                            return acc;
                          }, cart[0].total),
                        )}
                    </s>
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
