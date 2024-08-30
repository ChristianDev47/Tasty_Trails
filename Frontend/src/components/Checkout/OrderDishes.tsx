"use client";
import { dm_sans } from "@/src/app/ui/fonts";
import { useDish } from "@/src/hooks/useDish";
import { useOrder } from "@/src/hooks/useOrder";
import { MenuDish, OrderDetail } from "@/src/types/dish";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  orderDish: OrderDetail;
}

export default function OrderDishCart({ orderDish }: Props) {
  const [dish, setDish] = useState<MenuDish | undefined>();
  const { dishData } = useDish();
  useEffect(() => {
    const myDish = dishData.dishes.find(dish => dish.dish_id === orderDish.dish_id)
    setDish(myDish);
  }, []);

  const price = parseFloat(orderDish.price).toString().replace(".", ",");
  const [count, setCount] = useState<number>(orderDish.count);

  const { order } = useOrder();

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

  return (
    <div>
      {dish && (
        <div
          className={`${dm_sans.className} relative antialiased flex justify-start w-full bg-[#ffffff] rounded-xl my-4`}
        >
          <div className="absolute p-3.5 top-[-5px] left-[80px] rounded-full aspect-square bg-[#323232] text-second">
            <div className="relative flex justify-center items-center text-sm font-semibold text-center">
              <p className="absolute"> {count}</p>
            </div>
          </div>
          <Image
            className="rounded-l-xl"
            src={dish.dish.image}
            alt={dish.dish.name}
            width={90}
            height={90}
            priority
          />
          <div className=" items-start text-sm m-3 w-full">
            <div className="h-full flex justify-between items-center">
              <p className="mx-2">{dish.dish.name}</p>
              <p>{price}$</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
