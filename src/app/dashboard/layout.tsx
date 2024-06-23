import { AppLink } from '@/shared/ui/app-link/app-link';
import { DashboardRoutes, routes } from '@/shared/config/routes';
import { AuthorizedGuard } from '@/entities/user/client';

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AuthorizedGuard>
      <div className={'mt-top-bar p-page flex-grow overflow-hidden bg-page h-full'}>
        <nav
          className={
            'bg-black flex items-center gap-4 justify-between h-top-bar fixed top-0 left-0 pl-page-left pr-page-right w-full z-top-bar'
          }>
          <ul className={'flex gap-4 items-center'}>
            {Object.entries(DashboardRoutes).map(([_, link]) => (
              <AppLink
                key={link.href}
                href={link.href}>
                {link.linkText}
              </AppLink>
            ))}
          </ul>
          <AppLink href={routes.navbarRoutes.main.href}>К магазину</AppLink>
        </nav>
        <div className={'h-full'}>{children}</div>
      </div>
    </AuthorizedGuard>
  );
};

export default DashboardLayout;
