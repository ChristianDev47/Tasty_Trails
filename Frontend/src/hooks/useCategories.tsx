"use client";

import { useContext } from "react";
import { CategoryContext } from "../context/category";

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
};
