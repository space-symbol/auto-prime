'use client';
import { DetailsCardsList, getDetailsByParams } from '@entities/detail/client';
import { memo, useEffect } from 'react';
import { useGetQueryParams } from '@/shared/hooks/use-get-query-params';
import { searchDetailsParamsSchema } from '@entities/detail/_domain/schemas';
import { useQuery } from '@tanstack/react-query';

export const SearchParamsDetailslist = memo(() => {
  const searchQueryParams = useGetQueryParams(searchDetailsParamsSchema);

  const {
    data: details,
    isPending,
    refetch,
  } = useQuery({
    ...getDetailsByParams(searchQueryParams),
  });

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
