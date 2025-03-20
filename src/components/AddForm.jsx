import React, { useState } from "react";
import axios from "axios";
import "../styles/addForm.css";

const AddForm = ({ category, onBack, user }) => {
  const [formData, setFormData] = useState({
    description: "",
    comments: "",
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = "https://ticketfunctionrbac-apim.azure-api.net/ticketingsystemfc/ticketsystrigger";
  const sasToken = "sv=2024-11-04&ss=bfqt&srt=co&sp=rwdlacupiyx&se=2025-04-20T15:28:36Z&st=2025-03-19T07:28:36Z&spr=https,http&sig=G2q4%2BGr3XGUGKb%2Ba0FL9C5MhlEtlv8Z%2BOn2hrIJPVdA%3D";
  const blobStorageUrl = "https://ticketingsystemfctickets.blob.core.windows.net/ticketingsystemfccontainer";

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, attachment: files[0] });
    }
  };

  const handleRemoveAttachment = () => {
    setFormData({ ...formData, attachment: null });
    document.getElementById("fileInput").value = "";
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;

    const blobName = `${Date.now()}-${file.name}`;
    const uploadUrl = `${blobStorageUrl}/${blobName}?${sasToken}`;

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
      });

      if (response.status === 201) {
        return `${blobStorageUrl}/${blobName}?${sasToken}`;
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Blob Upload Error:", error);
      return null;
    }
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

    let attachmentUrl = null;
    if (formData.attachment) {
      attachmentUrl = await handleFileUpload(formData.attachment);
    }

    const ticketData = {
      UserId: user?.UserId,
      AdminId: 1,
      Description: formData.description,
      Status: "Open",
      Comments: formData.comments,
      Attachment: attachmentUrl,
    };

    try {
      const response = await axios.post(apiUrl, ticketData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status >= 200 && response.status < 300) {
        setMessage("Ticket submitted successfully!");
        setFormData({ description: "", comments: "", attachment: null });
      }
    } catch (error) {
      setMessage("Failed to submit ticket. Please check API request.");
      console.error("API Error:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-form-container">
      <h3 className="form-title">
        {category ? `${category} Request Form` : "Request Form"}
      </h3>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Requestor *</label>
          <input type="text" value={user?.UserName || "N/A"} disabled className="form-control" />
        </div>

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

        <div className="form-group">
          <label className="form-label">Attachments</label>
          <div className="file-input-container">
            <input
              type="file"
              id="fileInput"
              name="attachment"
              className="form-control file-input"
              onChange={handleFileChange}
            />
            {formData.attachment && (
              <span className="remove-file" onClick={handleRemoveAttachment}>❌</span>
            )}
          </div>
        </div>

        <div className="form-buttons">
          <button type="button" className="btn btn-secondary back-btn" onClick={onBack}>← Back</button>
          <button type="submit" className="btn btn-success submit-btn" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
