import { formatEventDate } from "../../utils/date";
import { getEventStatus } from "../../utils/eventDateStatus";
import { deleteEvent } from "../../services/EventService";
import EventBadge from "./EventBadge";

function EventListItem({ event, setEvents }) {
  const status = getEventStatus(event.scheduled_time);

  async function handleDelete() {
    try {
      await deleteEvent(event.id)
      setEvents(prev => prev.filter(e => e.id !==event.id))
    } catch (error) {
      console.error("Error deleting event: ", error)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 justify-center">
        <h3 className="text-lg font-bold text-gray-700">
          {event.event} | {event.job.company} | {event.job.title}
        </h3>

        <EventBadge status={status} />
      </div>

      <p className="text-base text-gray-700 font-bold mb-2">
        {formatEventDate(event.scheduled_time)}
      </p>

      {event.notes && (
        <p className="text-gray-700 text-sm">
          {event.notes}
        </p>
      )}
      <div className="flex items-center justify-end">

        <button className="text-sm font-bold text-gray-500 px-3
          hover:text-gray-800 underline cursor-pointer"
          onClick={handleDelete}
        >
        Delete
        </button>

      </div>
    </div>
  );
}

export default EventListItem;