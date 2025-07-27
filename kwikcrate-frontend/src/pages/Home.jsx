// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/home.css";

// ✅ Use CRA env variable
const API_BASE = process.env.REACT_APP_API_BASE_URL;

export default function Home() {
  const [newsItems] = useState([
    "🔥 Summer Sale is Live! Get 10% off all top-ups!",
    "🎮 New Game Added: Valorant!",
    "💰 Buy Gift Cards & Earn Crate Coins!",
    "⚡ Instant Delivery on All Orders!",
  ]);

  const [banner, setBanner] = useState(null);
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchHomepageContent = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/home`);
        setBanner(data.banner || null);
        setCategories(data.categories || []);
        setPromotions(data.promotions || []);
      } catch (error) {
        console.error("Failed to load homepage content:", error);
      }
    };

    fetchHomepageContent();
  }, []);

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      {/* 🔔 News Marquee */}
      <div className="bg-green-500 py-2 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee px-4">
          {newsItems.map((item, i) => (
            <span key={i} className="mx-8 font-semibold">{item}</span>
          ))}
        </div>
      </div>

      {/* 🎥 Banner Video */}
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] overflow-hidden">
        {banner ? (
          <video
            src={banner.url}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <span className="text-white text-xl">Loading banner...</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
            Your One-Stop Game Recharge Hub
          </h2>
        </div>
      </div>

      {/* 🎮 Categories */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center text-green-400">Categories</h3>
        {categories.length > 0 ? (
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
        ) : (
          <p className="text-center text-gray-400">No categories available.</p>
        )}
      </section>

      {/* 💥 Promotions */}
      <section className="bg-gray-800 py-10 px-4">
        <h3 className="text-2xl font-bold text-center text-green-400 mb-6">Promotions</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promotions.length > 0 ? (
            promotions.map((promo, i) => (
              <div key={i} className="bg-gray-700 rounded-lg p-4 shadow hover:shadow-lg transition">
                <h4 className="text-lg font-bold text-white mb-2">{promo.title}</h4>
                <p className="text-gray-300 text-sm">{promo.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 w-full col-span-3">No promotions available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
