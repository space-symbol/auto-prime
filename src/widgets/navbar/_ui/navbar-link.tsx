import { cn } from '@/shared/lib/utils';
import { AppLink, AppLinkProps } from '@/shared/ui/app-link/app-link';
import classNames from 'classnames';
import { useNavbarContext } from './navbar-context';

export interface NavbarLinkProps extends AppLinkProps {
  isRoot?: boolean;
}

export const NavbarLink = (props: NavbarLinkProps) => {
  const { children, className, isRoot, href, ...otherProps } = props;
  const { navbarIsActive, changeNavbarIsActive } = useNavbarContext();

  const onLinkClick = () => {
    if (changeNavbarIsActive) {
      changeNavbarIsActive(!navbarIsActive);
    }
  };
  return (
    <AppLink
      onClick={onLinkClick}
      pathRespnosible
      fullwidth
      className={classNames(cn('h-auto text-left block px-6 py-3 w-full text-navbar-foreground'), className)}
      theme={isRoot ? 'hover' : 'background'}
      href={href}
      {...otherProps}>
      {children}
    </AppLink>
  );
};
