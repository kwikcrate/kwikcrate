import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bgmiBanner from "../assets/images/bgmi.png";
import freefireBanner from "../assets/images/freefire.png";
import codBanner from "../assets/images/cod.png";
import mobaBanner from "../assets/images/moba5v5.png";

const games = [
  { name: "BGMI", image: bgmiBanner, link: "/bgmi" },
  { name: "Free Fire", image: freefireBanner, link: "/freefire" },
  { name: "COD Mobile", image: codBanner, link: "/cod" },
  { name: "Moba 5v5", image: mobaBanner, link: "/moba" },
];

const Games = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-400 hover:text-white hover:underline"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">All Games</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {games.map((game, index) => (
          <Link
            key={index}
            to={game.link}
            className="bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{game.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Games;
