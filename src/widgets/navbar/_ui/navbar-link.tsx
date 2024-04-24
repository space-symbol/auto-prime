import { cn } from '@/shared/lib/utils';
import { AppLink, AppLinkProps } from '@/shared/ui/app-link/app-link';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';

export interface NavbarLinkProps extends AppLinkProps {
  setNavbarIsActive?: (isActive: boolean) => void;
  navbarIsActive?: boolean;
}

export const NavbarLink = (props: NavbarLinkProps) => {
  const { href, children, className, active, navbarIsActive, setNavbarIsActive, ...otherProps } = props;
  const pathname = usePathname();
  const router = useRouter();
  const onNavbarLinkClick = () => {
    if (setNavbarIsActive) {
      setNavbarIsActive(!navbarIsActive);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <AppLink
      onClick={onNavbarLinkClick}
      active={active || (pathname.includes(href) && href !== '/')}
      className={classNames(cn('h-auto text-left border-y-gray block p-3 w-full'), className)}
      href={href}
      {...otherProps}>
      {children}
    </AppLink>
  );
};
