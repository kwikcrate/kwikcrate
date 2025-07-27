import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgmiBanner from "../assets/images/bgmi.png";
import { bgmiTopUps } from "../data/bgmiTopUps";

const BGMI = () => {
  const [uid, setUid] = useState("");
  const [selected, setSelected] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const navigate = useNavigate();

  const handleValidate = () => {
    if (uid.length < 6) {
      alert("Please enter a valid UID.");
    } else {
      alert("UID validated successfully!");
    }
  };

  const handleCheckout = () => {
    if (!uid || !selected) {
      alert("Please enter UID and select a package.");
      return;
    }

    navigate("/checkout", {
      state: {
        game: "BGMI",
        uid,
        selected,
        paymentMethod,
      },
    });
  };

  const handleAddToCart = () => {
    alert("Package added to cart!");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgmiBanner})` }}
    >
      <div className="max-w-3xl mx-auto bg-zinc-900 bg-opacity-90 text-white rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">BGMI Top-Up</h1>

        {/* UID Instructions */}
        <div className="mb-6 text-sm text-gray-300">
          <p><strong>Where to find your BGMI UID?</strong></p>
          <p>Open BGMI → Tap your Profile → Copy your ID.</p>
        </div>

        {/* UID Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter BGMI UID"
            className="w-full p-2 rounded bg-zinc-800 text-white border border-gray-600"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
          <button
            onClick={handleValidate}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Validate Game ID
          </button>
        </div>

        {/* Top-Up Options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select a Package</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bgmiTopUps.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className={`cursor-pointer p-4 rounded-lg text-center border transition-all ${
                  selected?.id === item.id
                    ? "bg-green-700 border-green-500"
                    : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 object-contain mb-2"
                />
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block mb-2">Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white border border-gray-600 rounded"
          >
            <option value="upi">UPI</option>
            <option value="cratecoins">CrateCoins</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
          >
            Add to Cart
          </button>

          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Assurance Info */}
        <div className="mt-6 text-xs text-gray-400 text-center">
          💬 24/7 Chat Support • 🔒 Secure Payment • ✅ Official Store • ⚡ Instant Delivery
        </div>
      </div>
    </div>
  );
};

export default BGMI;
