import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required");
      return;
    }

    try {
      const apiUrl = "https://ticketingsystemfc.azurewebsites.net/api/httptriggers?code=UV31N1uFcYsbPgouZlJSfd3xDpgZNVw8nUH3j9-1wm8AAzFus1tvrg%3D%3D";

      const response = await axios.post(apiUrl, {
        UserName: username,
        PasswordHash: password, // Send password as plaintext (hashing should be handled in the backend)
        Login: true,
      });

      if (response.status === 200) {
        onLogin(response.data); // Successful login
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
