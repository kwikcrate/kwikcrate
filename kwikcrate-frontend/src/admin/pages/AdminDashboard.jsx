import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGames: 0,
    totalTopups: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/stats"); // Adjust URL if needed
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-6 text-gray-300">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-green-400">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded p-4 shadow">
          <h3 className="text-lg text-gray-400">Total Users</h3>
          <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
        </div>

        <div className="bg-gray-800 rounded p-4 shadow">
          <h3 className="text-lg text-gray-400">Total Games</h3>
          <p className="text-3xl font-bold text-white">{stats.totalGames}</p>
        </div>

        <div className="bg-gray-800 rounded p-4 shadow">
          <h3 className="text-lg text-gray-400">Total Top-ups</h3>
          <p className="text-3xl font-bold text-white">{stats.totalTopups}</p>
        </div>
      </div>
    </div>
  );
}
