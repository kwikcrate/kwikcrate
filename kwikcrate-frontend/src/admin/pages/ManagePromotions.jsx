import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const ManagePromotions = () => {
  const [promos, setPromos] = useState([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPromotions = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/home/promotions`);
      setPromos(data);
    } catch (err) {
      console.error("Failed to fetch promotions:", err);
      setMessage("❌ Failed to fetch promotions.");
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleUpload = async () => {
    if (!title || !imageFile) {
      setMessage("❌ Title and image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile);

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/home/promotions`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Promotion added successfully.");
      setTitle("");
      setImageFile(null);
      fetchPromotions();
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Failed to add promotion.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this promotion?")) return;

    try {
      await axios.delete(`${API_BASE}/api/home/promotions/${id}`);
      setMessage("✅ Promotion deleted.");
      fetchPromotions();
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("❌ Failed to delete promotion.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Manage Promotions</h2>

      {/* Upload Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Add New Promotion</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Promotion Title"
          className="w-full mb-2 p-2 rounded bg-gray-700 border border-gray-600"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-2 text-sm"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Promotion"}
        </button>
      </div>

      {/* Existing Promotions */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Current Promotions</h3>
        {promos.length === 0 ? (
          <p className="text-gray-400">No promotions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {promos.map((promo) => (
              <div key={promo._id} className="bg-gray-800 rounded p-4">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-semibold mb-2">{promo.title}</h4>
                <button
                  onClick={() => handleDelete(promo._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message */}
      {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
    </div>
  );
};

export default ManagePromotions;
