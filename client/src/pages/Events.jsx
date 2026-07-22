import { useState, useEffect } from 'react';
import { loadEvents } from "../services/EventService";
import EventListItem from "../components/EventListItem";

function Events() {
  const [events, setEvents] = useState([])

  useEffect( () => {
    loadEvents()
      .then( (data) => setEvents(existing => data) )
      .catch( (error) => console.log("Error retrieving events: ", error))
  }, []);

  if (events.message) {
    return <p>{events.message}</p>
  }

  if (events.length === 0) {
    return <p>Loading Events...</p>
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <EventListItem
          key={event.id}
          event={event}
        />
      ))}
    </div>
  )
}

export default Events;