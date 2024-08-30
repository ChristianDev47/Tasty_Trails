"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { getOrdersByUser } from "@/src/services/orders";
import { findUser } from "@/src/services/user";
import { AllUser, User } from "@/src/types/user";
import { Order } from "@/src/types/orders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();

  const auth = useAuth();
  const [user, setUser] = useState<AllUser>();
  const [gastoTotal, setGastoTotal] = useState<string>("0");
  const [numPedidos, setNumPedidos] = useState<number>(0);

  useEffect(() => {
    const getUser = async () => {
      if (auth.user.id === undefined) {
        return { mesaage: "user was undefined" };
      } else {
        const myUser = await findUser({ id: auth.user.id });
        setUser(myUser);
        const orders = await getOrdersByUser({ userId: auth.user.id });
        const numTotal = orders.reduce((total: number, order: Order) => {
          const orderTotal = typeof order.total === 'number' ? order.total : parseFloat(order.total || "0");
          return total + orderTotal;
        }, 0);        
        const total = parseFloat(numTotal).toString().replace(".", ",");
        setGastoTotal(total);
        setNumPedidos(orders.length);
      }
    };
    getUser();
  }, [auth.user]);

  return (
    <div className="w-full h-full p-[2rem]">
      <div className="pb-2 border-b-2 border-[#F2F2F2] text-lg flex justify-between">
        <h1>Informacion de tu perfil</h1>
        <button
          onClick={() => router.push("/account/profile/edit")}
          className="inline-flex justify-end items-center"
        >
          <Image
            src="/icons/account/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
          <p className="text-sm">Editar</p>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 ">
        <div>
          <p className="text-colortext">Nombre</p>
          <p>{user?.person?.name}</p>
        </div>
        <div>
          <p className="text-colortext">Apellido</p>
          <p>{user?.person?.surname}</p>
        </div>
      </div>
      <h1 className=" text-lg mt-8 pb-2 border-b-2 border-[#F2F2F2]">
        Metodos de Contacto
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 my-4">
        <div className="col-span-1 row-span-1">
          <p className="text-colortext">Correo electrónico</p>
          <p>{user?.email}</p>
        </div>
        <div className="col-span-1 row-span-1">
          <p className="text-colortext">Teléfono</p>
          <p>
            {user?.person && user?.person.phone !== null
              ? `${user.person?.phone?.split(" ")[1]} ${
                  user.person?.phone?.split(" ")[2]
                }`
              : "No definido"}
          </p>
        </div>
        <div className="col-span-2 row-span-2">
          <p className="text-colortext">Dirección</p>
          <p>
            {user?.person && user?.person.direction !== null
              ? user.person?.direction
              : "No definido"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="shadow shadow-[#999999] p-4">
          <h3 className="text-colortext">Gasto total</h3>
          <p className="text-xl font-semibold">{gastoTotal}$</p>
        </div>
        <div className="shadow shadow-[#999999] p-4">
          <h3 className="text-colortext">Pedidos</h3>
          <p className="text-xl font-semibold">{numPedidos}</p>
        </div>
      </div>
    </div>
  );
}
