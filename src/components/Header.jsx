import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ user, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header>
      <h6>WinWire</h6>

      <nav className="nav-container">
        <ul className="nav-list">
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/my-requests">My Requests</Link>
              </li>
              <li
                className="nav-item profile-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="profile-icon">
                  {user.UserName.charAt(0).toUpperCase()}
                </div>
                {isHovered && <span className="hover-username">{user.UserName}</span>}
              </li>
              <li className="nav-item">
                <button className="logout-button" onClick={onLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
