import React from "react";

const users = [
  { id: 1, name: "PlayerOne", email: "player1@example.com", status: "Active" },
  { id: 2, name: "GamerX", email: "gamerx@example.com", status: "Banned" },
];

const ManageUsers = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <table className="w-full text-left bg-zinc-800 rounded shadow">
        <thead>
          <tr>
            <th className="p-3 border-b border-gray-700">Name</th>
            <th className="p-3 border-b border-gray-700">Email</th>
            <th className="p-3 border-b border-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
