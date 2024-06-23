import { CartProvider } from '@/features/cart/client';
import { NavbarProvider } from '@/widgets/navbar/navbar';
import { Navbar } from '@widgets/navbar/navbar';
import { TopBar } from '@widgets/top-bar/top-bar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Магазин запчастей',
    template: '%s | Магазин запчастей | Auto Prime',
  },
};

const StoreLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <NavbarProvider>
      <CartProvider>
        <div className="flex h-full relative">
          <Navbar />
          <TopBar />
          <div className="flex flex-col flex-grow w-full mt-top-bar bg-page p-4 sm:p-page transition-flex overflow-auto">
            {children}
          </div>
        </div>
      </CartProvider>
    </NavbarProvider>
  );
};

export default StoreLayout;
