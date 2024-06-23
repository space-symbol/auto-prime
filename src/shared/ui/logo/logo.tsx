import LogoIcon from '@assets/icons/logo.svg';
import { cn } from '@/shared/lib/utils';
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
      variant="hover"
      className={cn(cls.logo, 'p-0', className)}
      href={routes.navbarRoutes.main.href}
      LeftIcon={<LogoIcon className={'h-full w-full'} />}
    />
  );
};
