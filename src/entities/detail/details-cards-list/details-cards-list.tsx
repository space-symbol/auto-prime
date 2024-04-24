'use client';
import classNames from 'classnames';
import cls from './details-cards-list.module.css';
import { Skeleton } from '@/shared/ui/skeleton';
import { DetailCard } from '../_ui/detail-card/detail-card';
import { DetailEntity } from '../_domain/types';
import { useCallback } from 'react';

interface DetailsCardsListProps {
  className?: string;
  details: DetailEntity[] | undefined;
  isPending: boolean;
  searchValue?: string;
  skeletonsAmount?: number;
}

export const DetailsCardsList = (props: DetailsCardsListProps) => {
  const { className, details, isPending, searchValue, skeletonsAmount = 10 } = props;

  const renderDetailsSkeletons = useCallback(
    () =>
      Array(skeletonsAmount)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            appearanceDelay={500}
            isPending={isPending}
            className="bg-grayLight"
            key={index}
          />
        )),
    [skeletonsAmount, isPending],
  );

  console.log(searchValue);
  return (
    <div className={classNames(cls.detailsCardsList, className)}>
      {isPending
        ? renderDetailsSkeletons()
        : details?.map((detail) => (
            <DetailCard
              detail={detail}
              key={detail.id}
              searchValue={searchValue}
            />
          ))}
    </div>
  );
};
