"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { getOrdersByUser, updateStateOrder } from "@/src/services/orders";
import { Order } from "@/src/types/orders";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>();
  const [renderOrder, setRenderOrder] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      if (user.id !== undefined) {
        const orders = await getOrdersByUser({ userId: user.id });
        setOrders(orders);
      }
    };
    getOrders();
  }, [user, renderOrder]);

  const updateOrder = async (id: number) => {
    const state = { order_status_id: 5 };
    await updateStateOrder({ id, state });
    toast.error(`Pedido Cancelado`, {
      duration: 4000,
    });
    setRenderOrder((prevState) => !prevState);
  };

  return (
    <div className="w-full h-full">
      {orders && (
        <div>
          <div className="flex justify-start items-start m-6">
            <h1 className="text-lg border-b-2 border-[#F2F2F2] w-full pb-2">
              Tus pedidos
            </h1>
          </div>
          <div className="h-full  rounded-md mx-6 shadow-md  sm:mb-[4rem]">
            <table className="w-full rounded-3xl text-gray min-w-full table-auto overflow-x-auto">
              <thead className="rounded-md bg-black  text-left text-sm font-normal text-second">
                <tr>
                  <th scope="col" className="px-3 py-4 font-medium sm:pl-3">
                    Nro
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    Cantidad
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium ">
                    Direccion
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    Estado
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    Total{" "}
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="bg-second text-black overflow-y-auto">
                {orders.length > 0 ? (
                  orders.map((order: Order, index: number) => {
                    const total = typeof order.total === 'number' || typeof order.total === 'string'
                      ? parseFloat(order.total.toString()).toString().replace(".", ",")
                      : 'N/A';

                    return (
                      <tr
                        key={index}
                        className="w-full border-b border-gray py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-normal py-3 pl-3 ">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {order.dishes
                            ? order.dishes.reduce((total, dish) => {
                                if (dish.order_details?.count)
                                  return total + dish.order_details.count;
                                return 0;
                              }, 0)
                            : 0}{" "}
                          platos
                        </td>
                        <td className="whitespace-break-spaces px-3 py-3">
                          {order.direction?.replaceAll("|", ", ")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {order.order_status?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {total}$
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 flex flex-col justify-center h-full">
                          <Link
                            href={`/account/orders/detalle/${order.id}`}
                            passHref
                          >
                            <div className="bg-colortext text-sm text-second p-1 rounded-lg text-center mx-0 my-1">
                              Detalle
                            </div>
                          </Link>
                          <button
                            onClick={() => {
                              const id = order.id ? order.id : 1;
                              updateOrder(id);
                            }}
                            className={`bg-[#ff3b3b] text-sm text-second p-1 rounded-lg m-0 ${
                              order.order_status_id === 5 ? "hidden" : "block"
                            }`}
                          >
                            Cancelar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p className="w-full text-start italic px-2 py-5">
                    No tienens ninguna orden
                  </p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
