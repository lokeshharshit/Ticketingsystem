import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dashboard.css"; // Ensure correct path

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search..." 
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card option-card">
            <div className="card-body text-center">
              <h5 className="card-title">Make a Request</h5>
              <p className="card-text">Submit a request for services or assistance.</p>
              <button className="btn btn-primary">+</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card option-card">
            <div className="card-body text-center">
              <h5 className="card-title">Report an Incident</h5>
              <p className="card-text">Log an issue that needs immediate attention.</p>
              <button className="btn btn-warning">+</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card option-card">
            <div className="card-body text-center">
              <h5 className="card-title">Report a Security Issue</h5>
              <p className="card-text">Notify us about any security vulnerabilities.</p>
              <button className="btn btn-danger">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
