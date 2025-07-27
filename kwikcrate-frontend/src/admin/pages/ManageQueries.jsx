import React from "react";

const queries = [
  { id: 1, user: "PlayerOne", message: "Top-up not received", status: "Pending" },
  { id: 2, user: "GamerX", message: "Payment issue", status: "Resolved" },
];

const UserQueries = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">User Queries</h1>
      <div className="space-y-4">
        {queries.map((query) => (
          <div key={query.id} className="bg-zinc-800 p-4 rounded shadow">
            <p><strong>User:</strong> {query.user}</p>
            <p><strong>Message:</strong> {query.message}</p>
            <p><strong>Status:</strong> {query.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserQueries;
