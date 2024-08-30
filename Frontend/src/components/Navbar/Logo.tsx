import { lilita } from "@/src/app/ui/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center justify-start col-span-2 h-[80px] w-full">
      <Link href="/" className=" inline-flex items-ceenter justify-start ">
        <Image
          src="/images/logo.png"
          alt="tasti trail icon"
          width={50}
          height={50}
        />
        <p
          className={`${lilita.className} antialiased text-[28px] mx-2 text-end text-black font-thin`}
        >
          TASTY
        </p>
      </Link>
    </div>
  );
}
