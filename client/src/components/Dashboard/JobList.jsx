import { useOutletContext } from "react-router-dom"
import JobListItem from "./JobListItem";

function JobList() {
  const { jobs, setJobs } = useOutletContext();

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const updated = await updateJobStatus(jobId, newStatus);

      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  }; 

  // Handle error response
  if (jobs.message) {
    return <p>{jobs.message}</p>
  }

  if (jobs.length === 0) {
    return <p>Loading Jobs...</p>
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <JobListItem
          key={job.id}
          job={job}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  )
}

export default JobList;