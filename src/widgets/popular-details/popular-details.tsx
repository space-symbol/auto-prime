'use client';
import { useGetPopularDetailsQuery } from '@/entities/detail/_queries';
import { DetailsCardsList } from '@/entities/detail/details-cards-list/details-cards-list';

export const PopularDetails = () => {
  const { popularDetails, isPending } = useGetPopularDetailsQuery();
  return (
    <section className="flex flex-col gap-4">
      <h2>Популярное</h2>
      {popularDetails ? (
        <DetailsCardsList
          details={popularDetails}
          isPending={isPending}
        />
      ) : (
        <div className="text-center">Пусто</div>
      )}
    </section>
  );
};
