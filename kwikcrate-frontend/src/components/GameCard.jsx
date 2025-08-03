import React from "react";

const GameCard = ({ title, image, onClick }) => {
  return (
    <div
      className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default GameCard;
