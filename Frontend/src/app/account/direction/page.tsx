"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { findUser, updateUser } from "@/src/services/user";
import { AllUser, User } from "@/src/types/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Direction() {
  const { user, addUser } = useAuth();
  const [direction, setDirection] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        const userDirection = user.person?.direction;
        if (userDirection) {
          const allDirection = userDirection.split("|");
          const location = `${allDirection[2]}, ${allDirection[3]}`;
          const country = `${allDirection[0]} - ${allDirection[1]}`;
          setDirection(location);
          setCountry(country);
        }
      }
    };
    getUser();
  }, [user, deleted]);

  const deleteDirection = async () => {
    if (user?.id !== undefined) {
      const newDataUser = await updateUser({
        id: user?.id,
        newData: { direction: null },
      });
      addUser(newDataUser);
      setDeleted(!deleted);
    }
  };

  return (
    <div className="w-full h-full m-6">
      <div className="pb-2 border-b-2 border-[#F2F2F2] text-lg flex justify-between">
        <h1>Dirección de Pedidos</h1>
      </div>
      {user?.person?.direction !== null ? (
        <div className="shadow-md border border-colortext rounded-xl w-full flex justify-between items-start h-[230px] flex-col mt-8">
          <div className="p-4">
            <p>
              <strong>Tu dirección</strong>
            </p>
            <div className="my-2 text-gray-5=700">
              <p>{direction}</p>
              <p>{country}</p>
            </div>
          </div>
          <div className=" border-t border-colortext w-full flex items-center justify-end px-4 py-2">
            <Link href="/account/direction/form">
              <Image
                src="/icons/account/edit.svg"
                alt="edit"
                width={25}
                height={25}
              />
            </Link>
            <div className="mx-1 cursor-pointer" onClick={deleteDirection}>
              <Image
                className="cursor-pointer"
                src="/icons/trash.svg"
                alt="edit"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
      ) : (
        <Link
          href="/account/direction/form"
          className="shadow-md shadow-gray rounded-xl w-full flex justify-center items-center h-[180px] flex-col hover:border-2 hover:border-[#adadad] mt-4"
        >
          <Image
            src="/icons/account/direction.svg"
            alt="direction_icon"
            width={60}
            height={60}
          />
          <p className="text-sm text-center">Añadir nueva dirreción</p>
        </Link>
      )}
    </div>
  );
}
