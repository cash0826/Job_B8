

function EventToolTip( { event } ) {
  return (
    <div className="bg-white shadow-md rounded p-2 border border-gray-200">
      <p className="font-semibold">{event.event}</p>
      <p className="text-sm text-gray-600">
        {new Date(event.scheduled_time).toLocaleString()}
      </p>
      {event.notes && (
        <p className="text-sm mt-1 text-gray-700">e{event.notes}</p>
      )}
      <p className="text-xs text-gray-500 mt-1">
        Job: {event.job?.company || "Unknown"}
      </p>
    </div>
  )
}

export default EventToolTip;