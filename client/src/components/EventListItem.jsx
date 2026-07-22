

function EventListItem( { event } ) {

  return (
    <div>
      <p>
        {event.event},
        {event.scheduled_time},
        {event.notes}
      </p>
    </div>
  )
}

export default EventListItem;