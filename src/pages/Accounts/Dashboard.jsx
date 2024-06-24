// src/pages/Events/Events.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '@/auth/api'; // Adjust the path accordingly

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use the navigate hook

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/events/");
      const eventsData = response.data;
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {events.length > 0 ? (
        <div>
          <h2>Events:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {events.map(event => (
              <div 
                key={event.id} 
                onClick={() => handleCardClick(event.id)} 
                style={{ 
                  border: '1px solid #ccc', 
                  borderRadius: '8px', 
                  padding: '16px', 
                  margin: '8px', 
                  cursor: 'pointer', 
                  width: '200px' 
                }}
              >
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <img 
                  src={`http://127.0.0.1:8000${event.photo1}`} 
                  alt={event.title} 
                  width="200" 
                  onError={(e) => e.target.src = 'path/to/placeholder.jpg'} 
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No events available</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Events;
