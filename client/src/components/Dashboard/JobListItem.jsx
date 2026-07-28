import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { jobStatus } from "./jobStatus.js"
import { updateJob } from "../../services/JobService";

function JobListItem({ job }) {
  const { jobs, setJobs } = useOutletContext();
  const [open, setOpen] = useState(false)

  async function handleStatusChange(newStatus) {
    try {
      const updatedJob = await updateJob(job.id, { status: newStatus });

      if (updatedJob) {
        setJobs(prev =>
          prev.map(j => (j.id === job.id ? updatedJob : j))
        );
      }

      setOpen(false);
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  };

  return (
    <div className="relative grid grid-cols-4 md:grid-cols-5 gap-4 border-b border-gray-200 hover:bg-gray-50">
      <span className="text-gray-800 text-left">{job.title}</span>
      <span className="text-gray-800 text-left">{job.company}</span>
      <span className="text-gray-800 text-left">{job.location}</span>
      <span className="hidden md:block text-gray-800 truncate text-left">{job.description}</span>

      {/* Status Cell */}
      <div className="text-left relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-800 underline cursor-pointer"
        >
          {job.status}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-20">
            {jobStatus.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListItem;