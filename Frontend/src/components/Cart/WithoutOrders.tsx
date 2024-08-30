import Image from "next/image";

export default function NoOrder({ closeCart }: { closeCart: () => void }) {
  return (
    <div className="w-full h-full">
      <div className=" my-4 ">
        <p className="mx-6 text-xl">No tienes pedidos</p>
      </div>
      <div
        className={`h-[32rem] mx-6 overflow-x-hidden flex items-center justify-center`}
      >
        <Image
          src="/images/cart/cart-empty.png"
          alt="cart-empty"
          width={300}
          height={300}
        />
      </div>
      <div className="flex items-end justify-end mt-[2rem] sm:mt-[2rem] text-second  w-full px-8">
        <button
          onClick={closeCart}
          className="bg-colortext py-3 w-full rounded-3xl"
        >
          Empieza a comprar
        </button>
      </div>
    </div>
  );
}
