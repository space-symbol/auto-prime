import { SearchParamsDetailslist } from '@/widgets/search-params-details-list/search-prams-details-list';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Каталог',
  description: 'Каталог запчастей',
};

const CatalogPage = () => {
  return (
    <main className="flex flex-col gap-4 flex-grow h-full">
      <h1>Каталог</h1>
      <Suspense>
        <SearchParamsDetailslist />
      </Suspense>
    </main>
  );
};

export default CatalogPage;
