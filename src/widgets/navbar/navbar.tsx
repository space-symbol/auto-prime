'use client';
import { Logo } from '@shared/ui/logo/logo';
import classNames from 'classnames';
import { useNavbarContext } from './navbar-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { NavbarLink } from './_ui/navbar-link';
import { useEffect, useState } from 'react';

interface NavbarProps {
  className?: string;
}

interface NavbarLinks {
  text: string;
  href: string;
  children?: NavbarLinks[];
}
const navbarLinks: NavbarLinks[] = [
  {
    text: 'Магазин',
    href: '/store',
    children: [
      {
        text: 'Акции и Скидки',
        href: '#sale',
      },
      {
        text: 'Новинки',
        href: '#new',
      },
      {
        text: 'Популярное',
        href: '#popular',
      },
      {
        text: 'Каталог',
        href: '/catalog',
      },
    ],
  },
  {
    text: 'Контакты',
    href: '/store/contacts',
  },
  {
    text: 'О нас',
    href: '/store/about',
  },
  {
    text: 'Главная',
    href: '/',
  },
];

export const Navbar = (props: NavbarProps) => {
  const { className } = props;
  const { navbarIsActive, changeNavbarIsActive } = useNavbarContext();
  const [inited, setInited] = useState(false);
  useEffect(() => {
    setInited(true);
  }, []);

  const renderLinks = (links: NavbarLinks[], rootHref?: string) => {
    return (
      <li className={'[&:has(div[data-state=open])]:flex-grow flex flex-col flex-grow-[0.0001] transition-flex-grow'}>
        {links.map((link) => {
          const path = rootHref ? rootHref + link.href : link.href;
          return link.children ? (
            <Accordion
              defaultValue={navbarLinks[0].text}
              key={path}
              className={
                '[&:has(div[data-state=open])]:flex-grow flex-grow-[0.0001] transition-flex-grow flex flex-col'
              }
              type="single"
              collapsible>
              <AccordionItem
                className={
                  '[&:has(div[data-state=open])]:flex-grow [&:has(div[data-state=open])]:border-y-whit flex-grow-[0.0001 border-y transition-all border-y-black [&>div]:text-inherit'
                }
                value={link.text}>
                <AccordionTrigger className={'p-0 hover:no-underline pr-3 transition-all '}>
                  <NavbarLink
                    navbarIsActive={navbarIsActive}
                    setNavbarIsActive={changeNavbarIsActive}
                    className={'uppercase'}
                    href={path}>
                    {link.text}
                  </NavbarLink>
                </AccordionTrigger>
                <AccordionContent className={'text-inherit'}>
                  <ul className="normal-case flex flex-col gap-4">{renderLinks(link.children, path)}</ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <NavbarLink
              navbarIsActive={navbarIsActive}
              setNavbarIsActive={changeNavbarIsActive}
              key={path}
              href={path}>
              {link.text}
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
          'fixed top-0 animate-translate-left h-screen w-screen left-[-100%] bg-black bg-opacity-60 z-backdrop lg:hidden',
          {
            'animate-translate-right': navbarIsActive,
            'motion-safe:flex motion-safe:left-0': inited,
          },
        )}
      />
      <header
        className={classNames(
          'items-center bg-black lg:flex h-full justify-between animate-translate-left w-navbar lg:animate-none flex-col flex-shrink-0 left-[-100%] gap-4 z-navbar top-0 fixed overflow-auto lg:static',
          className,
          {
            'motion-safe:animate-translate-right': navbarIsActive,
            'motion-safe:flex motion-safe:left-0': inited,
          },
        )}>
        <Logo className={'w-[80%] h-auto p-page'} />
        <nav className={'font-montserrat flex-grow w-full flex flex-col pt-6'}>
          <ul className={'text-white font-golos text-base uppercase flex flex-col flex-grow justify-center'}>
            {renderLinks(navbarLinks)}
          </ul>
        </nav>
      </header>
    </>
  );
};

// export default Navbar;
