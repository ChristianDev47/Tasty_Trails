"use client";

import { lilita, poppinsBold } from "@/src/app/ui/fonts";
import { useOrder } from "@/src/hooks/useOrder";
import { Dish } from "@/src/types/dish";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  dish: Dish;
}

export default function BotonesCompra({ dish }: Props) {
  const { addtoOrder, removeFromOrder, order } = useOrder();
  const [numOrder, setNumOrder] = useState<number>(0);

  useEffect(() => {
    const myOrder = order.filter((item) => item.dish_id === dish.id)[0];
    if (myOrder) {
      setNumOrder(myOrder.count);
    } else {
      setNumOrder(0);
    }
  }, [order]);

  const DishToOrder = {
    dish_id: dish.id ?? 1,
    count: 1,
    price: dish.price,
  };

  return (
    <>
      <div className="w-full grid grid-cols-3 gap-4  my-4 mb-[2rem] lg:mb-[0]">
        <div className="flex flex-col justify-center items-start col-span-1">
          <p className="text-black text-[14px]">Precio:</p>
          <h1
            className={`${poppinsBold.className} antialiased leading-[2.8rem] text-[1.7rem]  pr-8 text-colortext text-center`}
          >
            {dish.price}$
          </h1>
        </div>
        <div className="flex flex-col justify-center items-start col-span-2">
          <p className="text-black text-[14px]">Cantidad:</p>
          <div className="flex justify-evenly text-center rounded-lg border-2 border-[#383838]">
            <button
              onClick={() => {
                setNumOrder(numOrder - 1);
                removeFromOrder(DishToOrder);
                if (numOrder == 1) {
                  toast.error(`Eliminaste ${dish.name} del carrito.`, {
                    duration: 4000,
                  });
                }
              }}
              className="px-3 text-[20px]"
              disabled={numOrder == 0 ? true : false}
            >
              -
            </button>
            <p className="w-12 text-center flex justify-center items-center bg-gray">
              {numOrder}
            </p>
            <button
              onClick={() => {
                setNumOrder(numOrder + 1);
                addtoOrder(DishToOrder);
                if (numOrder === 0) {
                  toast.success(`Agregaste ${dish.name} al carrito.`, {
                    duration: 4000,
                    style: {
                      background: "#7DA640",
                      color: "#fff",
                    },
                    iconTheme: {
                      primary: "#fff",
                      secondary: "#000",
                    },
                  });
                }
              }}
              className="px-3 text-[20px]"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
