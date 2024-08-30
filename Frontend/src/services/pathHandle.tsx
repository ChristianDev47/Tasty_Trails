// components/ClientPathnameHandler.tsx (Client Component)
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientPathnameHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAccountPage = pathname === "/checkout";

  return (
    <>
      {!isAccountPage && <Navbar />}
      {children}
      {!isAccountPage && <Footer />}
    </>
  );
}
