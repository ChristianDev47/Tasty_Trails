"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import { MenuDish } from "@/src/types/dish";
import CartDish from "../Dish";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "@/src/app/globals.css";
import { useDish } from "@/src/hooks/useDish";

export function DishesSection() {
  const { dishData } = useDish();
  const { dishes } = dishData;

  return (
    <div className="flex justify-between items-center sm:px-[3rem]">
      <Swiper
        modules={[Scrollbar, Navigation]}
        loop={true}
        spaceBetween={20}
        className="flex items-center justify-center"
        breakpoints={{
          1338: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
          720: { slidesPerView: 3 },
          567: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {dishes.map((myDish: MenuDish, index: number) => {
          return (
            <SwiperSlide key={index}>
              <CartDish myDish={myDish} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
