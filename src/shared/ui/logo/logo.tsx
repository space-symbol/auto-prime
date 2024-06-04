import LogoIcon from '@assets/icons/logo.svg';
import classNames from 'classnames';
import cls from './logo.module.css';
import { routes } from '@/shared/config/routes';
import { NavbarLink } from '@/widgets/navbar/_ui/navbar-link';
interface LogoProps {
  className?: string;
}

export const Logo = (props: LogoProps) => {
  const { className } = props;

  return (
    <NavbarLink
      theme="hover"
      className={classNames(cls.logo, className)}
      href={routes.navbarRoutes.main.href}>
      <LogoIcon />
    </NavbarLink>
  );
};
