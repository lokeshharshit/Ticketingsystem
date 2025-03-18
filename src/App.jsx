import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ServiceCategories from "./components/ServiceCategories";
import AddForm from "./components/AddForm";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        {/* Show Header only if the user is logged in */}
        {user && <Header user={user} onLogout={() => setUser(null)} />}

        <main>
          <Routes>
            {/* Show Dashboard if logged in, otherwise redirect to Login */}
            <Route
              path="/"
              element={user ? <Dashboard user={user} /> : <Login onLogin={setUser} />}
            />
            
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
