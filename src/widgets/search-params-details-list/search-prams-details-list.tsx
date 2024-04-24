'use client';
import { SearchOptions } from '@/entities/detail/_domain/types';
import { useGetDetailsByParamsQuery } from '@/entities/detail/_queries';
import { DetailsCardsList } from '@/entities/detail/details-cards-list/details-cards-list';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export const SearchParamsDetailslist = () => {
  const searchParams = useSearchParams()!;
  const searchOptions: SearchOptions = useMemo(
    () => ({
      searchValue: searchParams.get('search') ?? '',
      order: searchParams.get('order') ?? '',
      sort: searchParams.get('sort') ?? '',
    }),
    [searchParams],
  );
  const { details, isPending, refetch } = useGetDetailsByParamsQuery(searchOptions);

  useEffect(() => {
    refetch();
  }, [refetch, searchOptions]);

  if (!searchParams) return 'null';
  return (
    <DetailsCardsList
      searchValue={searchOptions.searchValue}
      isPending={isPending}
      details={details}
    />
  );
};
