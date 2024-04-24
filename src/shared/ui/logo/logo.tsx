import LogoIcon from '@assets/icons/logo.svg';
import classNames from 'classnames';
import cls from './logo.module.css';
import Link from 'next/link';
interface LogoProps {
  className?: string;
}

export const Logo = (props: LogoProps) => {
  const { className } = props;

  return (
    <Link
      className={classNames(cls.logo, className)}
      href={'/store'}>
      <LogoIcon />
    </Link>
  );
};
