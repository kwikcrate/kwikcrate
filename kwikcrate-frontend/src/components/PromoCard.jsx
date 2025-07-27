// src/components/PromoCard.jsx
import React from "react";

const PromoCard = ({ image, title, description, link }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 text-white flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{title}</h3>
        <p className="text-sm text-gray-300 mb-3">{description}</p>
        {link && (
          <a
            href={link}
            className="inline-block mt-auto bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded"
          >
            View Offer
          </a>
        )}
      </div>
    </div>
  );
};

export default PromoCard;
