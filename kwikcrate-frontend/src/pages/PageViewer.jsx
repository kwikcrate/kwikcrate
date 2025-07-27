// src/pages/PageViewer.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const PageViewer = ({ slug }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE}/api/pages/${slug}`);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load page:", err);
        setError("Page not available at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return (
    <div className="flex-grow bg-[#0f172a] text-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-green-400 mb-6">{title}</h1>
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PageViewer;
