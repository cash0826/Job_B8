import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import { addJob } from "../../services/JobService";
import { PlusIcon, BriefcaseIcon } from "@heroicons/react/24/solid";

function AddJobForm() {
  const { jobs, setJobs } = useOutletContext();
  const [open, setOpen] = useState(false)
  const [jobData, setJobData ] = useState({
    title: "",
    company: "",
    location: "",
    url: "",
    description: ""
  })

  async function handleSubmit(e) {
    e.preventDefault();
    const newJobData = {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      url: jobData.url,
      description: jobData.description,
    }
    let newJob = await addJob(newJobData);
    if (newJob) {
      setJobs(jobs => [...jobs, newJob])
    }
    setJobData({
      title: "",
      company: "",
      location: "",
      url: "",
      description: ""
    })
    setOpen(false)
  }

  return (
    <>
      {/* Toggle button*/}
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className="flex justify-center items-center w-full p-3
          cursor-pointer rounded-md 
          bg-white border border-gray-300 hover:bg-sky-100"
        >
          {<PlusIcon className="w-6 h-6"/>}{<BriefcaseIcon className="w-6 h-6"/>}
        </button>
      )}

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Bait:</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Job Title"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Company"
                value={jobData.company}
                onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                type="text"
                placeholder="Location"
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                className="border p-2 rounded"
              />

              <input
                type="url"
                placeholder="Application URL"
                value={jobData.url}
                onChange={(e) => setJobData({ ...jobData, url: e.target.value })}
                className="border p-2 rounded"
              />

              <textarea
                placeholder="Description"
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                className="border p-2 rounded h-24"
              />

              <button
                type="submit"
                className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Add Job
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddJobForm;