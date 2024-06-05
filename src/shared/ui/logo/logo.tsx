import LogoIcon from '@assets/icons/logo.svg';
import classNames from 'classnames';
import cls from './logo.module.css';
import { routes } from '@/shared/config/routes';
import { NavbarLink } from '@/widgets/navbar/_ui/navbar-link';
import { cn } from '@/shared/lib/utils';
interface LogoProps {
  className?: string;
}

export const Logo = (props: LogoProps) => {
  const { className } = props;

  return (
    <NavbarLink
      theme="hover"
      className={cn(classNames(cls.logo, 'p-0', className))}
      href={routes.navbarRoutes.main.href}>
      <LogoIcon />
    </NavbarLink>
  );
};
