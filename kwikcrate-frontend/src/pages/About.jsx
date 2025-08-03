import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const About = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/pages/about`);
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load About page:", err);
        setError("About Us content not available at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <div className="flex-grow bg-[#0f172a] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-6">About Us</h1>
        {loading ? (
          <p>Loading...</p>
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

export default About;
