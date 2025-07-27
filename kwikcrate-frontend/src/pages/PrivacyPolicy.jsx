import React, { useEffect, useState } from "react";
import axios from "axios";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/pages/privacy-policy`
        );
        setContent(data.content);
      } catch (err) {
        console.error("Failed to load privacy policy:", err);
        setError("Privacy Policy not available at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Privacy Policy</h1>
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
  );
};

export default PrivacyPolicy;
