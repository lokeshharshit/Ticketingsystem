import React, { useState } from "react";

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <h3 className="forgot-password-title">Forgot Password</h3>
      <form onSubmit={handleReset} className="forgot-password-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-button">
          Send Reset Link
        </button>
      </form>
      <div className="back-to-login">
        <button
          type="button"
          className="forgot-password-button"
          onClick={() => setShowForgotPassword(false)}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
