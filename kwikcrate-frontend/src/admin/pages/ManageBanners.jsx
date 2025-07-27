import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchBanners = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/home/banners`);
      setBanners(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setMessage("❌ Failed to fetch banners.");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleUpload = async () => {
    if (!videoFile) {
      setMessage("❌ Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);

    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/home/banners`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Banner uploaded successfully.");
      setVideoFile(null);
      fetchBanners();
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Failed to upload banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${API_BASE}/api/home/banners/${id}`);
      setMessage("✅ Banner deleted.");
      fetchBanners();
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage("❌ Failed to delete banner.");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Manage Banners</h2>

      {/* Upload Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Upload New Banner</h3>
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setVideoFile(e.target.files[0])}
          className="mb-2 text-sm"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Existing Banners */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Existing Banners</h3>
        {banners.length === 0 ? (
          <p className="text-gray-400">No banners found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {banners.map((banner) => (
              <div key={banner._id} className="bg-gray-800 rounded shadow p-2">
                <video
                  src={banner.videoUrl}
                  controls
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <button
                  onClick={() => handleDelete(banner._id)}
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

export default ManageBanners;
