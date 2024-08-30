import Image from "next/image";
import React from "react";
import { poppinsBold } from "../ui/fonts";

export default function QuienesSomos() {
  const options = [
    {
      name: "Productos Frescos",
      description:
        "Contamos con los mejores y mas frescos productos en el mercado",
      icon: "best_food",
    },
    {
      name: "Chefs Expertos",
      description:
        "Tu comida esta preparada con la mayor calidad y los mejores chefs",
      icon: "chef",
    },
    {
      name: "Mejor Menu",
      description:
        "Contamos con el mejor menu adaptado a todos los gustos y paladares",
      icon: "products",
    },
    {
      name: "Pedidos Seguros",
      description:
        "Tus pedidos llegaran intactos y listos para que los disfrutes",
      icon: "order_bag",
    },
  ];
  const chefs = [
    { name: "Ferran Adrià", title: "Jefe de cocina", img: "chef1" },
    { name: "Joan Roca", title: "Jefe de cocina", img: "chef2" },
    { name: "Quique Dacosta", title: "Jefe de cocina", img: "chef3" },
    { name: "Pedro Castilla", title: "Jefe de cocina", img: "chef4" },
  ];
  return (
    <div className="w-full pt-[12rem]  px-[10rem] md:px-[3rem] sm:px-[2rem] flex justify-center">
      <div className="flex flex-col justify-center items-center  max-w-[1536px] w-full pb-[4rem]">
        <div className=" grid grid-cols-2 gap-0  bg-second max-h-[315px] min-h-[315px] overflow-hidden m-0">
          <div className="flex max-h-[315px] justify-start z-30 md:hidden sm:hidden">
            <Image
              src="/images/about/about.png"
              alt="principal"
              width={700}
              height={700}
              priority
            />
          </div>
          <div className="flex flex-col justify-center items-start md:items-center sm:items-center md:col-span-2 sm:col-span-2 p-[2rem] font-semibold ">
            <p
              className={`${poppinsBold.className} antialiased text-[32px] lg:text-[28px] lg:mb-[1rem] text-colortext mb-[2rem] sm-[2rem]`}
            >
              Quiénes Somos
            </p>
            <p className="text-[15px] lg:text-[13px] lg:text-center md:text-center sm:text-center">
              En Tasty Trails, estamos dedicados a llevar la mejor comida
              directamente a tu puerta. Trabajamos con restaurantes locales y
              chefs de renombre para ofrecerte una amplia selección de platillos
              deliciosos y de alta calidad. Nuestra misión es hacer que
              disfrutes de una experiencia gastronómica excepcional y sin
              complicaciones en cada pedido. ¡Bienvenido a Tasty Trails, donde
              cada bocado es un viaje culinario!
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-[4rem] ">
          <h1
            className={`${poppinsBold.className} antialiased mt-[4rem] text-[28px] text-center my-[2rem] m-auto`}
          >
            Qué nos hace unicos
          </h1>
          <div className="flex justify-center items-center flex-wrap w-full">
            {options.map((opt, index) => {
              return (
                <div
                  key={index}
                  className="w-[18rem] h-[18rem]  lg:w-[16rem] lg:h-[16rem] md:w-[16rem] md:h-[16rem] flex items-center justify-center flex-col bg-light-green rounded-lg  py-[2rem] m-[1rem] shadow-md transition-all duration-300 hover:bg-second hover:scale-110 "
                >
                  <div className="bg-colortext flex justify-center items-center rounded-full aspect-square h-[5rem]">
                    <Image
                      src={`icons/about/${opt.icon}.svg`}
                      alt="best food"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center text-center mx-[2rem]">
                    <p className="text-[18px] lg:text-[16px] md:text-[15px] font-bold my-[0.5rem] textce">
                      {opt.name}
                    </p>
                    <p className="text-center text-[13px] md:text-[12px]">
                      {opt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pb-[4rem] ">
          <h1
            className={`${poppinsBold.className} antialiased mt-[4rem] text-[28px] text-center my-[2rem] m-auto`}
          >
            Nuestros Chefs
          </h1>
          <div className="flex justify-center items-center flex-wrap w-full">
            {chefs.map((chef, index) => {
              return (
                <div
                  key={index}
                  className="bg-second rounded-lg group shadow-md w-[18rem] md:w-[16rem] flex items-start justify-center flex-col  m-[1rem]"
                >
                  <div className="relative overflow-hidden rounded-t-lg w-full  h-[22rem] lg:h-[20rem] md:h-[20rem] sm:h-[18rem]">
                    <div className="absolute top-[-250%] left-[-250%] duration-700 transition-all transform-gpu group-hover:top-[-50%] group-hover:left-[-30%] rounded-full aspect-square bg-[#00000033] inset-0  h-[250%] w-[300%] z-[40]"></div>
                    <Image
                      className=" absolute duration-500 transition-transform transform-gpu group-hover:scale-110 z-[20]"
                      src={`/images/chefs/${chef.img}.jpg`}
                      alt="best food"
                      fill
                    />
                  </div>
                  <div className="bg-second p-2 flex justify-between items-center z-20 w-full">
                    <div className="flex flex-col">
                      <p className="text-[15px] font-bold">{chef.name}</p>
                      <p className="text-[13px] text-colortext">{chef.title}</p>
                    </div>
                    <div className=" bg-colortext rounded-lg p-1">
                      <Image
                        src={`icons/about/chef.svg`}
                        alt="chef"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
