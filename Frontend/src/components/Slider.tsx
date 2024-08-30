import Image from "next/image";
import { lobster } from "../app/ui/fonts";
import "../app/globals.css";
import Link from "next/link";

export default function Slider() {
  return (
    <div className="z-30 relative h-full w-full px-[10rem] sm:px-[2rem] flex justify-center bg-second">
      <div className="grid grid-cols-2 bg-second pt-[8rem] pb-[2rem]  lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 max-w-[1536px] w-full">
        <div className="z-30 flex flex-col justify-center mt-[4rem] sm:mt-[2rem] lg:items-center md:items-center sm:items-center ">
          <p
            className={`${lobster.className} antialiased leading-[4.8rem] text-[4.8rem] text-black lg:text-center md:text-center sm:text-center sm:text-[3.2rem]`}
          >
            Disfruta tus
            <br /> <span className="text-colortext">Platillos favoritos</span>
          </p>
          <p className="my-[1rem] text-[0.9rem] text-[#4b4b4b] sm:text-center">
            Come rico, saludable y rapido como simpre con nosotros.{" "}
          </p>
          <ul className="text-[0.9rem] text-[#4b4b4b] flex flex-col items-start">
            <li>
              <span>
                <Image
                  src="/icons/check.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="inline-block"
                  priority
                />{" "}
                Recibe donde y cuando quieras.
              </span>
            </li>
            <li>
              <span>
                <Image
                  src="/icons/check.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="inline-block"
                />{" "}
                Cancela en cualquier momento.
              </span>
            </li>
          </ul>
          <Link
            href="/menu"
            className="mt-[1rem] text-center bg-colortext p-4 px-8 text-white rounded-2xl w-[15rem] text-second"
          >
            HAZ YA TU PEDIDO
          </Link>
        </div>
        <div className="relative flex justify-center items-end  w-full">
          <div className="relative  z-30 pr-[6rem] w-[600px] 2xl:h-[570px] xl:h-[520px] lg:h-[520px] md:h-[460px] sm:h-[420px]">
            <Image src="/images/logo-tasty.png" alt="Banner" fill />
          </div>
        </div>
        <div className="absolute bg-[#76a72c] top-0 right-0 lg:w-[320px] md:hidden sm:hidden 2xl:w-[520px] xl:w-[520px] h-full z-[10]">
          <Image src="/images/img3.png" alt="Banner" fill />
        </div>
      </div>
    </div>
  );
}
