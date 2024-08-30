"use client";

import { useContext } from "react";
import { ResNavContext } from "../context/responsiveNav";

export const useResNavt = () => {
  const context = useContext(ResNavContext);
  if (context === undefined) {
    throw new Error("useResNav must be used within a ResNavProvider");
  }

  return context;
};
