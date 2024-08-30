// src/app/layout.tsx (Server Component)
import type { Metadata } from "next";
import { AuthProvider } from "../context/auth";
import { OrderProvider } from "../context/order";
import { poppins } from "./ui/fonts";

import "./globals.css";
import Loading from "../components/Loading";
import { Toaster } from "react-hot-toast";
import { CategoryProvider } from "../context/category";
import { DishProvider } from "../context/dish";
import ClientPathnameHandler from "../services/pathHandle";

export const metadata: Metadata = {
  title: "Tasty Trails",
  description: "Online Ordering",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="!scroll-smooth ">
      <body className={poppins.className + " antialiased"}>
          <AuthProvider>
            <OrderProvider>
              <CategoryProvider>
                <DishProvider>
                  <Loading>
                  <ClientPathnameHandler>{children}</ClientPathnameHandler>
                  <Toaster position="bottom-right" />
                  </Loading> 
                </DishProvider>
              </CategoryProvider>
            </OrderProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
