import { useOutletContext } from "react-router-dom"
import JobListItem from "./JobListItem";

function JobList() {
  const {jobs} = useOutletContext();  

  // Handle error response
  if (jobs.message) {
    return <p>{jobs.message}</p>
  }

  if (jobs.length === 0) {
    return <p>Loading Jobs...</p>
  }

  return (
    <div className="job-list">
      {jobs.map(job => (
        <JobListItem
          key={job.id}
          job={job}
        />
      ))}
    </div>
  )
}

export default JobList;