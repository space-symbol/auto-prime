import type { Metadata } from 'next';

export const metadata: Metadata = { description: 'Домашняя страница' };

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={'h-full'}>{children}</div>;
}
