"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/src/schemas/validations/loginSchema";
import { useAuth } from "@/src/hooks/useAuth";
import { Login } from "@/src/services/user";
import toast from "react-hot-toast";

// Validations types
type Inputs = {
  email: string;
  password: string;
};

export default function FormLogin() {
  const router = useRouter();

  // Validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });
  const [emailFocused, setEmailFocused] = useState<Boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<Boolean>(false);

  const [inputEmailValue, setInputEmailValue] = useState<string>("");
  const [inputPasswordValue, setInputPasswordValue] = useState<string>("");

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmailValue(event.target.value);
  };
  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPasswordValue(event.target.value);
  };

  // Login
  const { login, addUser } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userLogin = async () => {
      const user = await Login({ login: data });
      if (user === undefined) {
        toast.error(`Email o contraseña incorrectos..`, {
          duration: 5000,
        });
      } else {
        login(user.token);
        addUser(user);
        toast.success(`Sesión iniciada. Bienvenido/a ${user.email}.`, {
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
        router.push("/");
      }
    };
    userLogin();
  };

  return (
    <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
      <div className="relative py-4">
        <label
          htmlFor="email"
          className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
            emailFocused || inputEmailValue !== ""
              ? "translate-y-[-120%] text-sm"
              : "translate-y-[-50%] "
          }`}
        >
          Correo electrónico
        </label>
        <input
          id="email"
          autoComplete="new-email"
          {...register("email", { onChange: handleInputEmail })}
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          type="text"
          className={`w-full px-2 transition-all duration-300 py-5 ${
            emailFocused || inputEmailValue !== "" ? "pt-7 pb-3" : "pt-5 pb-5"
          } peer h-full w-full rounded-[7px]  !border  !border-colortext bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-colortext focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none`}
        />
      </div>
      {errors.email?.message && (
        <p className="text-sm text-[#ff2d2d]">{errors.email?.message}</p>
      )}
      <div className="relative my-2">
        <label
          htmlFor="password"
          className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
            passwordFocused || inputPasswordValue !== ""
              ? "translate-y-[-120%] text-sm"
              : "translate-y-[-50%] "
          }`}
        >
          Contraseña
        </label>
        <input
          id="password"
          autoComplete="new-password"
          {...register("password", { onChange: handleInputPassword })}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          type="password"
          className={`w-full px-2 transition-all duration-300 py-5 ${
            passwordFocused || inputPasswordValue !== ""
              ? "pt-7 pb-3"
              : "pt-5 pb-5"
          } peer h-full w-full rounded-[7px]  !border  !border-colortext bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-colortext focus:border-t-colortext focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50 outline-none`}
        />
      </div>
      <button
        className={`mt-8 px-8 py-3 rounded-2xl text-sm  font-bold w-full my-2 ${
          inputEmailValue.trim() !== "" && inputPasswordValue.trim() !== ""
            ? "bg-colortext text-second"
            : "bg-colortext text-second cursor-not-allowed"
        }`}
        disabled={
          inputEmailValue !== "" && inputPasswordValue !== "" ? false : true
        }
      >
        Iniciar Sesion
      </button>
    </form>
  );
}
