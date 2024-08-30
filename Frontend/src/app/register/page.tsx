"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/src/schemas/validations/userSchema";
import { fetchCreateAcount, Login } from "@/src/services/user";
import { useAuth } from "@/src/hooks/useAuth";
import { lobster } from "../ui/fonts";
import toast from "react-hot-toast";

// Validations types
type Inputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
  terms?: boolean;
};

export default function Registro() {
  const router = useRouter();
  // Validaciones
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
  });

  const [emailFocused, setEmailFocused] = useState<Boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<Boolean>(false);
  const [nameFocused, setNameFocused] = useState<Boolean>(false);
  const [surnameFocused, setSurnameFocused] = useState<Boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [inputEmailValue, setInputEmailValue] = useState<string>("");
  const [inputPasswordValue, setInputPasswordValue] = useState<string>("");
  const [inputNameValue, setInputNameValue] = useState<string>("");
  const [inputSurnameValue, setInputSurnameValue] = useState<string>("");

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmailValue(event.target.value);
  };
  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPasswordValue(event.target.value);
  };
  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value);
  };
  const handleInputSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSurnameValue(event.target.value);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  // Register
  const { login, addUser } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    delete data.terms;
    const userLogin = async () => {
      const user = await fetchCreateAcount({ user: data });
      if (user === undefined) {
        toast.error(`El email ya esta asociado a otra cuenta.`, {
          duration: 4000,
        });
      } else {
        login(user.access_tokens[0].token);
        addUser(user);
        toast.success(
          `Usuario creado exitosamente. Bienvenido a Tassty Trails`,
          {
            duration: 4000,
            style: {
              background: "#7DA640",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#000",
            },
          }
        );
        router.push("/");
      }
    };
    userLogin();
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-light-green mt-[6rem] min-h-[750px]">
      <div className="w-[550px] text-sm bg-second px-12 rounded-lg shadow-md pb-6 mx-[2rem] md:text-[12px]">
        <h1
          className={`${lobster.className} antialiased text-center text-3xl my-4`}
        >
          Crea tu cuenta 🚀
        </h1>
        <p className="text-center">
          No te preocupes más por el tiempo que pierdes en comprar, cocinar y
          limpiar.
        </p>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative my-2">
            <label
              htmlFor="name"
              className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
                nameFocused || inputNameValue !== ""
                  ? "translate-y-[-120%] text-sm"
                  : "translate-y-[-50%] "
              }`}
            >
              Nombre
            </label>
            <input
              id="name"
              autoComplete="off"
              {...register("name", { onChange: handleInputName })}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              type="text"
              className={`w-full px-2 transition-all duration-300 py-5 ${
                nameFocused || inputNameValue !== "" ? "pt-7 pb-3" : "pt-5 pb-5"
              } peer h-full w-full rounded-[7px]  !border  !border-colortext bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-colortext focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none`}
            />
          </div>
          {errors.name?.message && (
            <p className="text-sm text-[#ff2d2d]">{errors.name?.message}</p>
          )}
          <div className="relative my-2">
            <label
              htmlFor="surname"
              className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
                surnameFocused || inputSurnameValue !== ""
                  ? "translate-y-[-120%] text-sm"
                  : "translate-y-[-50%] "
              }`}
            >
              Apellido
            </label>
            <input
              id="surname"
              autoComplete="off"
              {...register("surname", { onChange: handleInputSurname })}
              onFocus={() => setSurnameFocused(true)}
              onBlur={() => setSurnameFocused(false)}
              type="text"
              className={`w-full px-2 transition-all duration-300 py-5 ${
                surnameFocused || inputSurnameValue !== ""
                  ? "pt-7 pb-3"
                  : "pt-5 pb-5"
              } peer h-full w-full rounded-[7px]  !border  !border-colortext bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-colortext focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none`}
            />
          </div>
          {errors.surname?.message && (
            <p className="text-sm text-[#ff2d2d]">{errors.surname?.message}</p>
          )}
          <div className="relative my-2">
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
              autoComplete="off"
              {...register("email", { onChange: handleInputEmail })}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              type="string"
              className={`w-full px-2 transition-all duration-300 py-5 ${
                emailFocused || inputEmailValue !== ""
                  ? "pt-7 pb-3"
                  : "pt-5 pb-5"
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
              autoComplete="off"
              {...register("password", { onChange: handleInputPassword })}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              type="password"
              className={`w-full px-2 transition-all duration-300 py-5 ${
                passwordFocused || inputPasswordValue !== ""
                  ? "pt-7 pb-3"
                  : "pt-5 pb-5"
              } peer h-full w-full rounded-[7px]  !border  !border-colortext bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-colortext focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none`}
            />
          </div>
          {errors.password?.message && (
            <p className="text-sm text-[#ff2d2d]">{errors.password?.message}</p>
          )}
          <div className="flex justify-start items-center my-4">
            <input
              {...register("terms", { onChange: handleCheckboxChange })}
              checked={isChecked}
              type="checkbox"
              title="Para continuar, acepte las politicas de privacidad"
              className="mr-3"
            />
            <label>
              Acepto la Política de privacidad y consiento el tratamiento de mis
              datos personales.
            </label>
          </div>
          {errors.terms?.message && (
            <p className="text-sm text-[#ff2d2d]">{errors.terms?.message}</p>
          )}
          <div className="flex justify-start items-center">
            <input type="checkbox" className="mr-3" />
            <label>
              Quiero beneficiarme de promociones exclusivas y acepto recibir las
              comunicaciones comerciales de Tasty.
            </label>
          </div>
          <button className="bg-colortext px-8 py-2 rounded-lg text-second font-bold w-full my-4">
            Entrar
          </button>
        </form>
        <button
          className="text-center w-full"
          onClick={() => router.push("/login")}
        >
          Ups! Ya tengo una cuenta
        </button>
      </div>
    </div>
  );
}
