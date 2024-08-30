"use client";

import { useState, useEffect, type PropsWithChildren } from "react";
import { useDish } from "../hooks/useDish";

export default function Loading({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const { dishData } = useDish();

  useEffect(() => {
    if (dishData.dishes.length > 0) {
      const timeout = setTimeout(() => {
        setLoading(false); 
      }, 2500);
      
      return () => clearTimeout(timeout);
    }
  }, [dishData.dishes]);

  return loading ? (
    <div className="w-full h-full flex justify-center items-center bg-[#f2f2f2]">
      <VideoComponent fileName="/videos/food_loading.mp4" />
    </div>
  ) : (
    children
  );
}

// Definición del componente de video
function VideoComponent({ fileName }: { fileName: string }) {
  return (
    <video
      width="320"
      height="240"
      className="loading-video border-none outline-none"
      autoPlay
      loop
      muted
    >
      <source src={fileName} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
