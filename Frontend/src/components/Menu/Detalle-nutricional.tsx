"use client";
import Image from "next/image";
import { Dish } from "@/src/types/dish";
import { useState } from "react";

interface Props {
  dish: Dish;
}

export default function InformacionNutricional({ dish }: Props) {
  const hundredWeight: number = Number(
    parseFloat((Number(dish.weight) / 100).toFixed(2))
  );
  const minWeight = parseFloat(
    (Number(dish.calories) / hundredWeight).toFixed(2)
  );
  const minFats = parseFloat((Number(dish.fats) / hundredWeight).toFixed(2));
  const minSaturatedFats = parseFloat(
    (Number(dish.saturated_fats) / hundredWeight).toFixed(2)
  );
  const minCarbohydrates = parseFloat(
    (Number(dish.carbohydrates) / hundredWeight).toFixed(2)
  );
  const minSugar = parseFloat((Number(dish.sugars) / hundredWeight).toFixed(2));
  const minProtein = parseFloat(
    (Number(dish.proteins) / hundredWeight).toFixed(2)
  );
  const minDietaryFiber = parseFloat(
    (Number(dish.dietary_fiber) / hundredWeight).toFixed(2)
  );

  const valorNutricionales = [
    { name: "Calorias", minvalue: minWeight, value: parseFloat(dish.calories) },
    { name: "Grasas", minvalue: minFats, value: parseFloat(dish.fats) },
    {
      name: "Grasas saturadas",
      minvalue: minSaturatedFats,
      value: parseFloat(dish.saturated_fats ?? "0"),
    },
    {
      name: "Carbohidratos",
      minvalue: minCarbohydrates,
      value: parseFloat(dish.carbohydrates),
    },
    {
      name: "Azúcares",
      minvalue: minSugar,
      value: parseFloat(dish.sugars ?? "0"),
    },
    {
      name: "Proteína",
      minvalue: minProtein,
      value: parseFloat(dish.proteins),
    },
    {
      name: "Fibra alimentaria",
      minvalue: minDietaryFiber,
      value: parseFloat(dish.dietary_fiber ?? "0"),
    },
  ];

  const [arrowDirection, setArrowDirection] = useState<string>("up");
  const [accordion, setAccordion] = useState<string>("h-0 py-0");

  const handleButtonClick = () => {
    setArrowDirection((prevclass) => (prevclass === "up" ? "down" : "up"));
    setAccordion((prevAccordion) =>
      prevAccordion === "h-0 py-0" ? "h-[370px] py-0" : "h-0 py-0"
    );
  };

  return (
    <div className="flex justify-between items-center rounded-xl bg-second p-1 mb-[1rem] sm-[1rem]">
      <div className="rounded-lg border border-black bg-white dark:border-neutral-600 dark:bg-body-dark w-[450px] md:w-[400px] sm:w-[340px]">
        <h2 className="mb-0" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-body-dark [&:not([data-twe-collapse-collapsed])]:bg-white [&:not([data-twe-collapse-collapsed])]:text-black [&:not([data-twe-collapse-collapsed])]:shadow-border-b dark:[&:not([data-twe-collapse-collapsed])]:bg-surface-dark dark:[&:not([data-twe-collapse-collapsed])]:text-black dark:[&:not([data-twe-collapse-collapsed])]:shadow-white/10 font-bold"
            onClick={handleButtonClick}
          >
            Información Nutricional
            <span className="ms-auto h-5 w-5 shrink-0 rotate-[-180deg] transition-transform duration-200 ease-in-out group-data-[twe-collapse-collapsed]:me-0 group-data-[twe-collapse-collapsed]:rotate-0 motion-reduce:transition-none [&>svg]:h-6 [&>svg]:w-6">
              <Image
                src={`/icons/arrow-${arrowDirection}.svg`}
                alt="Call icon"
                width={45}
                height={100}
              />
            </span>
          </button>
        </h2>
        <div
          className={`w-full block overflow-hidden ${accordion} transition-all ease-in-out duration-500 sm:mb-4`}
        >
          <div className="px-5 ">
            <table className="min-w-full rounded-3xl text-second md:table w-full">
              <thead className="rounded-md bg-black  text-left text-sm font-normal text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium sm:pl-6">
                    Valor
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    por 100g
                  </th>
                  <th scope="col" className="px-3 py-4 font-medium">
                    por {parseInt(dish.weight)}g
                  </th>
                </tr>
              </thead>
              <tbody className="bg-second text-black">
                {valorNutricionales.map((valorNutricional, index) => {
                  return (
                    <tr
                      key={index}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        {valorNutricional.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {valorNutricional.minvalue}g
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {valorNutricional.value}g
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
