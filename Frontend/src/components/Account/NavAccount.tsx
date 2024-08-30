"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useOrder } from "@/src/hooks/useOrder";
import { Logout } from "@/src/services/user";
import { lobster } from "@/src/app/ui/fonts";
import toast from "react-hot-toast";

export default function NavAccount() {
  const router = useRouter();

  const { user } = useAuth();
  const { logout } = useAuth();
  const { clearAllOrders } = useOrder();
  const pathname = usePathname();

  const accountOptions = [
    { title: "Mi perfil", icon: "profile", path: "/account/profile" },
    { title: "Pedidos", icon: "orders", path: "/account/orders" },
    { title: "Dirección", icon: "direction", path: "/account/direction" },
    { title: "Contraseña", icon: "password", path: "/account/change_password" },
  ];

  const userLogout = () => {
    clearAllOrders();

    const myUserLogout = async () => {
      await Logout();
    };
    const logoutWithToast = () => {
      toast.promise(
        myUserLogout().then(() => {
          logout();
          router.push("/");
        }),
        {
          loading: "Cerrando sesión...",
          success: "¡Sesión cerrada exitosamente!",
          error: "Error al cerrar sesión",
        },
        {
          duration: 4000,
        }
      );
    };

    logoutWithToast();
  };

  return (
    <>
      <div className="bg-colortext 2xl:flex xl:flex lg:flex flex-col md:flex-row sm:flex-row  justify-between text-second shadow shadow-[#999999] py-6 mx-4 w-[320px] h-full z-30 md:w-full sm:w-full md:h-[200px] sm:h-[250px] md:grid sm:grid md:grid-cols-10 sm:grid-cols-10 md:px-[2rem] sm:px-[2rem]">
        <div className="flex flex-col justify-evenly items-center md:items-end sm:items-end mx-5 my-4 sm:my-2 md:flex-row sm:flex-row  md:w-full sm:w-full md:justify-start sm:justify-start md:col-span-10 sm:col-span-10">
          <h1 className={`${lobster.className} antialiased text-3xl`}>
            Bienvenido
          </h1>
          <p className="md:mx-2 sm:mx-2">{user?.email}</p>
          <Image
            className="my-2 p-4 bg-second aspect-square rounded-full md:hidden sm:hidden"
            src="/images/logo.png"
            alt=""
            width={100}
            height={100}
          />
        </div>
        <div className="md:flex sm:flex md:items-center sm:items-center md:col-span-10 sm:col-span-10 justify-start flex-wrap">
          {accountOptions.map((option, index) => {
            return (
              <Link
                className="md:mx-2 sm:mx-2 md:my-1 sm:my-1"
                key={index}
                href={option.path}
              >
                <div
                  className={`flex justify-stretch items-center border-secbg-second w-full py-3 px-4 hover:bg-second hover:text-black ${
                    pathname === option.path
                      ? "bg-second md:rounded-lg sm:rounded-lg text-black"
                      : ""
                  } md:hover:rounded-lg sm:hover:rounded-lg sm:px-1`}
                >
                  <Image
                    className=" mr-3"
                    src={`/icons/account/${option.icon}.svg`}
                    alt="User icon"
                    width={24}
                    height={24}
                  />
                  <p className="md:text-[12px] sm:text-[12px]">
                    {option.title}
                  </p>
                </div>
              </Link>
            );
          })}
          <button
            className={`flex justify-stretch 2xl:w-full xl:w-full lg:w-full items-center text-second border-secbg-second  py-3 px-4 hover:bg-second  md:justify-end  sm:justify-end md:hover:rounded-lg sm:hover:rounded-lg hover:text-black md:mx-2 sm:mx-2 md:my-1 sm:my-1`}
            onClick={userLogout}
          >
            <Image
              className=" mr-3"
              src={`/icons/account/logout.svg`}
              alt="User icon"
              width={24}
              height={24}
            />
            <p className="md:text-[10px] sm:text-[10px]">Cerrar Sesión</p>
          </button>
        </div>

        <div className=" px-4 flex justify-end items-end h-full md:col-span-10 md:w-[150px] md:hidden sm:hidden">
          <Link
            href="/"
            className=" text-center w-full rounded-xl bg-black text-white p-2"
          >
            Salir
          </Link>
        </div>
      </div>
    </>
  );
}
