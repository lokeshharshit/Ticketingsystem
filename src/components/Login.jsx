import React, { useState, useEffect } from "react";
import "../styles/login.css"; // Import the custom CSS file

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/users.json");
      const users = await response.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Error loading user data");
    }
  };

  return (
    <main>
      <div className="login-container">
        <h3><b>Login</b></h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
