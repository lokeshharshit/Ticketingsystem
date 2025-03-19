import React, { useState } from "react";
import "../styles/addForm.css";

const AddForm = ({ category, onBack, user }) => {
  const [formData, setFormData] = useState({
    requestorName: user?.username || "",
    summary: "",
    details: "",
    attachments: null,
    priority: "Low",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="add-form-container">
      {/* <h2 className="form-title">Account Unlock / Password Reset</h2> */}
      <h3 className="form-title">
        {category ? `${category} Request Form` : "Request Form"}
      </h3>
      <p className="form-subtitle">
        Click here to request account unlocks or password resets.
      </p>
      <p className="mandatory-notice">* denotes a mandatory field</p>

      <form onSubmit={handleSubmit}>
       {/* Requestor Name with Profile */}
<div className="form-group">
  <label className="form-label">Requestor *</label>
        <div className="requestor-container">
            {/* Profile Icon with User's Initial */}
            <div className="requestor-icon">
            {user?.username?.charAt(0).toUpperCase()}
            </div>

            {/* User Information */}
            <div>
                <div className="requestor-text">
                    {user?.username?.toUpperCase() || "N/A"} (WinWire)
                </div>
                <div className="requestor-info">
                    WinWire Employee - Full Time
                </div>
                </div>
            </div>
        </div>

        {/* Summary */}
        <div className="form-group">
          <label className="form-label">Summary *</label>
          <input
            type="text"
            name="summary"
            className="form-control"
            placeholder="Enter summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>

        {/* Details */}
        <div className="form-group">
          <label className="form-label">Details *</label>
          <textarea
            name="details"
            className="form-control"
            rows="4"
            placeholder="Enter detailed description..."
            value={formData.details}
            onChange={handleChange}
          />
        </div>

        {/* Attachments */}
        <div className="form-group">
          <label className="form-label">Attachments</label>
          <input
            type="file"
            name="attachments"
            className="form-control file-input"
            onChange={handleChange}
          />
        </div>

        {/* Priority Type */}
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        {/* Buttons: Submit & Back */}
        <div className="form-buttons">
          <button
            type="button"
            className="btn btn-secondary back-btn"
            onClick={onBack}
          >
            ← Back
          </button>
          <button type="submit" className="btn btn-success submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
