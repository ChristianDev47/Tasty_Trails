"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, name: "Inicio", href: "/" },
  { id: 2, name: "Nuestro Menu", href: "/menu" },
  { id: 3, name: "Como Funciona", href: "/como-funciona" },
  { id: 4, name: "¿Quiénes Somos?", href: "/quienes-somos" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="col-span-8 mx-[5rem] lg:hidden md:hidden sm:hidden">
      <ul className="flex justify-between h-[5rem] items-center font-semibold">
        {links.map((link, index) => {
          return (
            <li key={link.id || index}>
              <Link
                href={link.href}
                className={`rounded-lg px-4 leading-6 cursor-pointer inline-block transition text-black hover:text-primary  ${
                  pathname === link.href ? "text-primary" : "  text-black"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
