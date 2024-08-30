import { dm_sans } from "@/src/app/ui/fonts";
import { getOrders } from "@/src/services/orders";
import { DishDetail } from "@/src/types/orders";
import Image from "next/image";
import Link from "next/link";

export default async function DetailsOrder({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrders({ id: params.id });
  return (
    <div className="w-full h-full">
      <div className="flex justify-start items-start m-6">
        <h1 className="text-lg border-b-2 border-[#F2F2F2] w-full pb-2">
          Detalle del pedido
        </h1>
        <Link
          href="/account/orders"
          className="inline-flex justify-end items-center"
        >
          <Image
            src="/icons/arrow-back.svg"
            alt="edit"
            width={25}
            height={25}
          />
        </Link>
      </div>
      <div className="m-6 pr-4 h-[400px] overflow-auto overflow-x-hidden">
        {order.dishes.map((dish: DishDetail, index: number) => {
          const price = parseFloat(dish.price).toString().replace(".", ",");
          return (
            <div
              key={index}
              className={`${dm_sans.className} relative antialiased flex justify-start w-full bg-[#ededed] rounded-xl my-4`}
            >
              <div className="absolute p-3.5 top-[-5px] left-[80px] rounded-full aspect-square bg-[#323232] text-second">
                <div className="relative flex justify-center items-center text-sm font-semibold text-center">
                  <p className="absolute"> {dish.order_details.count}</p>
                </div>
              </div>
              <Image
                className="rounded-l-xl"
                src={dish.image}
                alt={dish.name}
                width={90}
                height={90}
              />
              <div className=" items-start text-sm m-3 w-full">
                <div className="h-full flex justify-between items-center">
                  <p>{dish.name}</p>
                  <p className="ml-3">{price}$</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-end items-end mx-6  p-3 ">
        <div className="w-full flex justify-between items-center border-b-2 border-[#d9d9d9] pb-2 text-[14px] font-semibold">
          <p>Subtotal</p>
          <p>{order.total}$</p>
        </div>
        <div className="w-full flex justify-between items-center  text-[16px] font-semibold">
          <p>Total</p>
          <p>{order.total}$</p>
        </div>
      </div>
    </div>
  );
}
