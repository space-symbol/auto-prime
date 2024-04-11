import classNames from 'classnames';
import cls from './app-button.module.css';
import { forwardRef, ReactNode } from 'react';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  theme?: AppButtonTheme;
  Icon?: ReactNode;
}

export enum AppButtonTheme {
  BACKGROUND = 'background',
  FILLED = 'filled',
  TRANSPARENT = 'transparent',
  OUTLINE = 'outline',
  DANGER = 'danger',
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>((props: AppButtonProps, ref) => {
  const { className, children, Icon, theme = AppButtonTheme.BACKGROUND, ...otherProps } = props;

  const buttonClasses = classNames(cls.appButton, cls[theme], className);

  return (
    <button ref={ref} {...otherProps} className={buttonClasses}>
      {Icon && Icon}
      <div className={cls.text}>{children}</div>
    </button>
  );
});
AppButton.displayName = 'AppButton';
