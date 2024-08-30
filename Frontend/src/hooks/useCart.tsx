"use client";

import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within a OrderProvider");
  }

  return context;
};
