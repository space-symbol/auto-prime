'use client';
import { useGetNewDetailsQuery } from '@/entities/detail/_queries';
import { DetailsCardsList } from '@/entities/detail/details-cards-list/details-cards-list';

export const NewDetails = () => {
  const { newDetails, isPending } = useGetNewDetailsQuery();
  return (
    <section className="flex flex-col gap-4">
      <h2>Новинки</h2>
      {newDetails ? (
        <DetailsCardsList
          details={newDetails}
          isPending={isPending}
        />
      ) : (
        <div className="text-center">Пусто</div>
      )}
    </section>
  );
};
