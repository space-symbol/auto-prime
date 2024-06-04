import { AppButton } from '@/shared/ui/app-button/app-button';
import SwitcherIcon from '@assets/icons/navbar-controller.svg';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface NavbarSwitcherProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  navbarIsActive?: boolean;
}

export const NavbarSwitcher = (props: NavbarSwitcherProps) => {
  const { className, navbarIsActive, ...otherProps } = props;

  return (
    <AppButton
      className={classNames('p-2 h-full lg:hidden', className)}
      title={navbarIsActive ? 'Свернуть навигацию' : 'Развернуть навигацию'}
      LeftIcon={SwitcherIcon}
      theme="transparent"
      {...otherProps}></AppButton>
  );
};
