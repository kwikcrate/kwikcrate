import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * Protects admin routes by checking for a valid admin token in localStorage.
 */
const AdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // Basic token check (you can enhance this with real validation)
    if (token && token.length > 10) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-20 text-white text-lg">
        Checking admin access...
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/admin-login" replace />;
};

export default AdminRoute;
