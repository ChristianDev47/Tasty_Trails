import { getDish } from "@/src/services/dishes";
import Image from "next/image";
import { Dish } from "@/src/types/dish.d";
import Link from "next/link";
import { lilita, poppins, poppinsBold } from "@/src/app/ui/fonts";
import InformacionNutricional from "@/src/components/Menu/Detalle-nutricional";
import BotonesCompra from "@/src/components/Menu/Detalle-compra";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

export default async function DetailsByName({
  params,
}: {
  params: { name: string };
}) {
  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const myDish = await getDish();
  const dish = myDish.filter((mydish: Dish) => {
    const dishName = removeAccents(mydish.name)
      .toLowerCase()
      .replaceAll(" ", "-");
    if (dishName.replaceAll(",", "") === params.name) {
      return myDish;
    }
  })[0];

  const weight = Math.round(parseInt(dish.weight));
  const hundredg = (dish.calories / (weight / 100)).toFixed(2);

  return (
    <div className="w-full h-auto flex justify-center items-center bg-second">
      <div className="mt-[10rem] mb-[4rem] mx-[10rem] rounded-[4rem] bg-white lg:mx-[3rem] md:mx-[8rem] sm:mx-[1rem] max-w-[1536px]">
        <div className=" grid grid-cols-8 gap-8 ">
          <div className=" 2xl:col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-8  sm:col-span-8 md:flex justify-center sm:flex">
            <Image
              className="rounded-xl h-auto"
              src={dish.image}
              alt={dish.name}
              width={800}
              height={800}
            />
            <Link
              href="/menu"
              className="absolute top-4 left-4 rounded-full aspect-square bg-second p-2 flex justify-center items-center hover:bg-[#e5e4e4]"
            >
              <Image
                src="/icons/arrow-back.svg"
                alt="Call icon"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <div className="flex flex-col justify-start h-full items-start 2xl:col-span-5 xl:col-span-4 lg:col-span-4 md:col-span-8 sm:col-span-8 ">
            <span className="inline-flex justify-center items-center text-[14px]">
              <RestaurantOutlinedIcon sx={{ fontSize: 18 }} className="mr-2" />
              <p>{dish.category.name}</p>
            </span>
            <h1
              className={`${poppinsBold.className} antialiased leading-[2rem] text-[26px] mb-[1rem] text-black font-bold lg:text-[20px]`}
            >
              {dish.name}
            </h1>
            <p className="text-[14px] mb-[1.2rem] text-[#272727]">
              {hundredg} kcal por cada 100g
            </p>
            <p className="text-[16px] mb-[2rem] text-[#474747] lg:text-[14px] lg:mb-[1rem]">
              {dish.description}
            </p>
            <p className="text-[16px] font-semibold mb-[0.5rem] text-[#474747] ">
              Realiza tu Pedido:
            </p>
            <BotonesCompra dish={dish} />
            <div className="flex h-full justify-end items-end ">
              <InformacionNutricional dish={dish} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
