import HealthySecion from "./Principal/Healthy_section";
import OrderSection from "./Principal/Order_section";
import Image from "next/image";
import { lobster, rubik } from "../app/ui/fonts";
import { CategorySection } from "./Principal/Categories_section";
import { DishesSection } from "./Principal/Dishes_section";
import Link from "next/link";

export default async function Inicio() {
  return (
    <section className="pt-[4rem] bg-[#ffffff] sm:pt-[1rem] ">
      {/* CATEGORIAS */}
      <div className="mb-[5rem] px-[10rem] lg:px-[2rem] md:px-[4rem] sm:px-[1rem] z-30 flex justify-center">
        <div className="max-w-[1536px] w-full">
          <div className="font-bold mb-[2rem] text-center relative z-30">
            <p
              className={`${lobster.className} antialiased  text-colortext xl:text-[2rem] lg:text-[2rem] md:text-[1.5rem] sm:text-[1.5rem]`}
            >
              Tasty Trails
            </p>
            <p className={`${rubik.className} antialiased text-[2rem]`}>
              Elige la categoria que mas te apetezca
            </p>
            <Image
              className="absolute top-0 right-4 sm:hidden"
              src="/images/pic4.png"
              alt=""
              width={150}
              height={150}
            />
          </div>
          <CategorySection />
        </div>
      </div>
      {/* LO MEJOR DE LO MEJOR */}
      <HealthySecion />
      {/* PLATILLOS */}
      <div className="w-full py-[5rem] px-[10rem] lg:px-[3.5rem] md:px-[3.5rem] sm:px-[1rem] sm:py-[3.5rem] flex justify-center">
        <div className="max-w-[1536px] w-full">
          <div className="ont-bold mb-[2rem] text-center ">
            <p
              className={`${lobster.className} antialiased text-colortext text-[2rem] md:text-[1.5rem] sm:text-[1.5rem]`}
            >
              Tasty Trails
            </p>
            <p className={`${rubik.className} antialiased text-[2rem]`}>
              Platillos que deberias probar
            </p>
          </div>
          <DishesSection />
          <div className="flex justify-center items-center my-[2rem] text-white">
            <Link
              href="/menu"
              className="bg-colortext text-second  py-3 px-6 rounded-2xl"
            >
              Ver todos los platos
            </Link>
          </div>
        </div>
      </div>
      {/* COMO PEDIR */}
      <OrderSection />
    </section>
  );
}
