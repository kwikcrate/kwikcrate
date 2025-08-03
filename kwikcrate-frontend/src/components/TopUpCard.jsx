import React from "react";

const TopUpCard = ({ data, selected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border rounded-xl p-4 text-center bg-white hover:shadow-lg transition duration-300 ${
        selected ? "border-blue-600 ring-2 ring-blue-500" : "border-gray-200"
      }`}
    >
      <img
        src={data.image}
        alt={data.title}
        className="h-20 mx-auto object-contain mb-2"
      />
      <h4 className="font-semibold text-lg">{data.title}</h4>
      <p className="text-green-600 font-bold mt-1">₹{data.price}</p>
    </div>
  );
};

export default TopUpCard;
