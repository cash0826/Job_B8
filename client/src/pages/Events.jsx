import { useState, useEffect } from 'react';
import { loadEvents } from "../services/EventService";
import EventGrid from "../components/Events/EventGrid";
import AddEventForm from "../components/Events/AddEventForm";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents()
      .then(data => {
        setEvents(data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error retrieving events:", error);
        setError("Unable to load events.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Events...</p>;
  if (error) return <p> {error} </p>;
  if (events.message) return <p> {events.message} </p>;

  return (
    <>
      <EventGrid events={events} setEvents={setEvents}/>
      <div>
        <div className="bg-white shadow-sm rounded-lg flex justify-center">
          <AddEventForm events={events} setEvents={setEvents}/>
        </div>
      </div>
    </>
  );
}

export default Events;
