import classNames from 'classnames';
import { AppLink } from '@shared/ui/app-link/app-link';
import { Logo } from '@shared/ui/logo/logo';

export interface HeaderLink {
  item: React.ReactNode;
  link?: string;
}

interface HeaderProps {
  className?: string;
  activeIndex: number;
  headerLinks: HeaderLink[];
}

export const Header = (props: HeaderProps) => {
  const { className, activeIndex, headerLinks } = props;

  return (
    <header
      className={classNames(
        'flex items-center justify-between flex-col md:flex-row flex-shrink-0 gap-4 w-full text-white bg-black bg-opacity-80 md:bg-opacity-100 p-page-x h-screen py-3 md:h-header',
        className,
      )}>
      <Logo className={'max-w-[200px] md:h-full'} />
      <nav className={'flex-grow flex  justify-around h-full items-center'}>
        <ul className={'flex gap-6 flex-col md:flex-row items-center'}>
          {headerLinks.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li
                className={'uppercase text-3xl md:text-lg'}
                key={index}>
                {item.link ? (
                  <AppLink
                    href={item.link}
                    active={isActive}
                    variant={isActive ? 'underlined' : 'hover'}>
                    {item.item}
                  </AppLink>
                ) : (
                  item.item
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
