'use client';
import { getDetailsByParams, DetailsCardsList } from '@/entities/detail/client';
import { cn } from '@/shared/lib/utils';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { useQuery } from '@tanstack/react-query';

interface PopularDetailsListProps {
  className?: string;
}
export const PopularDetailsList = ({ className }: PopularDetailsListProps) => {
  const { data: details, isPending } = useQuery({
    ...getDetailsByParams({
      popular: true,
    }),
  });

  return (
    <section
      id="popular"
      className={cn('flex flex-col gap-4', className, { 'opacity-70': details?.length === 0 })}>
      <AppLink
        scroll={false}
        className="w-fit"
        href="#popular">
        <h2>Популярное</h2>
      </AppLink>
      <DetailsCardsList
        details={details}
        isPending={isPending}
      />
    </section>
  );
};
