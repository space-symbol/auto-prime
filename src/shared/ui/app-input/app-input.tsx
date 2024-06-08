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
import { Minus, Plus } from 'lucide-react';

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
        value: (type === 'number' && value === 0) || value ? value : '',
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

interface AppInputIncrementProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onBlur'> {
  value: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  onBlur?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
}

export const AppInputIncrement = forwardRef<HTMLInputElement, AppInputIncrementProps>((props, ref) => {
  const { min, max, value, onChange, className, onBlur, onIncrement, onDecrement, ...otherProps } = props;
  return (
    <div className={classNames('flex items-center gap-2 justify-center relative flex-shrink-0', className)}>
      <AppButton
        disabled={value && min ? value <= min : false}
        variant="transparent"
        className="flex-shrink-0"
        onClick={() => {
          if ((min || min === 0) && value <= min) {
            return onChange?.(min);
          }
          onChange?.(value - 1);
          onDecrement?.(value - 1);
        }}
        LeftIcon={<Minus className="h-6 w-6 stroke-current stroke-2" />}
      />
      <input
        min={min}
        max={max}
        onChange={(event) => {
          const value = event.target.value ? Number.parseInt(event.target.value) : Number(event.target.value);
          if (max) {
            if (value <= max) {
              onChange?.(value);
            }
          }
        }}
        onBlur={(event) => {
          const value = Number.parseInt(event.target.value);
          onBlur?.(value);
        }}
        type="number"
        inputMode="numeric"
        className={'w-full text-center py-1 h-full border-border border rounded-sm bg-input'}
        value={value}
        {...otherProps}
      />
      <AppButton
        disabled={value && max ? value >= max : false}
        variant="transparent"
        onClick={() => {
          onChange?.(value + 1);
          onIncrement?.(value - 1);
        }}
        className="flex-shrink-0"
        LeftIcon={<Plus className="h-6 w-6 stroke-current stroke-2 " />}
      />
    </div>
  );
});

AppInputIncrement.displayName = 'AppInputIncrement';

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
    if (inputRef.current && inputRef.current.files && value && value?.length > 0) {
      inputRef.current.files = value;
    }
  }, [value]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!inputRef.current || inputRef.current.files?.length === maxFiles) {
      return;
    }

    const newFiles = getNewUniqueFiles(event.target.files, maxFiles, value, accept, maxSize, multiple);
    if (newFiles.length > 0) {
      onChange?.(newFiles);
    }
  };

  const onDeleteFile = (fileName: string) => {
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      [...(value || [])].forEach((file) => file.name !== fileName && dataTransfer.items.add(file));
      onChange?.(dataTransfer.files);
    }
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragStarted(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragStarted(false);
  };

  // const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  //   const newFiles = getNewUniqueFiles(event.dataTransfer.files, maxFiles, currentFiles, accept, maxSize, multiple);
  //   if (newFiles.length > 0) {
  //     const updatedFiles = [...currentFiles, ...newFiles];
  //     setCurrentFiles(updatedFiles);
  //     onChange?.(updatedFiles);
  //   }
  //   setDragStarted(false);
  // };

  const inputFileClasses = classNames(cls.inputFileContainer, className, {
    [cls.error]: error,
    [cls.dragging]: isDragStarted,
  });

  return (
    <div
      className={inputFileClasses}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
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
        {(!value || value?.length === 0) && (
          <span className={cls.labelText}>
            {label || 'Выберите файл'}
            {required && <span className={cls.asterisk}> *</span>}
          </span>
        )}
        {error && <span className={cls.errorText}>{error}</span>}
      </label>
      {value && value.length > 0 && !multiple && (
        <div className={'w-full h-full'}>
          <Image
            width={100}
            height={100}
            src={URL.createObjectURL(value[0])}
            alt={value[0].name}
            className={cls.fileImage}
          />
        </div>
      )}
      {value && value.length > 0 && multiple && (
        <div className={cls.files}>
          {[...value].map((file) => (
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
                LeftIcon={<CloseIcon className={'w-auto h-full fill-current'} />}>
                Удалить
              </AppButton>
              <span className={cls.fileSize}>{(file.size / (1024 * 1024)).toFixed(4)} Мб</span>
            </div>
          ))}
        </div>
      )}
      <div className={cls.filesInfo}>
        {multiple && (
          <div>
            {value?.length || 0}/{maxFiles}
          </div>
        )}
        {maxSize && <div>{'Макс. размер файла: ' + maxSize + ' Mб'}</div>}
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

  const newFilestArray = [...(newFiles || [])];
  const currentFilesArray = [...(currentFiles || [])];
  const dataTransfer = new DataTransfer();

  if (multiple) {
    if (currentFilesArray.length === 0) {
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

        if (
          !currentFilesArray.find((file) => file.name === newFile.name) &&
          (maxSize ? newFile.size <= maxSize : true)
        ) {
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
  } else {
    for (const file of newFilestArray) {
      if (RegExp(accept).test(file.type) && maxSize ? file.size <= maxSize : true) {
        dataTransfer.items.add(file);
        break;
      }
    }
  }
  return dataTransfer.files;
}

AppInputFile.displayName = 'AppInputFile';
