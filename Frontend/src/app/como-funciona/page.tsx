import Image from "next/image";
import { poppinsBold } from "@/src/app/ui/fonts";
import Navbar from "@/src/components/Navbar";
import Link from "next/link";

<Navbar />;
export default function Menu() {
  return (
    <div className="w-full pt-[10rem] px-[12rem] xl:px-[8rem] lg:px-[4rem] md:px-[2rem] sm:px-[2rem]  bg-white flex justify-center">
      <div className="max-w-[1536px] w-full">
        <div className="relative grid grid-cols-2 gap-0 bg-colortext rounded-lg md:bg-transparent sm:bg-transparent max-h-[363px]">
          <Image
            className="rounded-l-lg md:hidden sm:hidden max-h-[363px]"
            src="/images/como-funciona.webp"
            alt="como funciona"
            width={550}
            height={550}
            priority
          />
          <div className="bg-colortext md:h-[350px] md:bg-transparent sm:h-[350px] sm:bg-transparent"></div>
          <div className="flex justify-center items-start md:items-center sm:items-center bg-second flex-col absolute top-0 bottom-0 right-0 2xl:left-[25rem] xl:left-[25rem] lg:left-[25rem] md:left-0 m-auto  w-[55%] lg:w-[50%] h-[75%] md:h-[85%] md:w-[100%]  sm:w-[100%] p-8 ">
            <p
              className={`${poppinsBold.className} antialiased leading-[4rem] text-black text-[26px] `}
            >
              Como Funciona
            </p>
            <p className="text-sm  font-bold text-black">
              Realizar pedidos nunca ha sido tan sencillo y placentero. Nuestra
              plataforma está diseñada para ofrecerte una experiencia de pedidos
              de comida sin complicaciones y con los mejores platillos pensados
              para tí. ¿Cómo funciona?
            </p>
            <div id="elige" className="my-6">
              <Link
                href="#elige"
                className="bg-colortext text-second py-2 px-8 text-[14px] rounded-md mr-4 sm:mr-1 hover:scale-110"
              >
                Elije
              </Link>
              <Link
                href="#Recibe"
                className="bg-colortext text-second py-2 px-8 text-[14px] rounded-md mr-4 sm:mr-1 hover:scale-110"
              >
                Recibe
              </Link>
              <Link
                href="#Calienta"
                className="bg-colortext text-second py-2 px-8 text-[14px] rounded-md mr-4 sm:mr-1 hover:scale-110"
              >
                Calienta
              </Link>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-1 gap-4 mt-[4rem] sm:mt-[2rem]">
          <div className="flex flex-col justify-center  h-auto ">
            <p
              className={`${poppinsBold.className} antialiased leading-[2.5rem] text-black text-[24px]  sm:text-center mb-4`}
            >
              1.- Elige los platos que más te gusten
            </p>
            <p className="mb-2 text-[14px]">
              Cada semana estrenamos carta con nuevos platos para que disfrutes
              de la mejor cocina mediterránea.
            </p>
            <p id="Recibe" className="text-[14px]">
              Sólo tienes que elegir los platos que quieras comer la siguiente
              semana y nuestro equipo de cocina se pondrá manos a la obra. Todos
              los platos están diseñados por el equipo de chefs y nutricionistas
              para que disfrutes de una dieta sana, elaborada con la mejor
              materia prima local y de temporada.
            </p>
          </div>
          <div className="flex justify-end w-full sm:justify-center">
            <Image
              className="rounded-xl"
              src="/images/como-funciona/elige.jpg"
              alt="como-funciona-1"
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-1 gap-4 mt-[4rem] sm:mt-[2rem] sm:flex sm:flex-col-reverse">
          <div className="flex justify-start sm:justify-center w-full">
            <Image
              className="rounded-xl"
              src="/images/como-funciona/recibe.jpg"
              alt="como-funciona-1"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col justify-center  h-auto ">
            <p
              className={`${poppinsBold.className} antialiased leading-[2.5rem] text-black text-[24px] mb-4  sm:text-center`}
            >
              2.- Te los llevamos donde estés
            </p>
            <p className="mb-2 text-[14px]">
              Te garantizamos que tus tápers llegarán estés donde estés
              totalmente frescos en una única entrega a partir del lunes
              siguiente a la fecha en la que hagas tu pedido.
            </p>
            <p id="Calienta" className="text-[14px]">
              ¡Ya no tienes que preocuparte en ir a comprar, ponerte a cocinar y
              limpiar!
            </p>
          </div>
        </div>
        <div className="relative grid grid-cols-2 sm:grid-cols-1 gap-4 my-[4rem] sm:mt-[2rem]">
          <div className="flex flex-col justify-center  h-auto ">
            <p
              className={`${poppinsBold.className} antialiased leading-[2.5rem] text-black text-[24px] mb-4 sm:text-center`}
            >
              3.- Abre, calienta y disfruta
            </p>
            <p className="mb-2 text-[14px]">
              Una vez tengas tus platos, podrás mantenerlos en la nevera durante
              8 días como el primer día, sólo tendrás que calentar el plato que
              prefieras y disfrutar de una comida rica, saludable y equilibrada.
            </p>
            <p className="text-[14px]">
              ¡Nosotros cocinamos por ti, tú sólo preocúpate de aprovechar tu
              tiempo!
            </p>
          </div>
          <div className="flex justify-end sm:justify-center w-full rounded-lg">
            <Image
              className="rounded-xl"
              src="/images/como-funciona/calienta.jpg"
              alt="como-funciona-1"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
