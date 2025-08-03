import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { game, uid, selectedTopUp } = location.state || {};

  if (!game || !uid || !selectedTopUp) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Invalid checkout session. Please select a top-up again.
      </div>
    );
  }

  const handleConfirm = () => {
    alert(`Recharge successful for ${game} UID: ${uid}`);
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="bg-white rounded shadow p-6 w-full max-w-md">
        <p><strong>Game:</strong> {game}</p>
        <p><strong>UID:</strong> {uid}</p>
        <p><strong>Top-Up:</strong> {selectedTopUp.title}</p>
        <p><strong>Price:</strong> ₹{selectedTopUp.price}</p>

        <img
          src={selectedTopUp.image}
          alt={selectedTopUp.title}
          className="h-24 object-contain mt-4 mx-auto"
        />

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
