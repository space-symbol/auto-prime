'use client';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, forwardRef, ReactNode, useEffect, useState } from 'react';
import cls from './app-link.module.css';
import { useParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

export type AppLinkVariant = 'hover' | 'underlined' | 'background' | 'transparent';

export interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, LinkProps {
  variant?: AppLinkVariant;
  href: string;
  active?: boolean;
  children?: ReactNode;
  className?: string;
  pathRespnosible?: boolean;
  fullwidth?: boolean;
  RightIcon?: ReactNode;
  LeftIcon?: ReactNode;
  vertical?: boolean;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props: AppLinkProps, ref) => {
  const {
    className,
    active,
    variant = 'underlined',
    children,
    pathRespnosible,
    href,
    fullwidth,
    RightIcon,
    LeftIcon,
    vertical,
    ...otherProps
  } = props;

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
    cn(cls.appLink, className, cls[variant], {
      [cls.active]: active || (currentPath && currentPath === endPoint),
      '!w-full': fullwidth,
    }),
  );

  return (
    <Link
      ref={ref}
      className={linkClasses}
      href={href}
      {...otherProps}>
      {LeftIcon}
      {variant === 'background' ? <span className={cls.content}>{children}</span> : children}
      {RightIcon}
    </Link>
  );
});

AppLink.displayName = 'AppLink';
