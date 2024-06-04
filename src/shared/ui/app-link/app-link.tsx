'use client';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, forwardRef, ReactNode, useEffect, useState } from 'react';
import cls from './app-link.module.css';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

type AppLinkTheme = 'hover' | 'underlined' | 'underlined' | 'background';

export interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkProps {
  theme?: AppLinkTheme;
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  pathRespnosible?: boolean;
  fullwidth?: boolean;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props: AppLinkProps, ref) => {
  const { className, active, theme = 'underlined', children, pathRespnosible, href, fullwidth, ...otherProps } = props;

  const params = useParams();
  const [currentPath, setCurrentPath] = useState<string>('');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setCurrentPath(window.location.hash.slice(1));
    } else {
      setCurrentPath(window.location.pathname.split('/').at(-1) || '/');
    }
  }, [params]);

  const endPoint = href.includes('#') ? href.split('#').at(1) : href.split('/').at(-1);

  const linkClasses = cn(
    classNames(cls.appLink, className, cls[theme], {
      [cls.active]: active || (currentPath && currentPath === endPoint),
      [cls.fullwidth]: fullwidth,
    }),
  );

  return (
    <Link
      ref={ref}
      className={linkClasses}
      href={href}
      {...otherProps}>
      <span>{children}</span>
    </Link>
  );
});
AppLink.displayName = 'AppLink';
