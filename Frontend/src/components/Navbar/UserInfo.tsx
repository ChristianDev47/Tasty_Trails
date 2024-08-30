"use client";
import { CartButton, ResponsiveButton, UserButton } from "./Buttons";
import { useOrder } from "@/src/hooks/useOrder";
import { useCart } from "@/src/hooks/useCart";
import { useResNavt } from "@/src/hooks/useResNav";
export default function UserInfo() {
  const { order } = useOrder();
  let numDishes = 0;
  order.map((dish) => (numDishes += dish.count));

  const { handleShowCart } = useCart();
  const { handleShowResNav } = useResNavt();

  return (
    <div className="flex items-center w-full col-span-2  lg:col-span-10 md:col-span-10 sm:col-span-10 justify-end">
      <div className="flex justify-end items-center w-full gap-[1rem] sm:gap-[.2rem]">
        <UserButton />
        <CartButton showCart={handleShowCart} numDishes={numDishes} />
        <ResponsiveButton showResNav={handleShowResNav} />
      </div>
    </div>
  );
}
