// src/components/BannerSlider.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function BannerSlider() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/home`);
        setBanners(data?.banners || []);
      } catch (err) {
        console.error("Failed to load banners", err);
      }
    };
    fetchBanners();
  }, []);

  if (!banners.length) return null;

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {banners.map((videoUrl, idx) => (
          <SwiperSlide key={idx}>
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 text-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
                Your One-Stop Game Recharge Hub
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
