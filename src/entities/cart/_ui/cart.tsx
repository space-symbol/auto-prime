import { cn } from '@/shared/lib/utils';
import classNames from 'classnames';

interface CartProps {
  className?: string;
}

export const Cart = (props: CartProps) => {
  const { className } = props;
  return (
    <div className={cn(classNames('absolute top-0 right-0 h-full bg-secondary w-full md:w-cart', className))}>
      Корзина
    </div>
  );
};
