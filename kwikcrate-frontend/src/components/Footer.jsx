import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaSmile,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-gray-300 bg-[#0e1522]">
      {/* Top Features Bar */}
      <div className="py-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-center gap-6 px-4">
          {[
            {
              icon: <FaShieldAlt className="text-2xl text-green-400" />,
              title: "Secure Shopping",
              desc: "Products from authorized providers at fair prices.",
            },
            {
              icon: <FaTruck className="text-2xl text-green-400" />,
              title: "Fast Delivery",
              desc: "24‑Hour Nonstop and Fast Delivery Service.",
            },
            {
              icon: <FaHeadset className="text-2xl text-green-400" />,
              title: "Live Support",
              desc: "24/7 Support Center.",
            },
            {
              icon: <FaSmile className="text-2xl text-green-400" />,
              title: "Customer Satisfaction",
              desc: "100% Satisfaction Guaranteed.",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3 w-full sm:w-auto">
              {item.icon}
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links Grid */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          {[
            {
              title: "Kwikcrate",
              links: [
                { to: "/products", label: "All Products" },
                { to: "/latest", label: "Last Added Products" },
                { to: "/best-sellers", label: "Best Sellers" },
              ],
            },
            {
              title: "User",
              links: [
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/returns", label: "Return Policy" },
                { to: "/help-center", label: "Help Center" },
                { to: "/complaint", label: "Suggestion & Complaint" },
                { to: "/faq", label: "FAQ" },
                { to: "/kyc", label: "KYC Policy" },
              ],
            },
            {
              title: "Pages",
              links: [
                { to: "/about", label: "About Us" },
                { to: "/blog", label: "Blog" },
                { to: "/career", label: "Career" },
                { to: "/partnership", label: "Partnership" },
                { to: "/contact", label: "Contact Us" },
                { to: "/admin-login", label: "Admin Login" },
              ],
            },
            {
              title: "Categories",
              links: [
                { to: "/games", label: "Mobile Games" },
                { to: "/top-up", label: "Top‑Up" },
                { to: "/gift-cards", label: "Gift Cards" },
                { to: "/game-keys", label: "Game Keys" },
              ],
            },
            {
              title: "Support & Contact",
              custom: (
                <p className="text-sm">
                  📧{" "}
                  <a href="mailto:support@kwikcrate.com" className="hover:text-white">
                    support@kwikcrate.com
                  </a>
                </p>
              ),
            },
            {
              title: "Social Media",
              custom: (
                <div className="flex space-x-4 text-lg">
                  <a href="#" className="hover:text-white"><FaFacebookF /></a>
                  <a href="#" className="hover:text-white"><FaInstagram /></a>
                  <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
                </div>
              ),
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold mb-4">{col.title}</h4>
              {col.links ? (
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <Link to={link.to} className="hover:text-white">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                col.custom
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-[#111827] py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h5 className="text-white font-semibold mb-4">Subscribe Now</h5>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="E‑Mail Address"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 px-4 border-t border-gray-700 text-center text-sm text-gray-500">
        © 2025 Kwikcrate. All rights reserved.
      </div>
    </footer>
  );
}
