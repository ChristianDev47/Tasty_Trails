"use client";
import { dm_sans } from "@/src/app/ui/fonts";
import { useCategory } from "@/src/hooks/useCategories";
import { useDish } from "@/src/hooks/useDish";
import { Categories } from "@/src/types/dish";
import Image from "next/image";
import { useEffect } from "react";

export default function SelectedByCategory() {
  const { selectedCategoryId, setSelectedCategoryId } = useCategory();
  const { dishData, getDishesByCategoryId } = useDish();
  const { categories } = dishData;

  useEffect(() => {
    const getall = async () => {
      if (selectedCategoryId) {
        getDishesByCategoryId(selectedCategoryId);
      }
    };
    getall();
  }, [selectedCategoryId, setSelectedCategoryId]);

  function SelectionCategory() {
    return (
      <div className="grid grid-cols-6 sm:grid-cols-3 gap-2 bg-transparent py-4 rounded-b-3xl w-full">
        {categories.length > 0 &&
          categories.map((category: Categories, index: number) => {
            return (
              <button
                key={index}
                className="w-full "
                onClick={() => {
                  setSelectedCategoryId(category.id);
                }}
              >
                <div
                  key={category.id}
                  className={`flex flex-col justify-center  items-center transition-all duration-[300ms] cursor-pointer border-b-2 border-transparent hover:bg-colortext w-[75px] h-[75px] hover:text-second hover:scale-110 rounded-lg  ${
                    dm_sans.className
                  } antialiased ${
                    selectedCategoryId === category.id
                      ? "scale-110 text-second bg-colortext"
                      : "text-black "
                  }`}
                >
                  <Image
                    src={`/images/categories/icons/${category.name}.png`}
                    alt=""
                    width={35}
                    height={35}
                  />
                  <p className=" text-sm first-letter:uppercase">
                    {category.name}
                  </p>
                </div>
              </button>
            );
          })}
      </div>
    );
  }

  return { SelectionCategory };
}
