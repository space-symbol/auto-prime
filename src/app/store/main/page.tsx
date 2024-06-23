import { NewDetailsList } from '@/widgets/new-details-list/new-details-list';
import { PopularDetailsList } from '@/widgets/popular-details-list/popular-details-list';
import { PromotionsDetailsList } from '@/widgets/promotions-details-list/promotions-details-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Магазин',
  description: 'Главная страница магазина',
};

const StorePage = () => {
  return (
    <main className="flex flex-col flex-grow h-full gap-6 overflow-auto">
      <PromotionsDetailsList />
      <NewDetailsList />
      <PopularDetailsList />
    </main>
  );
};

export default StorePage;
