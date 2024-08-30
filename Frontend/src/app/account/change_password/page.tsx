"use client";

import { useAuth } from "@/src/hooks/useAuth";
import { changePassword } from "@/src/schemas/validations/userSchema";
import { Login } from "@/src/services/user";
import { findUser, updateUser } from "@/src/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Validations types
type Inputs = {
  password: string;
  newPassword: string;
};

export default function Change_Password() {
  // Validaciones
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(changePassword),
  });

  // Update Info
  const { login } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userLogin = async () => {
      if (auth.user.email) {
        const myUser = { email: auth.user.email, password: data.password };
        const newlogin = await Login({ login: myUser });
        if (!newlogin) {
          toast.error(`Contraseña Incorrecta`, {
            duration: 4000,
          });
        } else {
          const newPassword = { password: data.newPassword };
          const passwordChanges = await updateUser({
            id: auth.user.id,
            newData: newPassword,
          });
          if (passwordChanges) {
            const user = await findUser({ id: auth.user.id });
            login(user.access_tokens[0].token);
            toast.success(`Contraseña Cambiada`, {
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
        }
      }
    };
    userLogin();
  };
  const auth = useAuth();
  const [inputNameValue, setInputPasswordValue] = useState<string>("");
  const [inputSurnameValue, setInputNewPasswordValue] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      if (auth.user.id === undefined) {
        return { mesaage: "user was undefined" };
      } else {
        const myUser = await findUser({ id: auth.user.id });
      }
    };
    getUser();
  }, [auth.user]);

  return (
    <div className="w-full h-full ">
      <div className="my-4 pb-2 border-b-2 border-[#F2F2F2] text-lg flex justify-between">
        <h1>Cambiar contraseña</h1>
      </div>
      <form
        className="grid grid-cols-2 gap-7 text-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col relative ">
          <label htmlFor="password" className="text-[#1b1b1b]">
            Contraseña
          </label>
          <input
            id="password"
            autoComplete="password"
            {...register("password", {
              onChange: (event) => setInputPasswordValue(event.target.value),
            })}
            value={getValues("password") ?? ""}
            className={`w-full peer h-full  rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="password"
          />
          {errors.password?.message && (
            <p className="absolute bottom-[-40px] text-sm text-[#ff2d2d]">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="newPassword" className="text-[#1b1b1b]">
            Nueva contraseña
          </label>
          <input
            id="newPassword"
            autoComplete="newPassword"
            {...register("newPassword", {
              onChange: (event) => setInputNewPasswordValue(event.target.value),
            })}
            value={getValues("newPassword") ?? ""}
            className={`w-full peer h-full  rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="password"
          />
          {errors.newPassword?.message && (
            <p className="absolute bottom-[-40px] text-sm text-[#ff2d2d]">
              {errors.newPassword?.message}
            </p>
          )}
        </div>
        <button className="bg-colortext py-3 my-3 rounded-md text-second">
          Aceptar
        </button>
      </form>
    </div>
  );
}
