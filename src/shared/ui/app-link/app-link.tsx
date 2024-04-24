import Link, { LinkProps } from 'next/link';
import { forwardRef, ReactNode } from 'react';
import cls from './app-link.module.css';
import classNames from 'classnames';

export enum AppLinkTheme {
  UNDERLINE = 'underline',
  HOVER = 'hover',
  HOVER_UNDERLINED = 'hover_underlined',
  HOVERED_UNDERLINE = 'hovered_underline',
}

export interface AppLinkProps extends LinkProps {
  theme?: AppLinkTheme;
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props: AppLinkProps, ref) => {
  const { className, active, theme = AppLinkTheme.HOVER, children, ...otherProps } = props;
  const linkClasses = classNames(cls.appLink, className, cls[theme], {
    [cls.active]: active,
  });

  return (
    <Link
      ref={ref}
      className={linkClasses}
      {...otherProps}>
      {children}
    </Link>
  );
});
AppLink.displayName = 'AppLink';
