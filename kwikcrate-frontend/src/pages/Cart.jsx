// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between bg-gray-100 p-4 rounded">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-green-600 font-bold">₹{item.price * item.quantity}</p>
                <button onClick={() => handleRemove(index)} className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right text-lg font-semibold mt-4">Total: ₹{totalPrice}</div>
        </div>
      )}
    </div>
  );
};

export default Cart;
