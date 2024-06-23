'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash-es';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { cn } from '@/shared/lib/utils';
import { AppInput } from '@/shared/ui/app-input/app-input';
import { useState } from 'react';
import { routes } from '@/shared/config/routes';

interface SearchBarProps {
  className?: string;
}

const updateSearchParams = debounce((value, router: AppRouterInstance) => {
  router.push(`?search=${value}`);
}, 400);

export const UpdateSearchParamsBar = (props: SearchBarProps) => {
  const { className } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search'));
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParams(e.target.value, router);
    setValue(e.target.value);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (pathname?.includes('catalog')) {
        router.push(`?search=${e.currentTarget.value}`);
      } else {
        router.push(`${routes.navbarRoutes.main.sub?.catalog.fullPath}?search=${e.currentTarget.value}`);
      }
    }
  };

  return (
    <div className={cn('flex items-center gap-4 flex-grow max-w-96 w-auto min-w-40', className)}>
      <AppInput
        label={'Найти'}
        className={'flex-grow h-full'}
        placeholder={'Найти'}
        onChange={onChange}
        onKeyDown={onEnterPress}
        value={value ?? ''}
      />
    </div>
  );
};
