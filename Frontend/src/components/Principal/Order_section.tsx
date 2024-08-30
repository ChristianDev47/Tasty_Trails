import { lobster, rubik } from "@/src/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function OrderSection() {
  return (
    <div className=" w-full bg-light-green py-[2rem] px-[7rem] lg:px-[2rem] md:px-[2rem] sm:px-[1rem] flex justify-center">
      <div className="max-w-[1536px] w-full">
        <h1 className=" font-bold mb-[2rem] text-center">
          <p
            className={`${lobster.className} antialiased text-colortext text-[1.5rem]`}
          >
            Tasty Trails
          </p>
          <p className={`${rubik.className} antialiased text-[2rem]`}>
            Come bien y saludable en tres pasos
          </p>
        </h1>
        <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 text-xl">
          <div className="flex justify-center items-center flex-col">
            <Image src="/icons/select.svg" alt="" width={200} height={200} />
            <p className="text-lg font-bold">1. Elige</p>
            <p className="text-center text-[1rem] lg:text-[1.2rem] md:text-[1.1rem] sm:text-[1rem]">
              Nuestros chefs cocinan para ti,
              <br /> una carta nueva cada semana.
            </p>
          </div>
          <div className="flex justify-center items-center flex-col">
            <Image src="/icons/receive.svg" alt="" width={200} height={200} />
            <p className="text-lg font-bold">2. Recibe</p>
            <p className="text-center text-[1rem] lg:text-[1.2rem] md:text-[1.1rem] sm:text-[1rem]">
              Te lo enviamos a domicilio <br /> en transporte refrigerado.
            </p>
          </div>
          <div className="flex justify-center items-center flex-col col-span-1 lg:col-span-1 md:col-span-2 sm:col-span-1">
            <Image src="/icons/warm.svg" alt="" width={200} height={200} />
            <p className="text-lg font-bold">3. Calienta</p>
            <p className="text-center text-[1rem] lg:text-[1.2rem] md:text-[1.1rem] sm:text-[1rem]">
              Tu comida aguantará 8 días en tu nevera <br /> y la tendrás lista
              en 3 minutos.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[4rem] text-second">
          <Link
            href="/menu"
            className="bg-[#718238] text-sm py-4 px-6 rounded-3xl"
          >
            REALIZA TU PEDIDO YA!
          </Link>
        </div>
      </div>
    </div>
  );
}
