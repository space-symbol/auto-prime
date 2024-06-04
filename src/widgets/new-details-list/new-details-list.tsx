'use client';
import { cn } from '@/shared/lib/utils';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { DetailsCardsList, useGetDetailsQuery } from '@entities/detail/detail';
import classNames from 'classnames';

interface NewDetailsListProps {
  className?: string;
}
export const NewDetailsList = ({ className }: NewDetailsListProps) => {
  const { details, isPending } = useGetDetailsQuery({
    novelty: true,
  });

  return (
    <section
      id="new"
      className={cn(classNames('flex flex-col gap-4', className, { 'opacity-70': details?.length === 0 }))}>
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
