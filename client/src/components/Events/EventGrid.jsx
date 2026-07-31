import EventListItem from "./EventListItem";
import AddEventForm from "./AddEventForm";
import { formatEventDate } from "../../utils/date";

function groupEventsByMonth(events) {
  const groups = {};

  events.forEach(event => {
    const date = new Date(event.scheduled_time);
    const monthKey = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(event);
  });
  return groups;
}

function EventGrid({ events, setEvents, ...props }) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.scheduled_time) - new Date(b.scheduled_time)
  );

  // Group by month
  const grouped = groupEventsByMonth(sortedEvents);

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([month, monthEvents]) => (
        <section key={month}>
          {/* Month Header */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {month}
          </h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
            {monthEvents.map(event => (
              <div
                key={event.id}
                className="bg-white shadow-sm rounded-lg p-4 border hover:shadow-md transition"
              >
                <EventListItem event={event} />
              </div>
            ))}
          </div>
          {/* Event Form */}
          <div>
            <div className="bg-white shadow-sm rounded-lg flex justify-center">
              <AddEventForm events={events} setEvents={setEvents}/>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default EventGrid;
