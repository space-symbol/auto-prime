'use client';
import { Logo } from '@shared/ui/logo/logo';
import classNames from 'classnames';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { NavbarLink } from './navbar-link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes, NavbarRoute } from '@/shared/config/routes';
import { useNavbarContext } from './navbar-context';

interface NavbarProps {
  className?: string;
}

export const Navbar = (props: NavbarProps) => {
  const { className } = props;
  const [inited, setInited] = useState(false);
  const pathname = usePathname();
  const { navbarIsActive, changeNavbarIsActive } = useNavbarContext();

  useEffect(() => {
    setInited(true);
  }, []);

  const renderLinks = (links: Record<string, NavbarRoute>) => {
    return (
      <li className={'[&:has(div[data-state=open])]:flex-grow flex flex-col flex-grow-[0.0001] transition-flex-grow'}>
        {Object.entries(links).map(([_, link]) => {
          const path = link?.parent ? link.fullPath : link.href;
          return link.sub ? (
            <Accordion
              collapsible
              defaultValue={routes.navbarRoutes.main.linkText}
              key={path}
              className={
                '[&:has(div[data-state=open])]:flex-grow flex-grow-[0.0001] transition-flex-grow flex flex-col'
              }
              type="single">
              <AccordionItem
                className={
                  '[&:has(div[data-state=open])]:flex-grow flex-grow-[0.0001 border-y transition-all border-none [&>div]:text-inherit text-navbar-foreground fill-navbar-foreground'
                }
                value={link.linkText}>
                <AccordionTrigger
                  className={'p-0 hover:no-underlined pr-3 transition-all focus:outline-1 text-navbar-foreground'}>
                  <NavbarLink
                    autoFocus
                    className={'uppercase outline-offset-[-0.1em]'}
                    href={path}
                    isRoot={!link.parent}
                    active={pathname.startsWith(path) && path !== routes.navbarRoutes.home.href}>
                    {link.linkText}
                  </NavbarLink>
                </AccordionTrigger>
                <AccordionContent className={'text-inherit'}>
                  <ul className="normal-case flex flex-col gap-4">{renderLinks(link.sub)}</ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavbarLink
              className={!link.fullPath ? 'text-lg' : ''}
              key={path}
              href={path}
              isRoot={!link.fullPath}>
              {link.linkText}
            </NavbarLink>
          );
        })}
      </li>
    );
  };

  return (
    <>
      <div
        onClick={() => changeNavbarIsActive(false)}
        className={classNames(
          'fixed top-0 transition-width duration-400 h-screen bg-black bg-opacity-60 z-backdrop lg:hidden',
          {
            'animate-translate-right w-screen': navbarIsActive,
            'w-0': !navbarIsActive,
            'motion-safe:flex motion-safe:left-0': inited,
          },
        )}
      />
      <header
        className={classNames(
          'items-center bg-navbar left-[-100%] transition-left duration-400 h-full justify-between w-navbar lg:animate-none flex-col flex-shrink-0 gap-4 z-navbar top-0 fixed overflow-auto lg:static lg:translate-x-0 lg:flex  p-page-y gutter-stable',
          className,
          {
            'animate-translate-right motion-safe:left-0': navbarIsActive,
            'left-[-100%] delay-75': !navbarIsActive,
            'motion-safe:flex': inited,
          },
        )}>
        <Logo className={'w-[80%] h-auto p-page pt-0'} />
        <nav className={'font-montserrat flex-grow w-full flex flex-col pt-6'}>
          <ul className={'text-white font-golos text-base uppercase flex flex-col flex-grow justify-center'}>
            {renderLinks(routes.navbarRoutes)}
          </ul>
        </nav>
      </header>
    </>
  );
};
