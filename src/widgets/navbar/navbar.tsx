'use client';
import { Logo } from '@shared/ui/logo/logo';
import classNames from 'classnames';
import { useNavbarContext } from './navbar-context';
import { NavbarLink, NavbarLinkProps } from './_ui/navbar-link';

interface NavbarProps {
  className?: string;
}

const navbarLinks: NavbarLinkProps[] = [
  {
    title: 'Магазин',
    href: '/store',
  },

  {
    title: 'Контакты',
    href: '/contacts',
  },

  {
    title: 'О нас',
    href: '/about',
  },
  {
    title: 'Главная',
    href: '/',
  },
];

export const Navbar = (props: NavbarProps) => {
  const { className } = props;
  const { navbarIsActive, changeNavbarIsActive } = useNavbarContext();

  return (
    <>
      <div
        onClick={() => changeNavbarIsActive(false)}
        className={classNames(
          'fixed backdrop-blur top-0 left-0 bg-black z-backdrop bg-opacity-70 h-screen hidden transition-width opacity-0 sm:hidden',
          {
            'visible motion-safe:visible right-0 motion-safe:block motion-safe:opacity-100': navbarIsActive,
          },
        )}
      />
      <header
        className={classNames(
          'items-center bg-black h-full justify-between translate-x-[-100%] sm:translate-x-0 sm:flex flex-col flex-shrink-0 gap-4 w-0 transition-transform sm:w-navbar sm:transition-width z-navbar top-0 left-0 fixed sm:static',
          className,
          {
            'motion-safe:translate-x-0 motion-safe:flex motion-safe:w-navbar': navbarIsActive,
          },
        )}
      >
        <Logo className={'w-[80%] h-auto p-page'} />
        <nav className={'flex-grow flex justify-around items-center w-full'}>
          <ul className={'text-white w-full'}>
            {navbarLinks.map((link) => (
              <NavbarLink key={link.href} {...link} />
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

// export default Navbar;
