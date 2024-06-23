'use client';
import { cn } from '@/shared/lib/utils';
import cls from './details-cards-list.module.css';
import { Skeleton } from '@/shared/ui/skeleton';
import { DetailCard } from '../detail-card/detail-card';
import { DetailEntityWithDiscounts } from '../../_domain/types';
import { useCallback } from 'react';

interface DetailsCardsListProps {
  className?: string;
  details: DetailEntityWithDiscounts[] | undefined;
  isPending: boolean;
  searchValue?: string;
  skeletonsAmount?: number;
}

export const DetailsCardsList = (props: DetailsCardsListProps) => {
  const { className, details, isPending, searchValue, skeletonsAmount = 8 } = props;
  const renderDetailsSkeletons = useCallback(
    () =>
      Array(skeletonsAmount)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            appearanceDelay={500}
            isPending={isPending}
            key={index}
          />
        )),
    [skeletonsAmount, isPending],
  );

  let content = null;
  if (isPending && !details?.length) {
    content = renderDetailsSkeletons();
  }

  if (!details?.length && !isPending) {
    content = <span className="select-none">Пока ничего</span>;
  }

  if (details && details.length > 0) {
    content = details.map((detail) => (
      <DetailCard
        detail={detail}
        key={detail.id}
        searchValue={searchValue}
        className="rounded-sm"
      />
    ));
  }

  return (
    <div className={cn(cls.detailsCardsList, className, { [cls.error]: !details?.length && !isPending })}>
      {content}
    </div>
  );
};
