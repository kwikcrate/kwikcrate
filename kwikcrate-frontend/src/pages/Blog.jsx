import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch blog posts.");
    }
  };

  const handleCreate = async () => {
    if (!title || !content) return setError("Title and content are required.");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`, { title, content });
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      setError("Failed to create blog post.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      setError("Failed to delete blog post.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 text-gray-100">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Blog</h1>

      {/* New Blog Form */}
      <div className="mb-6">
        <input
          className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white rounded"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 text-white rounded"
          rows="4"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
        >
          Create Blog
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold text-green-300">{blog.title}</h2>
            <p className="mt-2">{blog.content}</p>
            <button
              onClick={() => handleDelete(blog._id)}
              className="mt-3 text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
