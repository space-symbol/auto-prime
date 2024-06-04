'use client';
import classNames from 'classnames';
import cls from './app-input.module.css';
import React, {
  forwardRef,
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import Image from 'next/image';
import CloseIcon from '@shared/public/assets/icons/close.svg';
import { AppButton } from '../app-button/app-button';

type AppInputProps<T> = {
  className?: string;
  label?: string;
  error?: string;
  fullwidth?: boolean;
  name?: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  value?: string | number | readonly string[];
  myRef?: React.Ref<T>;
  onChange?: (event: React.ChangeEvent<T>) => void;
  onFocus?: (event: React.FocusEvent<T>) => void;
  isFilled?: boolean;
  select?: boolean;
} & (T extends HTMLInputElement ? InputHTMLAttributes<HTMLInputElement> : TextareaHTMLAttributes<HTMLTextAreaElement>);

type AppBaseInputProps<T> = {
  component: 'input' | 'textarea';
} & AppInputProps<T>;

const AppBaseInput = <T extends HTMLInputElement | HTMLTextAreaElement>(props: AppBaseInputProps<T>) => {
  const {
    className,
    label,
    name,
    value,
    error,
    onChange,
    placeholder,
    required,
    type,
    component,
    myRef,
    select,
    onFocus,
    ...otherProps
  } = props;

  const [isFilled, setIsFilled] = useState<boolean>(!!value || type === 'number');

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<T>) => {
      const value = event.target.value;
      setIsFilled(!!value);
      onChange?.(event);
    },
    [onChange],
  );

  const onFocusHandler = useCallback(
    (event: React.FocusEvent<T>) => {
      select || (type === 'number' && event.target.select());
      onFocus?.(event);
    },
    [onFocus, select, type],
  );

  const labelText =
    label && required ? (
      <>
        {label} <span className={cls.asterisk}>*</span>
      </>
    ) : (
      label
    );
  return (
    <div
      className={classNames(cls.inputContainer, className, {
        [cls.filled]: isFilled,
        [cls.error]: error,
        [cls.nolabel]: !label,
      })}>
      <fieldset className={cls.wrapper}>
        {label && (
          <legend className={cls.legend}>
            <span>{labelText}</span>
          </legend>
        )}
      </fieldset>
      {label && (
        <label
          htmlFor={name}
          className={cls.inputLabel}>
          <span className={cls.labelText}>{labelText}</span>
        </label>
      )}
      {React.createElement(component, {
        ref: myRef,
        required,
        onChange: onChangeHandler,
        onFocus: onFocusHandler,
        id: name,
        name,
        type,
        className: cls.input,
        value: value || '',
        placeholder: placeholder && !label ? placeholder : '',
        ...otherProps,
      })}
      {error && <span className={cls.errorText}>{error}</span>}
    </div>
  );
};

export const AppInput = forwardRef<HTMLInputElement, AppInputProps<HTMLInputElement>>((props, ref) => {
  return (
    <AppBaseInput<HTMLInputElement>
      {...props}
      component="input"
      myRef={ref}
    />
  );
});

AppInput.displayName = 'AppInput';

export const AppTextarea = forwardRef<HTMLTextAreaElement, AppInputProps<HTMLTextAreaElement>>((props, ref) => {
  return (
    <AppBaseInput<HTMLTextAreaElement>
      {...props}
      component="textarea"
      myRef={ref}
    />
  );
});

AppTextarea.displayName = 'AppTextarea';

interface AppInputFileProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  className?: string;
  label?: string;
  error?: string;
  onChange?: (files: FileList | null) => void;
  value?: FileList;
  maxSize?: number;
  maxFiles?: number;
}

export const AppInputFile = forwardRef<HTMLInputElement, AppInputFileProps>((props: AppInputFileProps, ref) => {
  const {
    className,
    name,
    label,
    onChange,
    error,
    multiple,
    accept = '*/*',
    maxSize,
    maxFiles = 10,
    value,
    required,
    type,
    ...otherProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>();
  const [isDragStarted, setDragStarted] = useState<boolean>(false);
  useEffect(() => {
    if (inputRef.current && inputRef.current.files && value) {
      inputRef.current.files = value;
    }
  }, [value]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!inputRef.current || inputRef.current.files?.length === maxFiles) {
      return;
    }

    if (event.target.files?.length === 0) {
      inputRef.current.files = inputRef.current.files;
    } else {
      const newFiles = getNewUniqueFiles(event.target.files, maxFiles, value, accept, maxSize, multiple);
      if (newFiles.length > 0) {
        onChange?.(newFiles);
      }
    }
  };

  const onDeleteFile = (fileName: string) => {
    if (inputRef.current && inputRef.current.files) {
      const dataTransfer = new DataTransfer();
      Array.from(value || []).forEach((file) => file.name !== fileName && dataTransfer.items.add(file));
      onChange?.(dataTransfer.files);
    }
  };

  const inputFileClasses = classNames(cls.inputFileContainer, className, {
    [cls.error]: error,
    [cls.dragging]: isDragStarted,
  });
  return (
    <div
      className={inputFileClasses}
      onDragOver={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragStarted(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragStarted(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        const newFiles = getNewUniqueFiles(event.dataTransfer.files, maxFiles, value, accept, maxSize, multiple);
        if (newFiles.length > 0) {
          onChange?.(newFiles);
        }
        setDragStarted(false);
      }}>
      <input
        tabIndex={-1}
        ref={(element) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(element);
            } else {
              ref.current = element;
            }
            inputRef.current = element;
          }
        }}
        id={name}
        name={name}
        type={'file'}
        multiple={multiple}
        onChange={onChangeHandler}
        className={cls.inputFile}
        {...otherProps}
      />
      <label
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            inputRef.current?.click();
          }
        }}
        tabIndex={0}
        className={cls.inputLabel}
        htmlFor={name}>
        <span className={cls.labelText}>
          {label || 'Выберите файл'}
          {required && <span className={cls.asterisk}> *</span>}
        </span>
        {error && <span className={cls.errorText}>{error}</span>}
      </label>

      {value && value.length > 0 && (
        <div className={cls.files}>
          {Array.from(value).map((file) => (
            <div
              className={cls.filePreviewCard}
              key={file.name}>
              <Image
                width={100}
                height={100}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className={cls.fileImage}
              />
              <span className={cls.fileName}>{file.name}</span>
              <AppButton
                type={'button'}
                onClick={() => onDeleteFile(file.name)}
                fullWidth
                LeftIcon={CloseIcon}>
                Удалить
              </AppButton>
              <span className={cls.fileSize}>{(file.size / (1024 * 1024)).toFixed(4)} Мб</span>
            </div>
          ))}
        </div>
      )}
      <div className={cls.filesInfo}>
        <div>
          {value?.length || 0}/{maxFiles}
        </div>
        {maxSize && <div>{'Макс. размер 1 файла: ' + maxSize + ' Mб'}</div>}
      </div>
    </div>
  );
});

function getNewUniqueFiles(
  newFiles: FileList | null,
  maxFiles: number,
  currentFiles?: FileList | null,
  accept: string = '*/*',
  maxSize?: number,
  multiple?: boolean,
) {
  if (maxSize) {
    maxSize = maxSize * 1024 * 1024;
  }

  const newFilestArray = Array.from(newFiles || []);
  const currentFilesArray = Array.from(currentFiles || []);
  const dataTransfer = new DataTransfer();

  if (currentFilesArray.length === 0) {
    if (multiple) {
      const uniqueFilesArray: File[] = [];

      for (const newFile of newFilestArray) {
        if (
          dataTransfer.items.length < maxFiles &&
          RegExp(accept).test(newFile.type) &&
          !uniqueFilesArray.find((f) => f.name === newFile.name) &&
          (maxSize ? newFile.size <= maxSize : true)
        ) {
          uniqueFilesArray.push(newFile);
          dataTransfer.items.add(newFile);
        }
      }
    } else {
      for (const file of newFilestArray) {
        if (RegExp(accept).test(file.type) && maxSize ? file.size <= maxSize : true) {
          dataTransfer.items.add(file);
          break;
        }
      }
    }
  } else {
    currentFilesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    const newFiles: File[] = [];

    for (let newFile of newFilestArray) {
      if (dataTransfer.items.length === maxFiles) {
        break;
      }

      if (!RegExp(accept).test(newFile.type) || (maxSize && newFile.size > maxSize)) {
        continue;
      }

      if (!currentFilesArray.find((file) => file.name === newFile.name) && (maxSize ? newFile.size <= maxSize : true)) {
        currentFilesArray.push(newFile);
        newFiles.push(newFile);
        dataTransfer.items.add(newFile);
        if (!multiple) {
          break;
        }
      }
    }
    if (newFiles.length === 0) {
      return new DataTransfer().files;
    }
  }
  return dataTransfer.files;
}

AppInputFile.displayName = 'AppInputFile';
