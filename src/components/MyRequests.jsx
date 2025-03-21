import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/myRequests.css";

const MyRequests = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://ticketfunctionrbac-apim.azure-api.net/ticketingsystemfc/ticketsystrigger", {
          params: { UserId: user?.UserId },
        });
        setTickets(response.data);
      } catch (err) {
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTickets();
  }, [user]);

  return (
    <div className="my-requests-container">
      <h2>My Requests</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && tickets.length === 0 && <p>No tickets found.</p>}
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.TicketId} className="ticket-item">
            <strong>ID:</strong> {ticket.TicketId} | <strong>Status:</strong> {ticket.Status}
            <p>{ticket.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRequests;
