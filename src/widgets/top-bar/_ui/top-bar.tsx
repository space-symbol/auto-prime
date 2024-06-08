'use client';
import { UpdateSearchParamsBar } from '@/features/search-details/search-details';
import { NavbarSwitcher } from '@widgets/navbar/navbar';
import classNames from 'classnames';
import { Profile } from './profile';
import { Cart } from '@/features/cart/client';

interface TopBarProps {
  className?: string;
}

export const TopBar = (props: TopBarProps) => {
  const { className } = props;
  return (
    <div
      className={classNames(
        'flex items-center justify-between fixed gap-4 top-0 right-0 left-0 h-top-bar bg-background z-top-bar p-2 md:py-2 md:pl-page-left md:pr-page-right lg:ml-navbar',
        className,
      )}>
      <div className={'flex gap-4 items-center h-full w-full'}>
        <NavbarSwitcher />
        <UpdateSearchParamsBar className={'h-full'} />
      </div>
      <div className="flex gap-4 items-center">
        <Cart />
        <Profile />
      </div>
    </div>
  );
};
