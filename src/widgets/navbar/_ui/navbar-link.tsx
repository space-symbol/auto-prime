import { AppLink, AppLinkProps } from '@/shared/ui/app-link/app-link';
import { cn } from '@/shared/lib/utils';
import { useNavbarContext } from './navbar-provider';

export interface NavbarLinkProps extends AppLinkProps {
  isRoot?: boolean;
}

export const NavbarLink = (props: NavbarLinkProps) => {
  const { children, className, isRoot, href, ...otherProps } = props;
  const { navbarIsActive, setNavbarIsActive } = useNavbarContext();

  const onLinkClick = () => {
    if (navbarIsActive) {
      setNavbarIsActive(false);
    }
  };
  return (
    <AppLink
      onClick={onLinkClick}
      pathRespnosible
      fullwidth
      className={cn('h-auto text-left block px-6 py-3 w-full text-navbar-foreground', className)}
      variant={isRoot ? 'hover' : 'background'}
      href={href}
      {...otherProps}>
      {children}
    </AppLink>
  );
};
