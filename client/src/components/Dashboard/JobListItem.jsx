import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { updateJob } from "../../services/JobService";

// Valid transitions
const transitions = {
  Saved: ["Applied"],
  Applied: ["Assessment", "Interviewing", "Not Selected"],
  Assessment: ["Interviewing", "Not Selected"],
  Interviewing: ["Assessment", "Job Offer", "Not Selected"],
  Job_Offer: [],
  Not_Selected: []
};

function JobListItem({ job }) {
  const { jobs, setJobs } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  const ref = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  async function handleStatusChange(newStatus) {
    try {
      const updatedJob = await updateJob(job.id, { status: newStatus });

      if (updatedJob) {
        setJobs(prev =>
          prev.map(j => (j.id === job.id ? updatedJob : j))
        );
      }
      
      setUpdated(true)
      setTimeout(() => setUpdated(false), 1500);
      setOpen(false);
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  };

  const validTransitions = transitions[job.status] || [];

  return (
    <div className="relative grid grid-cols-4 md:grid-cols-5 gap-4 border-b border-gray-200 hover:bg-gray-50">
      <span className="text-gray-800 text-left">{job.title}</span>
      <span className="text-gray-800 text-left">{job.company}</span>
      <span className="text-gray-800 text-left">{job.location}</span>
      <span className="hidden md:block text-gray-800 truncate text-left">{job.description}</span>

      {/* Status Cell */}
      <div ref={ref} className="relative text-left">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-800 underline cursor-pointer"
        >
          {job.status}
        </button>

        {/* Success indicator */}
        {updated && (
          <span className="ml-2 text-green-600 text-sm font-medium">
            Updated!
          </span>
        )}

        {/* Dropdown */}
        {open && (
          <div className="absolute left-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-lg z-20">
            {validTransitions.length === 0 && (
              <div className="px-2 py-2 text-gray-500 text-sm">
                No Next Steps
              </div>
            )}

            {validTransitions.map(status => (
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