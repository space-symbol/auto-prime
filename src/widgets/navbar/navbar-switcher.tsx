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
    <button
      className={classNames('h-min p-2 sm:hidden', className)}
      title={navbarIsActive ? 'Свернуть навигацию' : 'Развернуть навигацию'}
      {...otherProps}
    >
      <SwitcherIcon
        className={classNames('fill-black h-4 w-4 transition-transform', {
          'rotate-180': !navbarIsActive,
        })}
      />
    </button>
  );
};
// export default NavbarSwitcher;
