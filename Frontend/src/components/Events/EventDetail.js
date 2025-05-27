import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetail.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/bookiboo/Backend/api.php?resource=event&action=getDetail&id=${id}`)
      .then(res => res.json())
      .then(data => setEvent(data));
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-detail-container">
      <div className="event-detail-header">
        <img src={event.image_url} alt={event.title} className="event-detail-img" />
        <div className="event-detail-date">
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
        </div>
        <h1 className="event-detail-title">{event.title}</h1>
        <div className="event-detail-meta">{event.location}</div>
      </div>
      <div className="event-detail-description">{event.description}</div>
      <div className="event-detail-speaker">
        {event.speaker_avatar && (
          <img src={event.speaker_avatar} alt={event.speaker_name} className="event-speaker-avatar" />
        )}
        <div>
          <div className="event-speaker-name">{event.speaker_name}</div>
          <div className="event-speaker-role">{event.author}</div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
