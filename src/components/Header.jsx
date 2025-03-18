import React, { useState } from "react";
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header>
      <h6>WinWire</h6>

      <nav className="nav-container">
        <ul className="nav-list">
          {user ? (
            <>
              <li 
                className="nav-item profile-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="profile-icon">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {isHovered && <span className="hover-username">{user.username}</span>}
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
