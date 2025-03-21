import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/usermanagement/Login";
import ForgotPassword from "./components/usermanagement/ForgotPassword";
import Dashboard from "./components/Dashboard";
import ServiceCategories from "./components/ServiceCategories";
import AddForm from "./components/AddForm";
import MyRequests from "./components/MyRequests";

const App = () => {
  const [user, setUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle user login
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
    setUser(userData);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    setUser(null);
  };

  return (
    <Router>
      <div>
        {/* Show Header only if the user is logged in */}
        {user && <Header user={user} onLogout={handleLogout} />}

        <main>
          <Routes>
            {/* Home/Login Route with Conditional Forgot Password Rendering */}
            {showForgotPassword ? (
              <Route
                path="/"
                element={<ForgotPassword setShowForgotPassword={setShowForgotPassword} />}
              />
            ) : (
              <Route
                path="/"
                element={user ? <Dashboard user={user} /> : <Login onLogin={handleLogin} setShowForgotPassword={setShowForgotPassword} />}
              />
            )}


            <Route path="/forgot-password" element={<ForgotPassword setShowForgotPassword={setShowForgotPassword} />} />

            {/* My Requests */}
            <Route path="/my-requests" element={user ? <MyRequests user={user} /> : <Navigate to="/" />} />

            {/* Service Categories */}
            <Route path="/service-categories" element={user ? <ServiceCategories /> : <Navigate to="/" />} />

            {/* AddForm */}
            <Route path="/add/:category" element={user ? <AddForm user={user} /> : <Navigate to="/" />} />
          </Routes>
        </main>

        {/* Show Footer only if the user is logged in */}
        {user && <Footer />}
      </div>
    </Router>
  );
};

export default App;
