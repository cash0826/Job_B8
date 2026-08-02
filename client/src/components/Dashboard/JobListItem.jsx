import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { updateJob, deleteJob } from "../../services/JobService";
import { transitions } from "./transitions.js"

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
    console.log("Sending status:", newStatus)
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
    <div className="relative group grid grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-5 
      gap-4 p-3
      border-b border-gray-200 
      hover:bg-gray-50"
      >
      <span className="text-gray-800 text-left wrap-break-words underline"><a href={job.url}>{job.title}</a></span>
      <span className="text-gray-800 text-left wrap-break-words">{job.company}</span>
      <span className="text-gray-800 text-left wrap-break-words">{job.location}</span>
      <span className="hidden md:block text-gray-800 text-left truncate">{job.description}</span>

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