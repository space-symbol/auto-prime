'use client';
import { useGetPromitedDetailsQuery } from '@/entities/detail/_queries';
import { DetailsCardsList } from '@/entities/detail/details-cards-list/details-cards-list';

export const PromotionsDetails = () => {
  const { promitedDetails, isPending } = useGetPromitedDetailsQuery();

  return (
    <section className="flex flex-col gap-4">
      <h2>Акции и Скидки</h2>
      {promitedDetails ? (
        <DetailsCardsList
          details={promitedDetails}
          isPending={isPending}
        />
      ) : (
        <div className="text-center">Пусто</div>
      )}
    </section>
  );
};
