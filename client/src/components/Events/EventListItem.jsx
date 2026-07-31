

function EventListItem( { event } ) {

  return (
    <div>
      <p>
        {event.event} | {event.scheduled_time} | {event.notes} | {event.job.title}
      </p>
    </div>
  )
}

export default EventListItem;