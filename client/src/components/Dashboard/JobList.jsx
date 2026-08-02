import { useOutletContext } from "react-router-dom"
import JobListItem from "./JobListItem";

function JobList() {
  const { jobs, setJobs } = useOutletContext();

  // Empty-state
  if (!jobs || jobs.length === 0) {
    return (
      <div className="font-semibold text-center text-gray-600">
        No jobs yet. Add your first job above.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-5 
        gap-4 
        bg-gray-100 
        border-b border-gray-300 
        rounded-t-lg 
        p-3"
      >
        <h3 className="font-semibold text-gray-700 text-left">Role/Title (URL)</h3>
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
          />
        ))}
      </div>

    </div>

  )
}

export default JobList;