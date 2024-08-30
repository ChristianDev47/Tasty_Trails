import Image from "next/image";
import { useRouter } from "next/navigation";


export function UserButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/account/profile')}>
      <div className="flex items-center p-2 text-white rounded-md bg-second">
        <Image
          src="/icons/account/profile.svg"
          alt="user"
          width={28}
          height={28}
        />
      </div>
    </button>
  );
}

export function CartButton({
  showCart,
  numDishes,
}: {
  showCart: () => void;
  numDishes: number;
}) {
  return (
    <button
      onClick={showCart}
      className="relative inline-flex items-center text-white rounded-md bg-second"
    >
      <div className="p-2">
        <Image src="/icons/order_bag.svg" alt="user" width={28} height={28} />
      </div>
      {numDishes > 0 ? (
        <div className="absolute p-[8px] top-[1px] right-[1px] rounded-full aspect-square bg-[#323232] text-second">
          <div className="relative flex justify-center items-center text-[9px] font-semibold text-center">
            <p className="absolute"> {numDishes}</p>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </button>
  );
}

export function ResponsiveButton({ showResNav }: { showResNav: () => void }) {
  return (
    <button
      className="items-center  text-white bg-transparent rounded-xl hidden lg:block md:block sm:block"
      onClick={showResNav}
    >
      <div className="flex items-center p-2 text-white rounded-md bg-second">
        <Image src="/icons/menu.svg" alt="user" width={28} height={28} />
      </div>
    </button>
  );
}
