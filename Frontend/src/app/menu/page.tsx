"use client";
import React, { Suspense } from "react";
import CartDish from "@/src/components/Dish";
import { dm_sans, rubik } from "@/src/app/ui/fonts";
import SelectedByCategory from "@/src/components/Menu/Selectet_by_category";
import { MenuDish } from "@/src/types/dish";
import Image from "next/image";
import { useDish } from "@/src/hooks/useDish";

export default function Menu() {
  window.scrollTo(0, 0);
  const { SelectionCategory } = SelectedByCategory();
  const { dishData } = useDish();
  const { dishesByCategory } = dishData;

  return (
    <div className="w-full px-[10rem] lg:px-[3.5rem] md:px-[3.5rem] sm:px-[3.5rem] pt-[12rem] flex justify-center ">
      <div className="max-w-[1536px]">
        <div
          className={`w-full bg-second grid grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-2   relative text-[28px] ${rubik.className} antialiased  rounded-xl text-black  py-4 px-8`}
        >
          <div className="flex items-start justify-start flex-col text-black relative text w-full h-full col-span-2">
            <p className="my-2 sm:leading-8">
              Disfruta de todos nuestros platillos
            </p>
            <p className={`text-sm ${dm_sans.className} antialiased`}>
              Contamos con una gran variedad de platillos dividos por categorias
              diseñadas y pensadas para que tengas la mejor experiencia
              comprando tus platillos favoritos y siempre con la mayor calidad.
            </p>
            <Suspense fallback={<p>Loading feed...</p>}>
              <SelectionCategory />
            </Suspense>
          </div>
          <div className="w-full relative flex justify-end pr-6 col-span-1">
            <div className="flex absolute justify-end items-end w-[250px] h-[300px] 2xl:top-[-32%]  xl:top-[-32%] lg:top-[-18%] md:hidden sm:hidden">
              <Image
                className="absolute z-30 "
                src="/images/alldishes.png"
                alt=""
                fill
                style={{
                  WebkitMaskImage: "linear-gradient(black 80%, transparent)",
                  maskImage: "linear-gradient(black 80%, transparent)",
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {
            <div className="my-6 ">
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 md:gap-x-14 sm:grid-cols-1">
                {dishesByCategory.map((myDish: MenuDish, dishIndex: number) => {
                  return (
                    <div key={dishIndex}>
                      <CartDish myDish={myDish} />
                    </div>
                  );
                })}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
