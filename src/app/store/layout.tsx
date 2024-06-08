import { SessionRefresh } from '@/features/auth/client';
import { CartProvider } from '@/features/cart/client';
import { NavbarProvider } from '@/widgets/navbar/navbar';
import { Navbar } from '@widgets/navbar/navbar';
import { TopBar } from '@widgets/top-bar/top-bar';
import classNames from 'classnames';
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
        <SessionRefresh>
          <div className="flex h-full relative">
            <Navbar />
            <TopBar />
            <div
              className={classNames(
                'flex flex-col flex-grow mt-top-bar  bg-page py-4 pl-page-left pr-page-right pb-page-bottom overflow-auto transition-flex',
              )}>
              {children}
            </div>
          </div>
        </SessionRefresh>
      </CartProvider>
    </NavbarProvider>
  );
};

export default StoreLayout;
