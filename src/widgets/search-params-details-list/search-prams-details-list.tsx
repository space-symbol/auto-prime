'use client';
import { DetailsCardsList, useGetDetailsQuery } from '@entities/detail/client';
import { memo, useEffect } from 'react';
import { useGetQueryParams } from '@/shared/hooks/use-get-query-params';
import { SearchDetailsParamsSchema } from '@entities/detail/_domain/schemas';

export const SearchParamsDetailslist = memo(() => {
  const searchQueryParams = useGetQueryParams(SearchDetailsParamsSchema);

  const { details, isPending, refetch } = useGetDetailsQuery(searchQueryParams);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <DetailsCardsList
      searchValue={searchQueryParams.search}
      isPending={isPending}
      details={details}
    />
  );
});

SearchParamsDetailslist.displayName = 'SearchParamsDetailslist';
