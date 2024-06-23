/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import cls from './app-input.module.css';
import React, {
  forwardRef,
  HTMLInputTypeAttribute,
  useCallback,
  useState,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useRef,
} from 'react';
import Image from 'next/image';
import X from '@shared/public/assets/icons/close.svg';
import MinusIcon from '@/shared/public/assets/icons/minus.svg';
import PlusIcon from '@/shared/public/assets/icons/plus.svg';
import { AppButton } from '../app-button/app-button';
import { Edit2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

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
      className={cn(cls.inputContainer, className, {
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
  onChange?: (value: number | string) => void;
  onBlur?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
}

export const AppInputIncrement = forwardRef<HTMLInputElement, AppInputIncrementProps>((props, ref) => {
  const { min, max, value, onChange, className, onBlur, onIncrement, onDecrement, ...otherProps } = props;
  return (
    <div className={cn('flex items-center gap-2 justify-center relative flex-shrink-0', className)}>
      <AppButton
        disabled={value && min ? value <= min : false}
        variant="transparent"
        className="flex-shrink-0"
        onClick={() => {
          if ((min || min === 0) && value <= min) {
            return onChange?.(min);
          }
          const newValue = value - 1;
          onChange?.(newValue);
          onDecrement?.(newValue);
        }}
        LeftIcon={<MinusIcon className="h-4 w-4 stroke-current stroke-2" />}
      />
      <input
        min={min}
        max={max}
        onChange={(event) => {
          const value = event.target.value ? Number.parseInt(event.target.value) : '';
          if (value && max) {
            return onChange?.(value < max ? value : max);
          }
          onChange?.(value);
        }}
        onBlur={(event) => {
          const value = Number.parseInt(event.target.value);
          if (min && (value < min || !value)) {
            return onChange?.(min);
          }
          onBlur?.(value);
        }}
        onSelect={(event: React.ChangeEvent<HTMLInputElement>) => {
          event.target.select();
        }}
        ref={ref}
        type="number"
        inputMode="numeric"
        className={'w-full text-center py-2 h-full border-border border rounded-sm bg-input'}
        value={value}
        {...otherProps}
      />
      <AppButton
        disabled={value && max ? value >= max : false}
        variant="transparent"
        onClick={() => {
          if (max && value >= max) {
            onChange?.(max);
          }
          const newValue = value + 1;
          onChange?.(newValue);
          onIncrement?.(newValue);
        }}
        className="flex-shrink-0"
        LeftIcon={<PlusIcon className="h-4 w-4 stroke-current stroke-2 " />}
      />
    </div>
  );
});

AppInputIncrement.displayName = 'AppInputIncrement';

interface AppInputFileProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  className?: string;
  label?: string;
  error?: string;
  onChange?: (files: (File | string)[]) => void;
  value: (File | string)[];
  maxSize?: number;
  maxFiles?: number;
}

export const InputFile = forwardRef<HTMLInputElement, AppInputFileProps>((props: AppInputFileProps, ref) => {
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
    value = [],
    required,
    type,
    readOnly,
    ...otherProps
  } = props;

  const maxSizeBytes = maxSize ? maxSize * 1024 * 1024 : maxSize;
  const [isDragStarted, setDragStarted] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesChange = (files: FileList | null) => {
    const newFiles = getNewUniqueFiles(files, maxFiles, value, accept, maxSizeBytes, multiple);
    if (newFiles.length > 0) {
      onChange?.(newFiles);
    }
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (value.length === maxFiles) {
      return;
    }
    handleFilesChange(event.target.files);
  };

  const onDeleteFile = (fileName: string) => {
    const newValue = [...(value || [])].filter((file: File | string) => {
      if (typeof file === 'string') {
        return file !== fileName;
      } else if (file instanceof File) {
        return file.name !== fileName;
      } else return false;
    });
    onChange?.(newValue);
  };

  const handleDragEvent = (event: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
    event.preventDefault();
    event.stopPropagation();
    setDragStarted(isEntering);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFilesChange(event.dataTransfer.files);
    setDragStarted(false);
  };

  const inputFileClasses = cn(cls.inputFileContainer, className, {
    [cls.error]: error,
    [cls.dragging]: isDragStarted,
    [cls.readOnly]: readOnly,
  });

  return (
    <div
      className={inputFileClasses}
      onDragOver={(e) => handleDragEvent(e, true)}
      onDragEnter={(e) => handleDragEvent(e, true)}
      onDragLeave={(e) => handleDragEvent(e, false)}
      onDrop={handleDrop}>
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
        type="file"
        multiple={multiple}
        onChange={onChangeHandler}
        readOnly={readOnly}
        accept={accept}
        disabled={readOnly}
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
        className={cn(cls.inputLabel, 'group')}
        htmlFor={name}>
        {(!value || value.length === 0) && (
          <span className={cls.labelText}>
            {label || 'Выберите файл'}
            {required && <span className={cls.asterisk}> *</span>}
          </span>
        )}
        {!multiple && !readOnly && (
          <span className="z-0 rounded-inherit bg-white/10 transition-opacity opacity-0 h-full group-hover:opacity-100 flex justify-center items-center w-full absolute inset-0">
            <Edit2 className="h-6 w-6 fill-white stroke-black" />
          </span>
        )}
      </label>
      {value && value.length > 0 && !multiple && (
        <div className="w-full h-full overflow-hidden rounded-inherit">
          <img
            src={typeof value[0] === 'string' ? value[0] : URL.createObjectURL(value[0])}
            className={cls.fileImage}
          />
        </div>
      )}
      {value && value.length > 0 && multiple && (
        <div className={cls.files}>
          {value.map((file) => (
            <div
              className={cls.filePreviewCard}
              key={typeof file === 'string' ? file : file.name}>
              <Image
                width={100}
                height={100}
                src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                alt={typeof file === 'string' ? file : file.name}
                className={cls.fileImage}
              />
              {typeof file !== 'string' && <span className={cls.fileName}>{file.name}</span>}
              <AppButton
                type="button"
                onClick={() => onDeleteFile(typeof file === 'string' ? file : file.name)}
                fullWidth
                variant="destructive"
                LeftIcon={<X className="w-auto h-4 stroke-1 stroke-current fill-current" />}>
                Удалить
              </AppButton>
              {file instanceof File && (
                <span className={cls.fileSize}>{(file.size / (1024 * 1024)).toFixed(4)} Мб</span>
              )}
            </div>
          ))}
        </div>
      )}
      <div className={cn(cls.filesInfo, { '!justify-center items-center': !multiple })}>
        {error && <span className={cls.errorText}>{error}</span>}
        <div className={cls.filesInfoText}>
          {multiple && (
            <span className="text-nowrap">
              {value.length}/{maxFiles}
            </span>
          )}
          {maxSize && <span className="text-nowrap">{`Макс. размер файла: ${maxSize} Мб`}</span>}
        </div>
      </div>
    </div>
  );
});

export const AppInputFile = React.memo(InputFile);

function getNewUniqueFiles(
  newFiles: FileList | File[] | null,
  maxFiles: number,
  currentFiles: (File | string)[] | null,
  accept: string = '*/*',
  maxSizeBytes?: number | null,
  multiple?: boolean,
): (File | string)[] {
  const currentFilesArray = [...(currentFiles || [])];
  const newFilesArray = [...(newFiles || [])];

  const isValidFile = (file: File): boolean => {
    return (
      RegExp(accept).test(file.type) &&
      (!maxSizeBytes || file.size <= maxSizeBytes) &&
      !currentFilesArray.find((f) => f instanceof File && f.name === file.name)
    );
  };

  if (!multiple) {
    for (const file of newFilesArray) {
      if (isValidFile(file)) {
        return [file];
      }
    }
    return currentFilesArray;
  }

  for (const newFile of newFilesArray) {
    if (currentFilesArray.length >= maxFiles) break;
    if (isValidFile(newFile)) {
      currentFilesArray.push(newFile);
    }
  }
  return currentFilesArray;
}

InputFile.displayName = 'AppInputFile';
