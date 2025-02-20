import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/header.css'

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
      <div className="container-fluid">
        <Link className="navbar-brand" to={user ? "/dashboard" : "/login"}>
          Win Wire
        </Link>

        <button 
          className="navbar-toggler" 
          type="button"
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">{user.username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={() => { onLogout(); navigate("/login"); }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
