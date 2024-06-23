import cls from './app-button.module.css';
import React, { forwardRef, ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: AppButtonVariant;
  fullWidth?: boolean;
  active?: boolean;
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
}

type AppButtonVariant = 'background' | 'filled' | 'transparent' | 'destructive' | 'outlined';

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>((props: AppButtonProps, ref) => {
  const { className, children, LeftIcon, RightIcon, variant = 'background', fullWidth, active, ...otherProps } = props;

  const buttonClasses = cn(
    cn(
      cls.appButton,
      cls[variant],
      { 'w-full': fullWidth, [cls.active]: active, [cls.icon]: (LeftIcon || RightIcon) && !children },
      className,
    ),
  );

  return (
    <button
      ref={ref}
      className={buttonClasses}
      {...otherProps}>
      {LeftIcon}
      {children && <div className={cls.content}>{children}</div>}
      {RightIcon}
    </button>
  );
});
AppButton.displayName = 'AppButton';
