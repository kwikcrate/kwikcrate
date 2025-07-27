import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/home/categories`);
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setMessage("❌ Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
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
      await axios.post(`${API_BASE}/api/home/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Category added successfully.");
      setTitle("");
      setImageFile(null);
      fetchCategories();
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`${API_BASE}/api/home/categories/${id}`);
      setMessage("✅ Category deleted.");
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("❌ Failed to delete category.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Upload Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Category Title"
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
          {loading ? "Uploading..." : "Add Category"}
        </button>
      </div>

      {/* List of Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Categories</h3>
        {categories.length === 0 ? (
          <p className="text-gray-400">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div key={cat._id} className="bg-gray-800 rounded p-4">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-lg font-semibold mb-2">{cat.title}</h4>
                <button
                  onClick={() => handleDelete(cat._id)}
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

export default ManageCategories;
