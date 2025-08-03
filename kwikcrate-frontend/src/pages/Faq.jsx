import React, { useEffect, useState } from "react";
import axios from "axios";

const Faq = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaqContent = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/pages/faq`
        );
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load FAQ page:", err);
        setError("This page is currently unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqContent();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Frequently Asked Questions</h1>
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
  );
};

export default Faq;
