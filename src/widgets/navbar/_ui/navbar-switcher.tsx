'use client';
import { AppButton } from '@/shared/ui/app-button/app-button';
import SwitcherIcon from '@assets/icons/navbar-controller.svg';
import { cn } from '@/shared/lib/utils';
import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import { useNavbarContext } from './navbar-provider';

interface NavbarSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const NavbarSwitcher = (props: NavbarSwitcherProps) => {
  const { className, ...otherProps } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const { navbarIsActive, setNavbarIsActive } = useNavbarContext();

  useEffect(() => {
    if (!navbarIsActive) {
      return ref?.current?.focus();
    }
    ref?.current?.blur();
  }, [navbarIsActive]);

  return (
    <AppButton
      ref={ref}
      onClick={() => setNavbarIsActive(!navbarIsActive)}
      className={cn('!h-full lg:!hidden', className)}
      title={navbarIsActive ? 'Свернуть навигацию' : 'Развернуть навигацию'}
      LeftIcon={<SwitcherIcon className="fill-current stroke-current w-6 h-6" />}
      variant="transparent"
      autoFocus={navbarIsActive}
      {...otherProps}
    />
  );
};
