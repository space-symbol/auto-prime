import { AppLink } from '@/shared/ui/app-link/app-link';
import { usePathname } from 'next/navigation';

export interface NavbarLinkProps {
  title: string;
  href: string;
}

export const NavbarLink = (props: NavbarLinkProps) => {
  const { href, title } = props;
  const pathname = usePathname();
  return (
    <li className={'block text-lg h-auto border-y-gray'}>
      <AppLink active={pathname === href} className={'block p-4 w-full uppercase'} href={href}>
        {title}
      </AppLink>
    </li>
  );
};
