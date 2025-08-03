import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTopUps = () => {
  const [topups, setTopups] = useState([]);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/topups/BGMI`)
      .then((res) => setTopups(res.data))
      .catch((err) => {
        console.error("Failed to fetch topups", err);
        setError("Could not load top-up data");
      });
  }, [API_BASE_URL]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage BGMI Top-Ups</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {topups.length === 0 ? (
        <p className="text-gray-500">No top-ups found.</p>
      ) : (
        <table className="w-full border text-white">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {topups.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">₹{item.price}</td>
                <td className="border p-2">
                  <img
                    src={item.image}
                    alt={item.name || "Top-up image"}
                    className="w-12 h-12 object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageTopUps;
