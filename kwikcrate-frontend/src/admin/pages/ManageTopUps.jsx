import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTopUps = () => {
  const [topups, setTopups] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/topups/BGMI")
      .then((res) => setTopups(res.data))
      .catch((err) => console.error("Failed to fetch topups", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage BGMI Top-Ups</h2>
      {topups.length === 0 ? (
        <p>No top-ups found.</p>
      ) : (
        <table className="w-full border">
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
                  <img src={item.image} alt={item.name} className="w-12 h-12" />
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
