"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Categories } from "@/src/types/dish";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "@/src/app/globals.css";
import { useRouter } from "next/navigation";
import { useCategory } from "@/src/hooks/useCategories";
import { useDish } from "@/src/hooks/useDish";

export function CategorySection() {
  const router = useRouter();
  const { setSelectedCategoryId } = useCategory();
  const { dishData } = useDish();
  const { categories } = dishData;

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    router.push("/menu");
  };

  return (
    <div className="flex justify-between items-center z-50">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="Swiper flex items-center justify-center"
        breakpoints={{
          1100: { slidesPerView: 5, spaceBetween: 10 },
          760: { slidesPerView: 3, spaceBetween: 20 },
          500: { slidesPerView: 2, spaceBetween: 50 },
          0: { slidesPerView: 2, spaceBetween: 20 },
        }}
      >
        {categories.length > 0 &&
          categories.map((category: Categories, index: number) => (
            <SwiperSlide key={index}>
              <button
                onClick={() => handleSelectCategory(category.id)}
                className="relative flex justify-center items-center bg-second flex-col border-2 rounded-lg p-9 border-transparent hover:border-primary transition-all duration-[600ms] overflow-hidden group shadow-md "
              >
                <div className="absolute top-[-200%] bg-gray w-[400px] h-[600px] rounded-full aspect-square z-20 group-hover:top-[-50%] transition-all duration-500"></div>
                <div className="absolute top-[-260%] bg-colortext w-[400px] h-[600px] rounded-full aspect-square z-40 group-hover:top-[-180%] transition-all duration-500"></div>
                <div className="p-2 bg-second rounded-full aspect-square z-50">
                  <Image
                    src={`/images/categories/${category.name}.webp`}
                    alt=""
                    width={120}
                    height={120}
                  />
                </div>
                <div className=" bg-colortext text-second text-sm rounded-md px-2 py-1 mt-4 z-50">
                  {category.name}
                </div>
              </button>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
