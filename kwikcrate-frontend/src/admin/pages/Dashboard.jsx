import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGames: 0,
    totalTopups: 0,
    totalQueries: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="bg-zinc-800 p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">Games</h2>
          <p>{stats.totalGames}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">Users</h2>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">Queries</h2>
          <p>{stats.totalQueries ?? 0}</p> {/* In case you add queries later */}
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p>{stats.totalTopups}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
