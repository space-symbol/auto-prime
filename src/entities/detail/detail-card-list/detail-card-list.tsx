'use client';
import classNames from 'classnames';
import { useGetDetailsByParamsQuery } from '../_queries';
import cls from './detail-card-list.module.css';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchOptions } from '../_domain/types';
import { Skeleton } from '@/shared/ui/skeleton';
import { DetailCard } from '../_ui/detail-card/detail-card';

interface CardListProps {
  className?: string;
}

export const DetailCardList = (props: CardListProps) => {
  const { className } = props;

  const searchParams = useSearchParams()!;

  const searchOptions: SearchOptions = useMemo(
    () => ({
      searchValue: searchParams.get('search') ?? '',
      order: searchParams.get('order') ?? '',
      sort: searchParams.get('sort') ?? '',
    }),
    [searchParams],
  );
  let { details, isPending, refetch } = useGetDetailsByParamsQuery(searchOptions);
  const renderDetailsSkeletons = () =>
    Array(10)
      .fill(0)
      .map((_, index) => <Skeleton appearanceDelay={500} isPending={isPending} className="bg-grayLight" key={index} />);

  useEffect(() => {
    refetch();
  }, [refetch, searchOptions]);
  console.log(searchOptions);

  return (
    <div className={classNames(cls.detailCardList, className)}>
      {isPending
        ? renderDetailsSkeletons()
        : details?.map((detail) => (
            <DetailCard detail={detail} key={detail.id} searchValue={searchOptions.searchValue} />
          ))}
    </div>
  );
};
