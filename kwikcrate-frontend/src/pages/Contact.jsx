// src/pages/Contact.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/contact`, form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-400 hover:text-white hover:underline"
      >
        ← Go Back
      </button>

      <h1 className="text-3xl font-bold text-green-400 mb-4">Contact Us</h1>

      <p className="text-gray-300 mb-6">
        We'd love to hear from you! For questions, support, or feedback, use the contact form below or email us at <strong>support@kwikcrate.com</strong>.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white"
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Send Message
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
