import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const HelpCenter = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHelpCenterContent = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/pages/help-center`);
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load Help Center content:", err);
        setError("Help Center content is not available at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchHelpCenterContent();
  }, []);

  return (
    <div className="flex-grow bg-[#0f172a] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-6">Help Center</h1>
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

export default HelpCenter;
