

function ListItem( { job } ) {

  return (
    <div>
      <p>
        {job.title}
        {job.company}
        {job.location}
        {job.url}
        {job.status}
        {job.description}
      </p>
    </div>
  )
}

export default ListItem;