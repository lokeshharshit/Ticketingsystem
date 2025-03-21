import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/login.css";

const Login = ({ onLogin, setShowForgotPassword }) => {
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
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required");
      return;
    }

    try {
      const apiUrl =
        "https://ticketfunctionrbac-apim.azure-api.net/ticketingsystemfc/HttpTriggers";

      const response = await axios.post(apiUrl, {
        UserName: username,
        PasswordHash: password,
        Login: true,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Save user in localStorage
        onLogin(response.data);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid password");
        } else if (err.response.status === 404) {
          setError("User not found");
        } else {
          setError("Server error. Please try again.");
        }
      } else {
        setError("Error connecting to the server");
      }
    }
  };

  return (
    <main>
      <div className="login-container">
        <h3>
          <b>Login</b>
        </h3>
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
            {/* Forgot Password Link */}
            <a
              href="#"
              className="forgot-password"
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </a>
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
