"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/src/schemas/validations/userSchema";
import Image from "next/image";
import { SearchCountryCode } from "@/src/components/Account/SearchCountryCode";
import { useAuth } from "@/src/hooks/useAuth";
import { findUser, updateUser } from "@/src/services/user";
import Link from "next/link";
import toast from "react-hot-toast";

// Validations types
type Inputs = {
  name: string;
  surname: string;
  phone?: string | null;
};

export default function Profile() {
  const router = useRouter();

  // Validaciones
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(updateUserSchema),
  });

  // Update Info
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userLogin = async () => {
      if (data.phone && data.phone.trim() !== "") {
        const countryCode = searchValue[0];
        const phoneNumer = `${countryCode.name.common} ${countryCode.idd.root}${countryCode.idd.suffixes} ${data.phone}`;
        data.phone = phoneNumer;
      } else {
        data.phone = null;
      }
      const user = await updateUser({ id: auth.user.id, newData: data });
      if (user !== undefined) {
        toast.success(`Datos Modificados`, {
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
        router.push("/account/profile");
      }
    };
    userLogin();
  };

  // Update user Value
  const auth = useAuth();
  const [email, setEmail] = useState<string>("");
  const [countryPhone, setCountryPhone] = useState<string>("");
  const {
    Search,
    searchValue,
    handleButtonClick,
    accordion,
    handleSearhInput,
  } = SearchCountryCode({ country: countryPhone });

  useEffect(() => {
    const getUser = async () => {
      if (auth.user.id === undefined) {
        return { mesaage: "user was undefined" };
      } else {
        const myUser = await findUser({ id: auth.user.id });
        setValue("name", myUser?.person?.name || "");
        setValue("surname", myUser?.person?.surname || "");
        setEmail(myUser?.email || "");
        myUser?.person?.phone
          ? setValue("phone", myUser?.person?.phone.split(" ")[2] || "")
          : setValue("phone", "");
        if (myUser?.person.phone) {
          setCountryPhone(myUser?.person?.phone.split(" ")[0]);
        }
      }
    };
    getUser();
  }, [auth.user]);
  return (
    <div className="w-full h-full p-8">
      <div className=" pb-2 border-b-2 border-[#F2F2F2] text-lg flex justify-between">
        <h1>Editar perfil</h1>
      </div>
      <form
        className="grid grid-cols-2 gap-7 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col relative ">
          <label htmlFor="name" className="text-[#1b1b1b]">
            Nombre
          </label>
          <input
            id="name"
            autoComplete="name"
            {...register("name")}
            className={`w-full peer h-full rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="text"
          />
          {errors.name?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="surname" className="text-[#1b1b1b]">
            Apellido
          </label>
          <input
            id="surname"
            autoComplete="surname"
            {...register("surname")}
            className={`w-full peer h-full rounded-[7px] border border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none`}
            type="text"
          />
          {errors.surname?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.surname?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="email" className="text-[#1b1b1b]">
            Correo Electrónico
          </label>
          <input
            id="email"
            value={email}
            autoComplete="email"
            className={`w-full peer h-full rounded-[7px]  border  border-[#e1e1e1] bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none disabled:bg-[#ececec]`}
            disabled
            type="text"
          />
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="phone" className="text-[#1b1b1b]">
            Teléfono
          </label>
          <input
            id="phone"
            type="text"
            autoComplete="phone"
            {...register("phone")}
            className={`w-full peer h-full rounded-[7px]  border  border-colortext bg-transparen px-3 py-2.5 text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent outline-none appearance-none pl-[4rem]`}
          />
          <div
            className="absolute top-6 bottom-0 m-auto h-full flex justify-center items-center"
            onClick={handleButtonClick}
          >
            <div className="flex hover:bg-gray-200 py-2 pl-2">
              {searchValue[0] && (
                <Image
                  src={searchValue[0]?.flags.svg}
                  alt="flag"
                  width={30}
                  height={30}
                />
              )}
              <Image
                className="ml-1"
                src="/icons/arrow_down.svg"
                alt="arrow"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div
            className={`absolute top-16 bg-second left-0 w-full overflow-hidden ${accordion}`}
          >
            <input
              className="border text-sm  border-colortext focus:outline-none w-full p-2"
              onChange={handleSearhInput}
              type="text"
              placeholder="Buscar país.."
            />
            <Search />
          </div>
          {errors.phone?.message && (
            <p className="absolute bottom-[-18px] text-sm text-[#ff2d2d]">
              {errors.phone?.message}
            </p>
          )}
        </div>
        <Link href="/account">
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
