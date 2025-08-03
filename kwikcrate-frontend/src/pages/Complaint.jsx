import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Complaint = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaintContent = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/pages/complaint`);
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load complaint page:", err);
        setError("This page is currently unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintContent();
  }, []);

  return (
    <div className="flex-grow bg-[#0f172a] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-6">Suggestion & Complaint</h1>
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

export default Complaint;
