import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/usermanagement/Login";
import ForgotPassword from "./components/usermanagement/ForgotPassword";
import Dashboard from "./components/Dashboard";
import ServiceCategories from "./components/ServiceCategories";
import AddForm from "./components/AddForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Router>
      <div>
        {/* Show Header only if the user is logged in */}
        {user && <Header user={user} onLogout={() => setUser(null)} />}

        <main>
          <Routes>
            {/* Show Forgot Password Page */}
            {showForgotPassword ? (
              <Route
                path="/"
                element={<ForgotPassword setShowForgotPassword={setShowForgotPassword} />}
              />
            ) : (
              <Route
                path="/"
                element={user ? <Dashboard user={user} /> : <Login onLogin={setUser} setShowForgotPassword={setShowForgotPassword} />}
              />
            )}

            {/* Service Categories Route */}
            <Route
              path="/service-categories"
              element={user ? <ServiceCategories /> : <Navigate to="/" />}
            />

            {/* AddForm with category and user */}
            <Route
              path="/add/:category"
              element={user ? <AddForm user={user} /> : <Navigate to="/" />}
            />
          </Routes>
        </main>

        {/* Show Footer only if the user is logged in */}
        {user && <Footer />}
      </div>
    </Router>
  );
};

export default App;
