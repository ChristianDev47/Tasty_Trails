"use client";
import { ReactNode, createContext, useState } from "react";

interface TypeResNav {
  resnav: String;
  handleShowResNav: () => void;
}
const InitialStatesResNav = {
  resnav: "translate-y-[-150%]",
  handleShowResNav: () => {},
};

export const ResNavContext = createContext<TypeResNav>(InitialStatesResNav);

export function ResNavProvider({ children }: { children: ReactNode }) {
  const [resnav, setResNav] = useState<string>("translate-y-[-150%]");

  const handleShowResNav = () => {
    resnav === "translate-y-[-150%]"
      ? setResNav("translate-y-[0%]")
      : setResNav("translate-y-[-150%]");
  };
  return (
    <ResNavContext.Provider
      value={{
        resnav,
        handleShowResNav,
      }}
    >
      {children}
    </ResNavContext.Provider>
  );
}
