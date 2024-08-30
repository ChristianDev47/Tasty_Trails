"use client";
import OrderDishCart from "@/src/components/Checkout/OrderDishes";
import { useAuth } from "@/src/hooks/useAuth";
import { useOrder } from "@/src/hooks/useOrder";
import { changeDirection } from "@/src/schemas/validations/userSchema";
import { createOrder } from "@/src/services/orders";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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

export default function Checkouts() {
  const router = useRouter();
  // Get order
  const { order, clearAllOrders } = useOrder();
  const [totalOrder, setTotalOrder] = useState<string>('');
  const { user } = useAuth();

  // Validaciones
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(changeDirection),
  });

  const [countryFocused, setCountryFocused] = useState<Boolean>(false);
  const [provinceFocused, setProvinceFocused] = useState<Boolean>(false);
  const [directionFocused, setDirectionFocused] = useState<Boolean>(false);
  const [infoFocused, setInfoFocused] = useState<Boolean>(false);
  const [inputCountryValue, setInputCountryValue] = useState<string>("");
  const [inputProvinceValue, setInputProvinceValue] = useState<string>("");
  const [inputDirectionValue, setInputDirectionValue] = useState<string>("");
  const [inputInfoValue, setInputInfoValue] = useState<string>("");
  const [selectedOption, setSelectedOption] =
    useState<string>("Otra direccion");
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const getUser = async () => {
      const total = order.reduce((prev, current) => {
        return prev + parseFloat(current.price) * current.count;
      }, 0)
      const formattedTotal = total.toFixed(2).replace(".", ",");
      setTotalOrder(formattedTotal);
      if (user.person?.direction && selectedOption === "Mi direccion") {
        const userDirection = user.person?.direction.split("|");
        setValue("country", userDirection[0] || "");
        setValue("province", userDirection[1] || "");
        setValue("direction", userDirection[2] || "");
        setValue("info", userDirection[3] || "");
        setInputCountryValue(userDirection[0] || "");
        setInputProvinceValue(userDirection[1] || "");
        setInputDirectionValue(userDirection[2] || "");
        setInputInfoValue(userDirection[3] || "");
      } else {
        setValue("country", "");
        setValue("province", "");
        setValue("direction", "");
        setValue("info", "");
        setInputCountryValue("");
        setInputProvinceValue("");
        setInputDirectionValue("");
        setInputInfoValue("");
      }
    };
    getUser();
  }, [user, selectedOption]);

  // Save Order
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userLogin = async () => {
      const completeDirection = `${data.country}|${data.province}|${data.direction}|${data.info}`;
      const newOrder = {
        user_id: user.id,
        order_status_id: 1,
        direction: completeDirection,
        phone: user.person?.phone ?? "",
        dishes: order,
        total: parseFloat(totalOrder)

      };
      await createOrder({ newOrder });
      clearAllOrders();
      toast.success(
        `Orden realizada con exito. Mira tu orden en tu perfil`,
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
    };
    userLogin();
  };

  return (
    <div className="w-full grid grid-cols-2 gap-0">
      <div className="col-span-1 flex justify-start items-start flex-col  py-8 px-24 bg-[#ffffff] text-sm lg:px-16 md:px-6 sm:px-8 sm:col-span-2">
        <p className="text-gray-400">Cuenta</p>
        <p className="border-b-[1px] py-2 border-gray-200 w-full">
          {user.email}
        </p>
        <div className="w-full my-4">
          <p className="text-[16px] my-2">Dirección para tú pedido</p>
          <p className="text-[12px]">
            Utiliza tu dirección (si la tienes) o define una nueva para tu
            pedido
          </p>
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="w-full border-[1px] border-gray-200 my-3 p-3 rounded-md text-[12px]"
            name=""
            id=""
          >
            {user.person?.direction && (
              <option value="Mi direccion">Utiliza mi dirección</option>
            )}
            <option value="Otra direccion">Nueva direccion</option>
          </select>
          <div>
            <form
              className="grid grid-cols-2 gap-3 text-[12px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative my-2">
                <label
                  htmlFor="country"
                  className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
                    countryFocused || inputCountryValue !== ""
                      ? "translate-y-[-120%] text-sm"
                      : "translate-y-[-50%] "
                  }`}
                >
                  País/Region
                </label>
                <input
                  id="country"
                  autoComplete="off"
                  {...register("country", {
                    onChange: (event) =>
                      setInputCountryValue(event.target.value),
                  })}
                  onFocus={() => setCountryFocused(true)}
                  onBlur={() => setCountryFocused(false)}
                  type="text"
                  className={`w-full px-2 transition-all duration-300 py-3 ${
                    countryFocused || inputCountryValue !== ""
                      ? "pt-6 pb-2"
                      : "pt-4 pb-4"
                  } peer h-full w-full rounded-[7px]  !border  !border-black bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-black focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none disabled:bg-gray-200`}
                  disabled={selectedOption === "Mi direccion" ? true : false}
                />
                {errors.country?.message && (
                  <p className="absolute bottom-[-20px] text-sm text-[#ff2d2d]">
                    {errors.country?.message}
                  </p>
                )}
              </div>
              <div className="relative my-2">
                <label
                  htmlFor="province"
                  className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
                    provinceFocused || inputProvinceValue !== ""
                      ? "translate-y-[-120%] text-sm"
                      : "translate-y-[-50%] "
                  }`}
                >
                  Provincia
                </label>
                <input
                  id="province"
                  autoComplete="off"
                  {...register("province", {
                    onChange: (event) =>
                      setInputProvinceValue(event.target.value),
                  })}
                  onFocus={() => setProvinceFocused(true)}
                  onBlur={() => setProvinceFocused(false)}
                  type="text"
                  className={`w-full px-2 transition-all duration-300 py-3 ${
                    provinceFocused || inputProvinceValue !== ""
                      ? "pt-6 pb-2"
                      : "pt-4 pb-4"
                  } peer h-full w-full rounded-[7px]  !border  !border-black bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-black focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none disabled:bg-gray-200`}
                  disabled={selectedOption === "Mi direccion" ? true : false}
                />
                {errors.province?.message && (
                  <p className="absolute bottom-[-20px] text-sm text-[#ff2d2d]">
                    {errors.province?.message}
                  </p>
                )}
              </div>
              <div className="relative my-2 col-span-2">
                <label
                  htmlFor="direction"
                  className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
                    directionFocused || inputDirectionValue !== ""
                      ? "translate-y-[-120%] text-sm"
                      : "translate-y-[-50%] "
                  }`}
                >
                  Dirección
                </label>
                <input
                  id="direction"
                  autoComplete="off"
                  {...register("direction", {
                    onChange: (event) =>
                      setInputDirectionValue(event.target.value),
                  })}
                  onFocus={() => setDirectionFocused(true)}
                  onBlur={() => setDirectionFocused(false)}
                  type="text"
                  className={`w-full px-2 transition-all duration-300 py-3 ${
                    directionFocused || inputDirectionValue !== ""
                      ? "pt-6 pb-2"
                      : "pt-4 pb-4"
                  } peer h-full w-full rounded-[7px]  !border  !border-black bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-black focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none disabled:bg-gray-200`}
                  disabled={selectedOption === "Mi direccion" ? true : false}
                />
                {errors.direction?.message && (
                  <p className="absolute bottom-[-20px] text-sm text-[#ff2d2d]">
                    {errors.direction?.message}
                  </p>
                )}
              </div>
              <div className="relative my-2 col-span-2">
                <label
                  htmlFor="info"
                  className={`absolute left-3 top-[50%] transition-all duration-300 ease-in-out pointer-events-none text-[#9c9d99] overflow-hidden  ${
                    infoFocused || inputInfoValue !== ""
                      ? "translate-y-[-120%] text-sm"
                      : "translate-y-[-50%] "
                  }`}
                >
                  Nro de casa, departamento, suite, etc.
                </label>
                <input
                  id="info"
                  autoComplete="off"
                  {...register("info", {
                    onChange: (event) => setInputInfoValue(event.target.value),
                  })}
                  onFocus={() => setInfoFocused(true)}
                  onBlur={() => setInfoFocused(false)}
                  type="text"
                  className={`w-full px-2 transition-all duration-300 py-3 ${
                    infoFocused || inputInfoValue !== ""
                      ? "pt-6 pb-2"
                      : "pt-4 pb-4"
                  } peer h-full w-full rounded-[7px]  !border  !border-black bg-transparent bg-second px-3 py-2.5 font-sans text-sm font-normal shadow-lg shadow-gray outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray placeholder-shown:border placeholder-shown:border-gray placeholder-shown:border-t-gray focus:border-2  focus:!border-black focus:border-t-colortext  focus:outline-0 focus:ring-gray/10 disabled:border-0 disabled:bg-gray outline-none disabled:bg-gray-200`}
                  disabled={selectedOption === "Mi direccion" ? true : false}
                />
                {errors.info?.message && (
                  <p className="absolute bottom-[-20px] text-sm text-[#ff2d2d]">
                    {errors.info?.message}
                  </p>
                )}
              </div>
              <p className="text-[16px] my-2 col-span-2">Pago</p>
              <p className="col-span-2">
                Utiliza el metodo que quieras para completar el pago
              </p>
              <div className="grid grid-cols-2 gap-4 my-2 col-span-2">
                <div className="bg-[#ffffff] rounded-md flex justify-center border-[1px] border-gray-400">
                  <Image
                    className="py-1"
                    src="/images/pay/Paypal.png"
                    alt="google"
                    width={80}
                    height={80}
                    priority
                  />
                </div>
                <div className="bg-black rounded-md flex justify-center">
                  <Image
                    className="my-3"
                    src="/images/pay/Google_Pay.png"
                    alt="google"
                    width={60}
                    height={60}
                    priority
                  />
                </div>
                <div className="relative border-[1px] border-gray-300 col-span-2 w-full">
                  <p className="absolute bg-[#ffffff] top-[-16px] left-[46%] p-2">
                    Pero
                  </p>
                </div>
                <div className="col-span-2 bg-gray-300 text-center my-2 rounded-md ">
                  Tu pedido es gratuito hasta que implementemos el pago por
                  estas plataformas.
                </div>
              </div>
              <Link
                href="/"
                className="py-4 bg-black text-second  rounded-md text-center "
              >
                Cancelar
              </Link>
              <button className="py-4 bg-colortext text-second  rounded-md text-center ">
                Finalizar el pedido
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className=" h-full bg-[#e7e7e7] px-24 pt-8 lg:px-16 md:px-6 sm:px-8 sm:col-span-2">
        <p className=" text-[15px]">Resumen del Pedido</p>
        <div>
          {order.map((dish) => {
            return <OrderDishCart key={dish.dish_id} orderDish={dish} />;
          })}
        </div>
        <div className="flex flex-col justify-end items-end   p-3 ">
          <div className="w-full flex justify-between items-center border-b-2 border-[#d9d9d9] pb-2 text-[14px] font-semibold">
            <p>Subtotal</p>
            <p>{totalOrder}$</p>
          </div>
          <div className="w-full flex justify-between items-center  text-[16px] font-semibold">
            <p>Total</p>
            <p>{totalOrder}$</p>
          </div>
        </div>
      </div>
    </div>
  );
}
