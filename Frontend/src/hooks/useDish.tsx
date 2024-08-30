"use client";

import { useContext } from "react";
import { DishContext } from "../context/dish";

export const useDish = () => {
  const context = useContext(DishContext);
  if (context === undefined) {
    throw new Error("useDish must be used within a DishContext");
  }

  return context;
};
