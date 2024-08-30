"use client";

import { createContext, useState, ReactNode } from "react";

type CategoryContextType = {
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number) => void;
};

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    2
  );

  return (
    <CategoryContext.Provider
      value={{ selectedCategoryId, setSelectedCategoryId }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
