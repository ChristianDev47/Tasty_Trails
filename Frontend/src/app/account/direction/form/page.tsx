"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { changeDirection } from "@/src/schemas/validations/userSchema";
import { findUser, updateUser } from "@/src/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  country: string;
  province: string;
  direction: string;
  info: string;
};

export default function Direction() {
  const router = useRouter();

  // Validaciones
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(changeDirection),
  });

  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      if (auth.user.id === undefined) {
        return { mesaage: "user was undefined" };
      } else {
        const myUser = await findUser({ id: auth.user.id });
        if (myUser.person.direction) {
          const userDirection = myUser.person.direction.split("|");
          setValue("country", userDirection[0] || "");
          setValue("province", userDirection[1] || "");
          setValue("direction", userDirection[2] || "");
          setValue("info", userDirection[3] || "");
        }
      }
    };
    getUser();
  }, [auth.user]);

  // Update Info
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userLogin = async () => {
      const completeDirection = `${data.country}|${data.province}|${data.direction}|${data.info}`;
      const userData = await updateUser({
        id: auth.user.id,
        newData: { direction: completeDirection },
      });
      auth.addUser(userData);
      toast.success(`Datos Agregados`, {
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
      router.push("/account/direction");
    };
    userLogin();
  };

  return (
    <div className="w-full h-full">
      <div className="my-4 pb-2 border-b-2 border-[#F2F2F2] text-lg flex justify-between">
        <h1>Dirección</h1>
      </div>
      <form
        className="grid grid-cols-2 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col relative ">
          <label htmlFor="country" className="text-[#1b1b1b]">
            País
          </label>
          <input
            id="country"
            autoComplete="country"
            {...register("country")}
            className={`w-full peer h-full  rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="text"
          />
          {errors.country?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.country?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="province" className="text-[#1b1b1b]">
            Provincia/Comunidad
          </label>
          <input
            id="province"
            autoComplete="province"
            {...register("province")}
            className={`w-full peer h-full  rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="text"
          />
          {errors.province?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.province?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col relative col-span-2">
          <label htmlFor="direction" className="text-[#1b1b1b]">
            Dirección
          </label>
          <input
            id="direction"
            autoComplete="direction"
            {...register("direction")}
            className={`w-full peer h-full  rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="text"
          />
          {errors.direction?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.direction?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col relative col-span-2">
          <label htmlFor="info" className="text-[#1b1b1b]">
            Nro de casa, apartamento, suite, etc.
          </label>
          <input
            id="info"
            autoComplete="info"
            {...register("info")}
            className={`w-full peer h-full  rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="text"
          />
          {errors.info?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.info?.message}
            </p>
          )}
        </div>
        <Link href="/account/direction">
          <div className="bg-black py-3 text-center rounded-md text-second mt-6">
            Cancelar
          </div>
        </Link>
        <button className="bg-colortext py-3 rounded-md text-second mt-6">
          Aceptar
        </button>
      </form>
    </div>
  );
}
