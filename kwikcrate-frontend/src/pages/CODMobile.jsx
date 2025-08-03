import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import codTopUps from '../data/codTopUps';
import codBanner from "../assets/images/cod.png";

const CODMobile = () => {
  const [uid, setUid] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const navigate = useNavigate();

  const handleValidation = () => {
    if (uid.trim() === "") {
      alert("Please enter a valid COD Mobile UID.");
      return;
    }
    alert(`COD UID ${uid} validated successfully.`);
  };

  const handleCheckout = () => {
    if (!selectedPackage || !uid) {
      alert("Please enter UID and select a package.");
      return;
    }
    navigate("/checkout", {
      state: {
        game: "COD Mobile",
        uid,
        selectedPackage,
        paymentMethod,
      },
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${codBanner})` }}
    >
      <div className="max-w-3xl mx-auto bg-zinc-900 bg-opacity-90 text-white rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">COD Mobile Top-Up</h1>

        <div className="mb-6 text-sm text-gray-300">
          <p><strong>Where to find your COD Mobile UID?</strong></p>
          <p>Go to Profile → Player Profile → Your UID is displayed beneath your nickname.</p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter COD Mobile UID"
            className="w-full p-2 rounded bg-zinc-800 text-white border border-gray-600"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />
          <button
            onClick={handleValidation}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Validate Game ID
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {codTopUps.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded border cursor-pointer transition ${
                selectedPackage?.id === item.id
                  ? "border-green-500 bg-zinc-800"
                  : "border-gray-600 bg-zinc-800"
              }`}
              onClick={() => setSelectedPackage(item)}
            >
              <img src={item.image} alt={item.name} className="w-full h-24 object-contain mb-2" />
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">₹{item.price}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block mb-2">Select Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 bg-zinc-800 text-white border border-gray-600 rounded"
          >
            <option value="UPI">UPI</option>
            <option value="CrateCoins">CrateCoins</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            ← Back
          </button>

          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
            onClick={() => alert("Package added to cart!")}
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

        <div className="mt-6 text-xs text-gray-400">
          <p>💬 24/7 Chat Support • 🔒 Secure Payment • ✅ Official Store • ⚡ Instant Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default CODMobile;
