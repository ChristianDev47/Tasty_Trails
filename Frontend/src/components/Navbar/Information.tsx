"use client";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { useState } from "react";

export default function Information() {
  return (
    <div
      className={`flex transition-opacity duration-300 items-center h-[3rem] sm:h-[4rem] w-full bg-primary text-second text-sm px-[10rem] lg:px-[3.5rem] md:px-[3.5rem] sm:px-[1rem] justify-center`}
    >
      <div className="flex items-center justify-between flex-wrap w-full max-w-[1536px]">
        <div className="flex mr-4 my-1">
          <StorefrontRoundedIcon
            sx={{ fontSize: 20 }}
            style={{ fill: "white" }}
          />
          <p className="mx-2">Avenida nueva Deli nro 435</p>
        </div>
        <div className="flex my-1">
          <PhoneRoundedIcon sx={{ fontSize: 20 }} style={{ fill: "white" }} />
          <p className="mx-2">Realiza tus Pedidos al 68594875</p>
        </div>
      </div>
    </div>
  );
}
