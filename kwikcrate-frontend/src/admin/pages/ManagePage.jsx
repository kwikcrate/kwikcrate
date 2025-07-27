// src/admin/pages/ManagePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const ManagePage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE}/api/pages/${slug}`);
        setTitle(data.title);
        setContent(data.content);
        setMessage("Page loaded.");
      } catch (err) {
        console.warn(`Page not found for slug "${slug}", starting fresh.`);
        setTitle(slug
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "));
        setContent("");
        setMessage("No existing content, you can create a new one.");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const handleSave = async () => {
    if (!title || !slug || !content) {
      setMessage("❌ Title, slug, and content are required.");
      return;
    }

    setSaving(true);
    try {
      await axios.post(`${API_BASE}/api/pages`, {
        title,
        slug,
        content,
      });
      setMessage("✅ Page saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      setMessage("❌ Save failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Edit Page: {title}</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter page content in HTML..."
        className="w-full h-96 bg-gray-800 text-white p-4 rounded resize-none"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
    </div>
  );
};

export default ManagePage;
