"use client";
import Link from "next/link";
import { useResNavt } from "@/src/hooks/useResNav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: 1, name: "Inicio", href: "/" },
  { id: 2, name: "Nuestro Menu", href: "/menu" },
  { id: 3, name: "Como Funciona", href: "/como-funciona" },
  { id: 4, name: "¿Quiénes Somos?", href: "/quienes-somos" },
];

export default function ResponsiveNavLinks() {
  const { resnav, handleShowResNav } = useResNavt();
  const pathname = usePathname();
  const [myResNav, setMyResNav] = useState<String>("translate-y-[-150%]");

  useEffect(() => {
    if (resnav != "") {
      setMyResNav(resnav);
    }
  }, [resnav]);

  return (
    <div
      className={`fixed w-full top-0 r-0 transition-transform  ${myResNav} duration-500 ease-in-out box-shadow-md z-40`}
    >
      <div className=" pb-6 px-28 md:px-12 sm:px-12 pt-36  bg-[#fffffff9] rounded-b-2xl divide-y-[15px] divide-transparent 2xl:hidden xl:hidden sm:pt-40">
        <ul className="flex flex-col  justify-end text-end text-sm items-end bg-transparent rounded-b-2xl divide-y-[30px] divide-transparent 2xl:hidden xl:hidden">
          {links.map((link, index) => {
            return (
              <li key={link.id || index}>
                <Link
                  href={link.href}
                  className={`hover:text-colortext ${
                    pathname === link.href ? "text-colortext" : "text-black"
                  }`}
                >
                  <button onClick={handleShowResNav}>{link.name}</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
