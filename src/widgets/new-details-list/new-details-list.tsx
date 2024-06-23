'use client';
import { cn } from '@/shared/lib/utils';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { DetailsCardsList, getDetailsByParams } from '@entities/detail/client';
import { useQuery } from '@tanstack/react-query';

interface NewDetailsListProps {
  className?: string;
}
export const NewDetailsList = ({ className }: NewDetailsListProps) => {
  const { data: details, isPending } = useQuery({
    ...getDetailsByParams({
      novelty: true,
    }),
  });

  return (
    <section
      id="new"
      className={cn('flex flex-col gap-4', className, { 'opacity-70': details?.length === 0 })}>
      <AppLink
        scroll={false}
        className="w-fit"
        href="#new">
        <h2>Новинки</h2>
      </AppLink>
      <DetailsCardsList
        details={details}
        isPending={isPending}
      />
    </section>
  );
};
