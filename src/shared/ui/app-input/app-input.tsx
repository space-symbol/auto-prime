'use client';
import classNames from 'classnames';
import cls from './app-input.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { ChangeHandler } from 'react-hook-form';

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  fullwidth?: boolean;
  label?: string;
  name?: string;
  multiline?: boolean;
  onChange?: (...event: any[]) => void | ChangeHandler;
  value?: string | number;
  error?: string | string[];
  search?: boolean;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>((props, forwardedRef) => {
  const {
    className,
    fullwidth,
    label,
    name,
    onChange,
    value,
    required,
    defaultValue,
    type,
    error,
    placeholder,
    search,
    ...otherProps
  } = props;

  const internalRef = useRef<HTMLInputElement>(null);
  const [isFilled, setIsFilled] = useState(true);

  useEffect(() => {
    if (internalRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    onChange?.(event);
  };

  const appInputClassnames = classNames(cls.appInputContainer, [className], {
    [cls.fullwidth]: fullwidth,
    [cls.active]: isFilled,
    [cls.error]: error,
    [cls.search]: search,
  });

  return (
    <div className={appInputClassnames}>
      <fieldset className={cls.wrapper}>
        <legend className={cls.legend}>
          <span>{label}</span>
        </legend>
      </fieldset>
      {label && (
        <label
          htmlFor={name}
          className={cls.inputLabel}>
          <span className={cls.labelText}>{label}</span>
          {required && <span className={cls.asterisk}>*</span>}
        </label>
      )}
      <input
        type={type}
        ref={internalRef}
        required={required}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
        id={name}
        className={cls.input}
        value={value}
        placeholder={placeholder && !label ? placeholder : ''}
        {...otherProps}
      />
      {error && <span className={cls.errorText}>{error}</span>}
    </div>
  );
});

AppInput.displayName = 'AppInput';
