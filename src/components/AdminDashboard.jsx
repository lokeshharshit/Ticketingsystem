import React, { useEffect } from "react";

const AdminDashboard = () => {
  useEffect(() => {
    console.log("✅ AdminDashboard Loaded!");
  }, []);

  return (
    <div style={{ backgroundColor: "white", color: "black", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "black" }}>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
};

export default AdminDashboard;
