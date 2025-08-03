// src/pages/Home.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/home.css";
import bannerVideo from "../assets/videos/banner-video.mp4";
import game1 from "../assets/images/bgmi.png";
import game2 from "../assets/images/cod.png";
import game3 from "../assets/images/freefire.png";
import game4 from "../assets/images/moba5v5.png";

export default function Home() {
  const newsItems = [
    "🔥 Summer Sale is Live! Get 10% off all top-ups!",
    "🎮 New Game Added: Valorant!",
    "💰 Buy Gift Cards & Earn Crate Coins!",
    "⚡ Instant Delivery on All Orders!",
  ];

  const categories = [
    { title: "BGMI", image: game1 },
    { title: "COD Mobile", image: game2 },
    { title: "Free Fire", image: game3 },
    { title: "Moba 5v5", image: game4 },
  ];

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      {/* News Marquee */}
      <div className="bg-green-500 py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee px-4">
          {newsItems.map((item, i) => (
            <span key={i} className="mx-8 font-semibold">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Video Banner */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
        <video
          src={bannerVideo}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Your One-Stop Game Recharge Hub
          </h2>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center text-green-400">Categories</h3>
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={20}
        >
          {categories.map((cat, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-800 rounded-lg shadow p-4 hover:scale-105 transition-transform h-full flex flex-col justify-between">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="text-xl font-semibold mt-4 text-center">{cat.title}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Promotions Placeholder */}
      <section className="bg-gray-800 py-10 px-4">
        <h3 className="text-2xl font-bold text-center text-green-400 mb-6">Promotions</h3>
        <div className="text-center text-gray-300 text-sm sm:text-base">
          🔥 Exclusive deals coming soon. Stay tuned!
        </div>
      </section>
    </div>
  );
}
