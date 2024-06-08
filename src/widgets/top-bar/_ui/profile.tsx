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
import { getProfileDisplayName } from '@/entities/user/_vm/get-profile-display-name';
import { SignInButton } from '@/features/auth/client';
import { User, LayoutDashboardIcon } from 'lucide-react';
import { AppLink } from '@shared/ui/app-link/app-link';
import React from 'react';
import { useAppSession } from '@/entities/user/client';
import { useSignOut } from '@/features/auth/client';
import { Skeleton } from '@/shared/ui/skeleton';
import { AppButton } from '@/shared/ui/app-button/app-button';

interface ProfileLink {
  href: string;
  text: string;
  Icon: SVGIconFC;
  isPrivate?: boolean;
}
export const Profile = () => {
  const session = useAppSession();
  const { signOut, isPending: isLoadingSignOut } = useSignOut();

  if (session.status === 'loading') {
    return (
      <div className={'rounded-full w-10 h-10'}>
        <Skeleton
          className={'rounded-full w-full h-full bg-gray-light'}
          isPending={session.status === 'loading'}
          appearanceDelay={300}
        />
      </div>
    );
  }

  if (session.status === 'unauthenticated') {
    return <SignInButton className="!h-fit" />;
  }

  const user = session.data?.user;
  const role = user?.role;

  const profileLinks: ProfileLink[] = [
    {
      text: 'Профиль',
      href: '/store/profile',
      Icon: User,
    },
    {
      text: 'Панель управления',
      href: '/dashboard/details',
      Icon: LayoutDashboardIcon,
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
          <ProfileAvatar profile={user} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 pb-2 mr-2">
        <DropdownMenuLabel className="text-base overflow-hidden text-ellipsis">
          {user ? getProfileDisplayName(user) : undefined}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profileLinks.map((item) => (
            <DropdownMenuItem
              asChild
              key={item.href}>
              <AppLink
                key={item.href}
                href={item.href}
                fullwidth
                variant="transparent"
                LeftIcon={<item.Icon className="stroke-current" />}>
                {item.text}
              </AppLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-sm">
          <DropdownMenuItem
            asChild
            className="text-inherit p-0">
            <AppButton
              className={'!h-7 w-full'}
              variant="destructive"
              disabled={isLoadingSignOut}
              onClick={() => signOut()}>
              Выход
            </AppButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
