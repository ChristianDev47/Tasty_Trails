"use client";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { lobster, rubik } from "@/src/app/ui/fonts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "@/src/app/globals.css";
import Link from "next/link";

export default function HealthySecion() {
  const imageDishes = [
    { name: "principal", src: "/images/about/principal.webp" },
    { name: "veganos", src: "/images/about/vegan.webp" },
    { name: "soup", src: "/images/about/soup.webp" },
  ];
  return (
    <div className="w-full pr-[10rem] lg:px-[3rem] md:px-[4rem] sm:px-[1rem] flex justify-center bg-light-green">
      <div className="flex relative justify-between flex-row pl-[5rem] md:pl-0 sm:pl-0 gap-[5rem] md:gap-[1rem] sm:gap-[.2rem] sm:flex-col-reverse w-full  py-[2rem] md:flex-col-reverse max-w-[1536px] ">
        <Image
          className="absolute top-10 left-8 md:top-64 sm:top-[28rem] sm:left-5"
          src="/images/pic3.png"
          alt=""
          width={200}
          height={200}
        />
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="swiper_card "
        >
          {imageDishes.map((imageDish, index) => {
            return (
              <SwiperSlide className="bg-transparent" key={index}>
                <div className="w-[400px] h-[600px] bg-transparent ">
                  <Image src={imageDish.src} alt="" fill />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className=" flex justify-center xl:text-start lg:text-start md:text-center sm:text-center items-center">
          <div className="font-bold">
            <p
              className={`${lobster.className} antialiased text-[2rem] md:text-[1.5rem] sm:text-[1.5rem] text-colortext`}
            >
              La mejor de lo mejor
            </p>
            <p
              className={`${rubik.className} antialiased text-[2rem]  md:text-[2rem] sm:text-[2rem] leading-[2.7rem]`}
            >
              Contamos con Alimentos Ricos y de Calidad
            </p>
            <div className="mt-6 text-[#535353] text-sm">
              <p>
                Creemos que la comida es más que solo sabor. Es una fuente de
                bienestar y energía. Por eso, nos apasiona ofrecerte platillos
                deliciosos y nutritivos elaborados con ingredientes frescos y de
                alta calidad. Disfruta de una amplia variedad de opciones
                saludables sin sacrificar sabor, y siente la satisfacción de
                alimentar tu cuerpo y tu mente.
              </p>
            </div>
            <div className="my-8">
              <Link
                href="/about"
                className="mt-[0.5rem] bg-[#718238] p-4 px-8 text-white rounded-2xl text-sm text-second"
              >
                CONOCE MÁS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
