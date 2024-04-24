import { NewDetails } from '@/widgets/new-details/new-details';
import { PopularDetails } from '@/widgets/popular-details/popular-details';
import { PromotionsDetails } from '@/widgets/promotions-details/promotions-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Магазин',
  description: 'Главная страница магазина',
};

const StorePage = () => {
  return (
    <main className="flex flex-col text-black flex-grow h-full gap-6">
      <PopularDetails />
      <NewDetails />
      <PromotionsDetails />
    </main>
  );
};

export default StorePage;
