'use client';
import { createContext, useContext, useState } from 'react';

interface CartContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
