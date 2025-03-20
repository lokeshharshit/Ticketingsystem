import React, { useState } from "react";
import axios from "axios";
import "../styles/addForm.css";

const AddForm = ({ category, onBack, user }) => {
  const [formData, setFormData] = useState({
    description: "",
    comments: "",
    attachments: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = "https://ticketfunctionrbac-apim.azure-api.net/ticketingsystemfc/ticketsystrigger";
  const sasToken = "sv=2024-11-04&ss=bfqt&srt=co&sp=rwdlacupiyx&se=2025-04-20T15:28:36Z&st=2025-03-19T07:28:36Z&spr=https,http&sig=G2q4%2BGr3XGUGKb%2Ba0FL9C5MhlEtlv8Z%2BOn2hrIJPVdA%3D";
  const blobStorageUrl = "https://ticketingsystemfctickets.blob.core.windows.net/ticketingsystemfccontainer";

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData({ ...formData, attachments: [...formData.attachments, ...newFiles] });
  };

  const handleRemoveAttachment = (index) => {
    const updatedFiles = [...formData.attachments];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, attachments: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.comments.trim() || !formData.description.trim()) {
      setMessage("Please fill in all mandatory fields.");
      setLoading(false);
      return;
    }

    let attachmentUrls = null; // Placeholder for file URLs
    if (formData.attachments.length > 0) {
      attachmentUrls = formData.attachments.map((file) => URL.createObjectURL(file)).join(";");
    }

    const ticketData = {
      UserId: user?.UserId,
      AdminId: 1,
      Description: formData.description,
      Status: "Open",
      Comments: formData.comments,
      Attachment: attachmentUrls,
    };

    try {
      const response = await axios.post(apiUrl, ticketData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status >= 200 && response.status < 300) {
        setMessage("Ticket submitted successfully!");
        setFormData({ description: "", comments: "", attachments: [] });
      }
    } catch (error) {
      setMessage("Failed to submit ticket. Please check API request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-form-container">
      <h3 className="form-title">{category ? `${category} Request Form` : "Request Form"}</h3>
      {message && <p className="message">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* Requestor Field */}
        <div className="form-group">
          <label className="form-label">Requestor *</label>
          <div className="requestor-container">
            <div className="requestor-icon">{user?.UserName?.charAt(0).toUpperCase()}</div>
            <div>
              <div className="requestor-text">{user?.UserName?.toUpperCase() || "N/A"} (WinWire)</div>
              <div className="requestor-info">WinWire Employee - Full Time</div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="form-group">
          <label className="form-label">Summary *</label>
          <input
            type="text"
            name="comments"
            className="form-control"
            placeholder="Enter summary"
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            required
          />
        </div>

        {/* Details */}
        <div className="form-group">
          <label className="form-label">Details *</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Enter detailed description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        {/* Attachments - Styled Like a Form Input */}
        <div className="form-group">
          <label className="form-label">Attachments</label>
          <div className="file-upload-box">
            <input type="file" multiple className="file-input" onChange={handleFileChange} />
          </div>
          {formData.attachments.length > 0 && (
            <ul className="selected-files">
              {formData.attachments.map((file, index) => (
                <li key={index} className="file-name">
                  {file.name}
                  <span className="remove-file" onClick={() => handleRemoveAttachment(index)}> ✖ </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" className="btn btn-secondary back-btn" onClick={onBack}>← Back</button>
          <button type="submit" className="btn btn-success submit-btn" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
