import Image from "next/image";
import { poppinsBold } from "../app/ui/fonts";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full 2xl:h-[320px] xl:h-[320px] lg:h-[320px] md:h-[380px] sm:h-[400px] bg-black flex justify-center 2xl:px-[10rem] xl:px-[10rem] lg:px-[3rem] md:px-[3rem] sm:px-[2rem]">
      <div className="grid grid-cols-4 pt-[3rem] text-second lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-4 max-w-[1536px] w-full">
        <div className="flex justify-start flex-col items-start lg:hidden md:hidden sm:hidden">
          <div className="flex justify-center items-center my-4">
            <Image
              src="/images/logo.png"
              alt="direction"
              width={60}
              height={60}
            />
            <p
              className={`${poppinsBold.className} antialiased ml-4 text-second text-[28px]`}
            >
              TASTY
            </p>
          </div>
          <div className="flex my-4 gap-5 pl-2">
            <Image
              src="/icons/footer/instagram.svg"
              alt="direction"
              width={25}
              height={25}
            />
            <Image
              src="/icons/footer/face.svg"
              alt="direction"
              width={25}
              height={25}
            />
            <Image
              src="/icons/footer/twitter.svg"
              alt="direction"
              width={25}
              height={25}
            />
          </div>
        </div>
        <div className="flex justify-start flex-col items-start">
          <h1 className={`${poppinsBold.className} antialiased text-[16px]`}>
            CONTACT
          </h1>
          <div className="flex justify-center items-center my-4">
            <Image
              className="sm:hidden"
              src="/icons/footer/direction.svg"
              alt="direction"
              width={30}
              height={30}
            />
            <p className="ml-4 text-[13px] sm:ml-0">
              1247/Plot No. 39, 15th Phase, Colony, Kkatpally, Hyderabad
            </p>
          </div>
          <div className="flex justify-center items-center my-4">
            <Image
              className="sm:hidden"
              src="/icons/footer/phone.svg"
              alt="direction"
              width={30}
              height={30}
            />
            <p className="ml-4 text-[13px] sm:ml-0">
              +591 68846448 <br />
              +591 68488464
            </p>
          </div>
          <div className="flex justify-center items-center my-4">
            <Image
              className="sm:hidden"
              src="/icons/footer/mail.svg"
              alt="direction"
              width={30}
              height={30}
            />
            <p className="ml-4 text-[13px] sm:ml-0">
              user@gmail.com <br />
              admin@gmail.com
            </p>
          </div>
        </div>
        <div className="flex justify-start flex-col items-start">
          <h1 className={`${poppinsBold.className} antialiased text-[16px]`}>
            INFORMACIÓN
          </h1>
          <ul className="my-4 space-y-6">
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Preguntas frecuentes
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Terminos y condiciones de uso
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Aviso legal
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-start flex-col items-start">
          <h1 className={`${poppinsBold.className} antialiased text-[16px]`}>
            NUESTROS LINKS
          </h1>
          <ul className="my-4 space-y-6">
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Menu Semanal
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                Como Funciona
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-colortext text-[13px]">
                ¿Quiénes Somos?
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
