import classNames from 'classnames';
import { AppLink, AppLinkTheme } from '@shared/ui/app-link/app-link';
import { Logo } from '@shared/ui/logo/logo';

export interface HeaderItem {
  item: React.ReactNode;
  link?: string;
}

interface HeaderProps {
  className?: string;
  activeIndex: number;
}

export const Header = (props: HeaderProps) => {
  const { className, activeIndex } = props;

  const headerItems: HeaderItem[] = [
    {
      item: 'Магазин',
      link: '/store',
    },
  ];

  return (
    <header
      className={classNames(
        'flex items-center justify-between flex-col flex-shrink-0 gap-4 w-full bg-black bg-opacity-60 md:bg-opacity-100 p-pageX h-screen pl-pageLeft pr-pageRight pt-3 md:h-header md:flex-row',
        className,
      )}>
      <Logo className={'max-w-[200px] md:h-full'} />
      <nav className={'flex-grow flex justify-around h-full items-center'}>
        <ul>
          {headerItems.map((item, index) => (
            <li
              className={'uppercase text-3xl sm:text-lg'}
              key={index}>
              {item.link ? (
                <AppLink
                  href={item.link}
                  active={activeIndex === index}
                  theme={activeIndex === index ? AppLinkTheme.UNDERLINE : AppLinkTheme.HOVER}>
                  {item.item}
                </AppLink>
              ) : (
                item.item
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
