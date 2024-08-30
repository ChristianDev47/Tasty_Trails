"use client";
import { CartProvider } from "../context/cart";

import NavLinks from "./Navbar/Nav-links";
import UserInfo from "./Navbar/UserInfo";
import Logo from "./Navbar/Logo";
import Cart from "./Cart/Cart";
import Information from "./Navbar/Information";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ResNavProvider } from "../context/responsiveNav";
import ResponsiveNavLinks from "./Navbar/Responsive-links";

export default function Navbar() {
  const pathname = usePathname();

  const [header, setHeader] = useState<Boolean>(false);
  const scrollHeader = () => {
    window.scrollY >= 80 ? setHeader(true) : setHeader(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
  }, []);

  return (
    <CartProvider>
      <ResNavProvider>
        <div className="fixed top-0 flex flex-col justify-end w-full z-[100] ">
          <Information />
          <div
            className={`${
              header || pathname !== "/"
                ? "bg-second shadow-lg"
                : "bg-transparent"
            }  px-[10rem] lg:px-[3.5rem] md:px-[3.5rem] sm:px-[1rem] transition-all duration-300  scroll text-[13px] w-full flex justify-center`}
          >
            <nav className="grid grid-cols-12 grid-rows-1 gap-0 w-full max-w-[1536px]">
              <Logo />
              <NavLinks />
              <UserInfo />
            </nav>
          </div>
        </div>
        <Cart />
        <ResponsiveNavLinks />
      </ResNavProvider>
    </CartProvider>
  );
}
