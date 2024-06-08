'use client';
import { createContext, useContext, useState } from 'react';

interface NavbarContextProps {
  navbarIsActive: boolean;
  setNavbarIsActive: (value: boolean) => void;
}
const NavbarContext = createContext({} as NavbarContextProps);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [navbarIsActive, setNavbarIsActive] = useState<boolean>(false);

  return (
    <NavbarContext.Provider
      value={{
        navbarIsActive,
        setNavbarIsActive,
      }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
