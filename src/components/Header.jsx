import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/header.css'

const Header = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Win Wire</a>

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
                  <button className="btn btn-danger ms-2" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
