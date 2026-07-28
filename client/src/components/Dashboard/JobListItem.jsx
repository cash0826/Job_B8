import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { updateJob, deleteJob } from "../../services/JobService";

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
  const [openStatus, setOpenStatus] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [updated, setUpdated] = useState(false);

  const statusRef = useRef(null);
  const menuRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setOpenStatus(false)
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)
  })

  async function handleStatusChange(newStatus) {
    try {
      const updatedJob = await updateJob(job.id, { status: newStatus });

      if (updatedJob) {
        setJobs(prev => prev.map(j => (j.id === job.id ? updatedJob : j)) );
      }
      
      setUpdated(true)
      setTimeout(() => setUpdated(false), 1500);
      setOpenStatus(false);
    } catch (err) {
      console.error("Error updating job status:", err);
    }
  };

  async function handleDelete(){
    try {
      await deleteJob(job.id)
      setJobs(prev => prev.filter(j => j.id !== job.id))
    } catch (err) {
      console.error("Error deleting job: ", err)
    }
  }

  const validTransitions = transitions[job.status] || [];

  return (
    <div className="relative group grid grid-cols-4 md:grid-cols-5 gap-4 border-b border-gray-200 hover:bg-gray-50">
      <span className="text-gray-800 text-left">{job.title}</span>
      <span className="text-gray-800 text-left">{job.company}</span>
      <span className="text-gray-800 text-left">{job.location}</span>
      <span className="hidden md:block text-gray-800 truncate text-left">{job.description}</span>

      {/* Status "Cell" */}
      <div ref={statusRef} className="relative text-left">
        <button
          onClick={() => setOpenStatus(!openStatus)}
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
        {openStatus && (
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

      {/* ... Menu */}
      <div ref={menuRef} className="absolute right-2">
        <button 
          onClick={() => setOpenMenu(!openMenu)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700"
        >
          ⋮
        </button>
        {openMenu && (
          <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded shadow-lg z-30">
            <button
              onClick={handleDelete}
              className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListItem;