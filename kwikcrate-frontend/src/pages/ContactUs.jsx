import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto">
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

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full p-2 rounded bg-zinc-800 border border-gray-700 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
