"use client";
import NoOrder from "./WithoutOrders";
import ShowOrder from "./ShowOrder";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { inter } from "@/src/app/ui/fonts";
import { useOrder } from "@/src/hooks/useOrder";
import { useEffect, useState } from "react";
import { useCart } from "@/src/hooks/useCart";

export default function Cart() {
  const { order } = useOrder();
  const { carrito, handleCloseCart } = useCart();
  const [mycart, setMycart] = useState<String>("translate-x-[150%]");

  useEffect(() => {
    if (carrito != "") {
      setMycart(carrito);
    }
  }, [carrito]);

  return (
    <div>
      {carrito !== "" && (
        <div>
          <div
            className={`${
              mycart === "translate-x-[0%]"
                ? "fixed w-full h-screen flex justify-end items-center top-0 r-0 box-shadow-md z-[150] bg-[#2222228b]"
                : ""
            }`}
          ></div>
          <div
            className={`fixed w-full h-screen flex justify-end items-center top-0 r-0 ${mycart} transition-transform duration-300 ease-in-out box-shadow-md z-[200] `}
          >
            <div className="h-screen bg-[#F2F0EC] xl:w-[450px] lg:w-[450px] md:w-[380px] sm:w-full relative">
              <div className=" flex justify-between items-center border-b-2 border-[#d8d8d8]">
                <p
                  className={` ${inter.className} antialiased mx-6 my-4 text-[18px] text-[#1f1f1f] font-bold`}
                >
                  Tu pedido
                </p>
                <div
                  className=" bg-[#eae8e4] rounded-full aspect-square mx-2 cursor-pointer"
                  onClick={handleCloseCart}
                >
                  <CloseRoundedIcon sx={{ fontSize: 20 }} />
                </div>
              </div>
              {order.length > 0 ? (
                <ShowOrder />
              ) : (
                <NoOrder closeCart={handleCloseCart} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
