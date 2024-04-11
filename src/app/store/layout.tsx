'use client';
import { NavbarProvider } from '@/widgets/navbar/navbar-context';
import { Navbar } from '@widgets/navbar/navbar';
import { TopBar } from '@widgets/top-bar/top-bar';
import classNames from 'classnames';

const ShopLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <NavbarProvider>
      <div className="flex h-full relative text-black">
        <Navbar />
        <TopBar />
        <div
          className={classNames('flex flex-grow mt-topBar py-4 pl-pageLeft pr-pageRight overflow-auto transition-flex')}
        >
          {children}
        </div>
      </div>
    </NavbarProvider>
  );
};

export default ShopLayout;
