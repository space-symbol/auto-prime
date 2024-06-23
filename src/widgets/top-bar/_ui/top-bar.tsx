'use client';
import { UpdateSearchParamsBar } from '@/features/search-details/search-details';
import { NavbarSwitcher } from '@widgets/navbar/navbar';
import { cn } from '@/shared/lib/utils';
import { Profile } from './profile-menu';
import { Cart } from '@/features/cart/client';

interface TopBarProps {
  className?: string;
}

export const TopBar = (props: TopBarProps) => {
  const { className } = props;
  return (
    <div
      className={cn(
        'flex items-center justify-between fixed gap-4 top-0 right-0 left-0 h-top-bar bg-top-bar text-top-bar-foreground z-top-bar p-2 md:py-2 md:pl-page-left md:pr-page-right lg:ml-navbar',
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
