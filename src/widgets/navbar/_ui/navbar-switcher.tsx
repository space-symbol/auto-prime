'use client';
import { AppButton } from '@/shared/ui/app-button/app-button';
import SwitcherIcon from '@assets/icons/navbar-controller.svg';
import classNames from 'classnames';
import { ButtonHTMLAttributes, useEffect, useRef } from 'react';

interface NavbarSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  navbarIsActive?: boolean;
}

export const NavbarSwitcher = (props: NavbarSwitcherProps) => {
  const { className, navbarIsActive, ...otherProps } = props;
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!navbarIsActive) {
      return ref?.current?.focus();
    }
    ref?.current?.blur();
  }, [navbarIsActive]);

  return (
    <AppButton
      ref={ref}
      className={classNames('!py-1 lg:!hidden', className)}
      title={navbarIsActive ? 'Свернуть навигацию' : 'Развернуть навигацию'}
      LeftIcon={SwitcherIcon}
      theme="transparent"
      autoFocus={navbarIsActive}
      {...otherProps}
    />
  );
};
