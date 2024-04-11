import classNames from 'classnames';
import { AppInput } from '@shared/ui/app-input/app-input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash-es';
// import FilterIcon from '@assets/icons/filter.svg?url';

interface SearchBarProps {
  className?: string;
}

export const SearchDetailsBar = (props: SearchBarProps) => {
  const { className } = props;
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathname = usePathname();
  const defaultValue = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState<string>(defaultValue);

  const onSearch = useMemo(
    () =>
      debounce(() => {
        if (pathname === '/store') {
          router.push(`?search=${searchValue}`);
        }
      }, 600),
    [searchValue],
  );

  const onSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (pathname !== '/store') {
        router.push(`/store?search=${searchValue}`);
      }
    }
  };
  useEffect(() => {
    onSearch();
  }, [onSearch]);

  return (
    <div className={classNames('flex items-center gap-4 flex-grow max-w-96 w-auto min-w-40', className)}>
      <AppInput
        search
        label={'Найти'}
        className={'flex-grow h-full'}
        placeholder={'Найти'}
        value={searchValue}
        onChange={onSearchValueChange}
        onKeyDown={onEnterPress}
      />
      {/*<Image src={FilterIcon} alt={''} className={'w-4 h-auto'}/>*/}
    </div>
  );
};
