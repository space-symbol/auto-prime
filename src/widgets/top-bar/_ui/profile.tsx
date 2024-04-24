import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { ProfileAvatar } from '@/entities/user/_ui/profile-avatar';
import { getProfileDisplayName } from '@entities/user/_lib/get-profile-display-name';
import { SignInButton } from '@features/auth/sign-in-button';
import { User, ShoppingCart, LayoutDashboardIcon } from 'lucide-react';
import { AppLink } from '@shared/ui/app-link/app-link';
import React from 'react';
import { useAppSession } from '@/entities/user/use-app-session';
import { useSignOut } from '@/features/auth/use-sign-out';
import { Skeleton } from '@/shared/ui/skeleton';
import { AppButton, AppButtonTheme } from '@/shared/ui/app-button/app-button';

interface ProfileLink {
  href: string;
  text: string;
  icon: SVGIconFC;
  isPrivate?: boolean;
}
export const Profile = () => {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === 'loading') {
    return (
      <Skeleton
        className={'rounded-full w-10 h-10 bg-grayLight'}
        isPending={session.status === 'loading'}
        appearanceDelay={300}
      />
    );
  }

  if (session.status === 'unauthenticated') {
    return <SignInButton />;
  }

  const user = session.data?.user;
  const role = user?.role;

  const profileLinks: ProfileLink[] = [
    {
      text: 'Мой профиль',
      href: `/store/profile/${user?.id}`,
      icon: User,
    },
    {
      text: 'Корзина',
      href: `/store/cart/${user?.id}`,
      icon: ShoppingCart,
    },
    {
      text: 'Панель управления',
      href: '/store/dashboard',
      icon: LayoutDashboardIcon,
      isPrivate: true,
    },
  ].filter((item) => !item?.isPrivate || role === 'ADMIN');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={'flex items-center outline-offset-2 justify-center'}>
        <button
          title="Мой аккаунт"
          className={'w-auto h-full'}>
          <ProfileAvatar
            profile={user}
            className=""
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 pb-2 mr-2 rounded-sm border border-black">
        <DropdownMenuLabel>
          <p className="text-base overflow-hidden text-ellipsis">
            {user ? getProfileDisplayName(user) : undefined}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profileLinks.map((item, index) => (
            <DropdownMenuItem
              className={'text-base'}
              key={index}>
              <AppLink href={item.href}>
                <div className="flex gap-1.5 items-center">
                  <item.icon className="h-4 w-4" />
                  <span>{item.text}</span>
                </div>
              </AppLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={'text-base hover:text-red-500 p-0'}>
            <AppButton
              className={'p-1'}
              theme={AppButtonTheme.DANGER}
              disabled={isLoadingSignOut}
              onClick={() => signOut()}>
              <span>Выход</span>
            </AppButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
