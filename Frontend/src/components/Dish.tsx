import Image from "next/image";
import { MenuDish } from "../types/dish";
import { useEffect, useState } from "react";
import { useOrder } from "../hooks/useOrder";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
  myDish: MenuDish;
}

export default function CartDish({ myDish }: Props) {
  const weight = Math.round(parseInt(myDish.dish.weight));
  const kilocalorias = Math.round(parseInt(myDish.dish.calories));
  const proteins = Math.round(parseInt(myDish.dish.proteins));
  const carbohydrates = Math.round(parseInt(myDish.dish.carbohydrates));
  const fats = Math.round(parseInt(myDish.dish.fats));
  const price = parseFloat(myDish.dish.price).toString().replace(".", ",");

  const { addtoOrder, removeFromOrder, order } = useOrder();

  const [numOrder, setNumOrder] = useState<number>(0);

  useEffect(() => {
    const myOrder = order.filter((dish) => dish.dish_id === myDish.dish_id)[0];
    if (myOrder) {
      setNumOrder(myOrder.count);
    } else {
      setNumOrder(0);
    }
  }, [order]);

  const DishToOrder = {
    dish_id: myDish.dish_id,
    count: 1,
    price: myDish.dish.price,
  };

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleAddToOrder = () => {
    setNumOrder(numOrder + 1);
    addtoOrder(DishToOrder);
    toast.success(`Agregaste ${myDish.dish.name} al carrito.`, {
      duration: 4000,
      style: {
        background: "#7DA640",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#000",
      },
    });
  };

  const prename = removeAccents(myDish.dish.name)
    .toLowerCase()
    .replaceAll(" ", "-");
  const name = prename.replaceAll(",", "");
  return (
    <div className="flex items-center flex-col justify-center bg-gray rounded-xl h-full w-full shadow-md">
      <Link className="w-full" href={`/menu/detalle/${name}`} passHref>
        <div className="relative overflow-hidden rounded-t-xl w-full h-[260px] group">
          <Image
            className="group-hover:scale-125 transition-all duration-[1200ms] cursor-pointer w-full"
            src={myDish.dish.image}
            alt="Image"
            fill
            property=""
          />
          <div className="absolute left-0 bottom-0 p-2 bg-black text-second rounded-r-lg text-[12px]">
            {weight}kg
          </div>
        </div>
        <div className=" w-full p-2 text-sm">
          <div className="h-14 flex justify-center items-center px-1">
            <p className="text-[13px] font-semibold">{myDish.dish.name}</p>
          </div>
          <div className="flex justify-between items-center rounded-lg bg-second p-2 mb-2 ">
            <div className="flex flex-col items-center justify-center leading-none">
              <p className="text-[12px] font-bold">{kilocalorias}</p>
              <p className="text-[9px] text-gray-700">Kilocalorias</p>
            </div>
            <div className="flex flex-col items-center justify-center leading-none">
              <p className="text-[12px] font-bold">{proteins}</p>
              <p className="text-[9px] text-gray-700">Proteinas</p>
            </div>
            <div className="flex flex-col items-center justify-center leading-none">
              <p className="text-[12px] font-bold">{carbohydrates}</p>
              <p className="text-[9px] text-gray-700">Carbohidratos</p>
            </div>
            <div className="flex flex-col items-center justify-center leading-none">
              <p className="text-[12px] font-bold">{fats}</p>
              <p className="text-[9px] text-gray-700">Grasas</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex text-white w-full justify-between items-center mb-4 px-2">
        <Link href={`/menu/detalle/${name}`} passHref>
          <div className="inline-flex justify-start items-center mx-2">
            <p className="text-[16px] font-semibold text-black text-center">
              {price}$
            </p>
          </div>
        </Link>
        <div
          className={` flex  ${
            numOrder == 0 ? "justify-end" : "justify-between"
          } items-center  text-second text-sm h-[28px] `}
        >
          <button
            onClick={() => {
              setNumOrder(numOrder - 1);
              removeFromOrder(DishToOrder);
              if (numOrder == 1) {
                toast.error(`Eliminaste ${myDish.dish.name} del carrito.`, {
                  duration: 4000,
                });
              }
            }}
            className={`rounded-l-lg bg-colortext aspect-square px-2 text-lg h-full  ${
              numOrder == 0 ? "hidden" : ""
            }`}
          >
            -
          </button>
          <button
            onClick={handleAddToOrder}
            className={`${
              numOrder == 0 ? "rounded-lg px-[43px] " : "px-4"
            } bg-colortext h-full  text-sm`}
            disabled={numOrder > 0 ? true : false}
          >
            <div className="relative flex justify-center items-center h-full">
              <div className="absolute">
                {numOrder == 0 ? "Agregar" : numOrder}
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              setNumOrder(numOrder + 1);
              addtoOrder(DishToOrder);
            }}
            className={`rounded-r-lg bg-colortext aspect-square px-2 text-[18px] h-full ${
              numOrder == 0 ? "hidden" : ""
            }`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
