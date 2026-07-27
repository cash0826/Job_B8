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
    <div>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 bg-gray-100 border-b border-gray-300 rounded-t-lg">
        <h3 className="font-semibold text-gray-700 text-left">Role/Title</h3>
        <h3 className="font-semibold text-gray-700 text-left">Company</h3>
        <h3 className="font-semibold text-gray-700 text-left">Location</h3>
        <h3 className="hidden md:block font-semibold text-gray-700 text-left">Description</h3>
        <h3 className="font-semibold text-gray-700 text-left">Status</h3>
      </div>

      <div className="">
        {jobs.map(job => (
          <JobListItem
            key={job.id}
            job={job}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

    </div>

  )
}

export default JobList;