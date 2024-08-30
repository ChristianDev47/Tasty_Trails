"use client";
import { dm_sans } from "@/src/app/ui/fonts";
import { useDish } from "@/src/hooks/useDish";
import { useOrder } from "@/src/hooks/useOrder";
import { MenuDish, OrderDetail } from "@/src/types/dish";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  orderDish: OrderDetail;
}

export default function OrderDishCart({ orderDish }: Props) {
  const [dish, setDish] = useState<MenuDish>();
  const { dishData } = useDish();
  useEffect(() => {
    const myDish = dishData.dishes.find(dish => dish.dish_id === orderDish.dish_id)
    setDish(myDish);
  }, []);

  const price = parseFloat(orderDish.price).toString().replace(".", ",");
  const [count, setCount] = useState<number>(orderDish.count);

  const { addtoOrder, removeFromOrder, order, clearOrder } = useOrder();

  useEffect(() => {
    const myOrder = order.filter(
      (dish) => dish.dish_id === orderDish.dish_id
    )[0];
    if (myOrder) {
      setCount(myOrder.count);
    } else {
      setCount(0);
    }
  }, [order]);

  const DishToOrder = {
    dish_id: orderDish.dish_id,
    count: 1,
    price: orderDish.price,
  };

  return (
    <div>
      {dish && (
        <div
          className={`${dm_sans.className} antialiased flex justify-start w-full bg-[#ffffff] rounded-xl my-2`}
        >
          <Image
            className="rounded-l-xl"
            src={dish.dish.image}
            alt={dish.dish.name}
            width={140}
            height={140}
            priority
          />
          <div className="flex flex-col justify-start items-start text-sm  m-3 w-full">
            <div className="flex justify-between w-full font-semibold">
              <p className="">{dish.dish.name}</p>
              <button
                className="ml-4 flex text-center justify-center items-center"
                onClick={() => {
                  clearOrder(DishToOrder);
                  toast.error(`Eliminaste ${dish.dish.name} del carrito.`, {
                    duration: 4000,
                  });
                }}
              >
                <Image
                  src="/icons/trash.svg"
                  alt="Trash icon"
                  width={25}
                  height={25}
                />
              </button>
            </div>
            <div className="flex justify-between items-end w-full h-full">
              <p className="text-[18px] font-semibold">{price}$</p>
              <div
                className={`flex items-end text-second text-[18px] font-bold`}
              >
                <button
                  onClick={() => {
                    setCount(count - 1);
                    removeFromOrder(DishToOrder);
                    if (count == 1) {
                      toast.error(`Eliminaste ${dish.dish.name} del carrito.`, {
                        duration: 4000,
                      });
                    }
                  }}
                  className={`bg-colortext p-2 rounded-l-md`}
                >
                  -
                </button>
                <div className="bg-colortext text-[12px] py-2 px-3.5">
                  {count}
                </div>
                <button
                  onClick={() => {
                    setCount(count + 1);
                    addtoOrder(DishToOrder);
                  }}
                  className={`bg-colortext p-2 rounded-r-md`}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}
