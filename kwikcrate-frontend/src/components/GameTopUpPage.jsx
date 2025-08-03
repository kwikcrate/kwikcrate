import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopUpCard from "./TopUpCard";

const GameTopUpPage = ({ title, banner, gameName, topUps, onBack }) => {
  const [uid, setUid] = useState("");
  const [selectedTopUp, setSelectedTopUp] = useState(null);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!uid || !selectedTopUp) {
      alert("Please enter UID and select a top-up.");
      return;
    }
    navigate("/checkout", {
      state: { uid, topUp: selectedTopUp, gameName },
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-white text-lg font-semibold hover:underline bg-black bg-opacity-60 px-4 py-1 rounded"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-xl mx-auto bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Game UID</span>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your UID"
            required
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {topUps?.map((topUp) => (
            <TopUpCard
              key={topUp.id}
              data={topUp}
              selected={selectedTopUp?.id === topUp.id}
              onSelect={() => setSelectedTopUp(topUp)}
            />
          ))}
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default GameTopUpPage;
