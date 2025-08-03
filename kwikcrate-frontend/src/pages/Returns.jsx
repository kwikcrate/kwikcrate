import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Returns = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReturnsPolicy = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/pages/return-policy`);
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load return policy:", err);
        setError("Return Policy is not available at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchReturnsPolicy();
  }, []);

  return (
    <div className="flex-grow bg-[#0f172a] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-6">Return Policy</h1>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
};

export default Returns;
