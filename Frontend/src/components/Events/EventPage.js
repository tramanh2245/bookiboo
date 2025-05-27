import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventPage.css";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/bookiboo/Backend/api.php?resource=event&action=getAll")
      .then(res => res.json())
      .then(data => setEvents(data || []));
  }, []);

  return (
    <div className="event-list-container">
      <h2>All Events</h2>
      <div className="event-list-grid">
        {events.map(event => (
          <Link to={`/event/${event.id}`} className="event-card" key={event.id}>
            <div className="event-card-date">
              {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
            </div>
            <img src={event.image_url} alt={event.title} className="event-card-img" />
            <div className="event-card-title">{event.title}</div>
            <div className="event-card-meta">{event.location}</div>
            {/* Optional: Hiện avatar speaker */}
            {event.speaker_avatar && (
              <img src={event.speaker_avatar} alt={event.speaker_name} className="event-card-avatar" />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
