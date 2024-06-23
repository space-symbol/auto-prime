'use client';
import { DetailsCardsList, getDetailsByParams } from '@/entities/detail/client';
import { cn } from '@/shared/lib/utils';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { useQuery } from '@tanstack/react-query';

interface PromotionsDetailsListProps {
  className?: string;
}

export const PromotionsDetailsList = ({ className }: PromotionsDetailsListProps) => {
  const { data: details, isPending } = useQuery({
    ...getDetailsByParams({
      promoted: true,
    }),
  });

  return (
    <section
      id="sale"
      className={cn('flex flex-col gap-4 overflow-visible', className, { 'opacity-70': details?.length === 0 })}>
      <AppLink
        scroll={false}
        href="#sale">
        <h2>Акции и Скидки</h2>
      </AppLink>
      <DetailsCardsList
        details={details}
        isPending={isPending}
      />
    </section>
  );
};
