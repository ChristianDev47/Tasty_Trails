import { dm_sans, inter } from "@/src/app/ui/fonts";
import { useOrder } from "@/src/hooks/useOrder";
import OrderDishCart from "./List-dishes";
import Link from "next/link";
import { useCart } from "@/src/hooks/useCart";

export default function ShowOrder() {
  const { order } = useOrder();
  const { handleCloseCart } = useCart();
  let count = 0;
  let numDishes = 0;
  order.map((dish) => (count += dish.count * Number(dish.price)));
  order.map((dish) => (numDishes += dish.count));
  const price = count.toFixed(2).replace(".", ",");
  return (
    <div className="flex flex-col justify-between h-full pb-[3rem]">
      <div className={`${dm_sans.className} antialiased pt-4`}>
        <div className="flex justify-between items-start mx-6">
          <span className="inline-flex text-sm font-bold items-center justify-center">
            Cantidad{" "}
            <div className="border-[1px] rounded-3xl border-[#797979] mx-2 px-5">
              {numDishes}
            </div>{" "}
          </span>
          <button className="text-sm inline-flex items-center">
            Borrar Todo
          </button>
        </div>
        <div
          className={`h-auto ml-6 ${
            order.length === 3 ? "overflow-scroll mr-3" : "mr-6"
          } my-3 overflow-x-hidden`}
        >
          {order.map((dish) => {
            return <OrderDishCart key={dish.dish_id} orderDish={dish} />;
          })}
        </div>
      </div>

      <div className="flex flex-col justify-end  w-full  px-8 bg-second">
        <p className="text-[13px] py-2 border-b-[1px] border-[#b4b4b4]">
          Completa tu pedido ahora
        </p>
        <div className="flex justify-between flex-col items-center w-full py-4 pb-4">
          <div className="flex justify-between w-full">
            <p className="text-sm font-bold inline-flex items-start justify-center">
              Subtotal
            </p>
            <p
              className={`${inter.className} antialiased  text-xl font-bold inline-flex justify-center items-end`}
            >
              {price}$
            </p>
          </div>
          <Link className="w-full" href="/checkout">
            <button
              className="bg-colortext py-3 w-full rounded-3xl text-second font-bold my-3 text-center"
              onClick={handleCloseCart}
            >
              Finalizar Pedido
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
