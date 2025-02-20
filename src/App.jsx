import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100">
      {user && <Header user={user} onLogout={() => setUser(null)} />}

      <div className="container flex-grow-1 d-flex justify-content-center align-items-center main-content">
        {user ? <Dashboard /> : <Login onLogin={setUser} />}
      </div>

      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default App;
