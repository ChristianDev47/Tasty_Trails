import FormLogin from "@/src/components/Login/Form";
import Image from "next/image";
import Link from "next/link";
import { lobster } from "../ui/fonts";

export default function Login() {
  return (
    <div className="w-screen h-screen bg-light-green flex justify-center items-center mt-[3rem] min-h-[750px] ">
      <div className="grid grid-cols-2 gap-4 bg-second rounded-3xl w-[1000px] lg:w-[900px] md:w-[800px] sm:w-[800px] h-[500px] mx-[2rem] overflow-hidden ">
        <div className="relative inline-flex items-center overflow-hidden justify-center z-30 md:hidden sm:hidden">
          <div className="absolute bg-[#76a72c] top-0 left-0 w-[500px] lg:w-[450px] h-full z-30">
            <Image src="/images/img3.png" alt="Banner" fill />
          </div>
          <Image
            className="z-50"
            src="/images/login.png"
            alt="login image"
            width={500}
            height={500}
            style={{ width: "100%", height: "100%" }}
            priority
          />
        </div>
        <div className="fles justify-center items-center w-full px-6 py-6 md:col-span-2 sm:col-span-2 md:px-[6rem] sm:px-[3rem] ">
          <h1
            className={`${lobster.className} antialiased  text-center text-3xl my-4`}
          >
            Inicio de sesión 👋
          </h1>
          <p className="mb-6 text-[14px]">
            Introduce tu cuenta de siempre en Tasty o regístrate si es tu
            primera vez.
          </p>
          <FormLogin />
          <Link href="/register">
            <div className="text-center w-full text-sm">
              Es mi primera vez y quiero unirme
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
