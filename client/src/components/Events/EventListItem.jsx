import { formatEventDate } from "../../utils/date";
import { getEventStatus } from "../../utils/eventDateStatus";
import EventBadge from "./EventBadge";

function EventListItem({ event }) {
  const status = getEventStatus(event.scheduled_time);

  return (
    <div>
      <div className="flex items-center justify-around mb-1">
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
    </div>
  );
}

export default EventListItem;