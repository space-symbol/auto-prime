'use client';
import { DetailsCardsList, useGetDetailsQuery } from '@/entities/detail/client';
import classNames from 'classnames';
import { cn } from '@/shared/lib/utils';
import { AppLink } from '@/shared/ui/app-link/app-link';

interface PromotionsDetailsListProps {
  className?: string;
}

export const PromotionsDetailsList = ({ className }: PromotionsDetailsListProps) => {
  const { details, isPending } = useGetDetailsQuery({
    promoted: true,
  });

  return (
    <section
      id="sale"
      className={cn(
        classNames('flex flex-col gap-4 overflow-visible', className, { 'opacity-70': details?.length === 0 }),
      )}>
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
