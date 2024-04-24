'use client';
import classNames from 'classnames';
import { AppInput } from '@shared/ui/app-input/app-input';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { debounce } from 'lodash-es';
// import FilterIcon from '@assets/icons/filter.svg?url';

interface SearchBarProps {
  className?: string;
}

export const SearchDetailsBar = (props: SearchBarProps) => {
  const { className } = props;
  const router = useRouter();
  const pathname = usePathname();

  const onSearchValueChange = useMemo(
    () =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        if (pathname === '/store/catalog') {
          router.push(`?search=${e.target.value}`);
        }
      }, 400),
    [pathname, router],
  );

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (pathname !== '/store/catalog') {
        router.push(`/store/catalog/?search=${e.currentTarget.value}`);
      } else {
        router.push(`?search=${e.currentTarget.value}`);
      }
    }
  };

  return (
    <div className={classNames('flex items-center gap-4 flex-grow max-w-96 w-auto min-w-40', className)}>
      <AppInput
        search
        label={'Найти'}
        className={'flex-grow h-full'}
        placeholder={'Найти'}
        onChange={onSearchValueChange}
        onKeyDown={onEnterPress}
      />
      {/*<Image src={FilterIcon} alt={''} className={'w-4 h-auto'}/>*/}
    </div>
  );
};
