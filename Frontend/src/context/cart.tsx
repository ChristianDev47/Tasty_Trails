"use client";
import { ReactNode, createContext, useState } from "react";

interface TypeCart {
  carrito: String;
  handleShowCart: () => void;
  handleCloseCart: () => void;
}
const InitialStatesCart = {
  carrito: "",
  handleShowCart: () => {},
  handleCloseCart: () => {},
};

export const CartContext = createContext<TypeCart>(InitialStatesCart);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<string>("translate-x-[150%]");

  const handleShowCart = () => {
    setCarrito("translate-x-[0%]");
  };

  const handleCloseCart = () => {
    setCarrito("translate-x-[150%]");
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        handleShowCart,
        handleCloseCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
