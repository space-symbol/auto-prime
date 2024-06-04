import classNames from 'classnames';
import cls from './app-button.module.css';
import React, { forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  theme?: AppButtonTheme;
  LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  fullWidth?: boolean;
  active?: boolean;
}

type AppButtonTheme = 'background' | 'filled' | 'transparent' | 'destructive' | 'outlined';

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>((props: AppButtonProps, ref) => {
  const { className, children, LeftIcon, RightIcon, theme = 'background', fullWidth, active, ...otherProps } = props;

  const buttonClasses = cn(
    classNames(
      cls.appButton,
      cls[theme],

      { 'w-full': fullWidth, [cls.active]: active },
      className,
    ),
  );

  return (
    <button
      ref={ref}
      className={buttonClasses}
      {...otherProps}>
      {LeftIcon && <LeftIcon className={cls.icon} />}
      {children && <div className={cls.content}>{children}</div>}
      {RightIcon && <RightIcon className={cls.icon} />}
    </button>
  );
});
AppButton.displayName = 'AppButton';
