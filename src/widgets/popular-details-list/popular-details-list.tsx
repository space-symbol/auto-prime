'use client';
import { useGetDetailsQuery, DetailsCardsList } from '@/entities/detail/client';
import classNames from 'classnames';
import { cn } from '@/shared/lib/utils';
import { AppLink } from '@/shared/ui/app-link/app-link';

interface PopularDetailsListProps {
  className?: string;
}
export const PopularDetailsList = ({ className }: PopularDetailsListProps) => {
  const { details, isPending } = useGetDetailsQuery({
    popular: true,
    limit: 5,
  });

  return (
    <section
      id="popular"
      className={cn(classNames('flex flex-col gap-4', className, { 'opacity-70': details?.length === 0 }))}>
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
