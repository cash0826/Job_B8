import { jobStatus } from "./jobStatus.js"

function JobListItem({ job, onStatusChange }) {
  return (
    <div className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-200 hover:bg-gray-50">
      <span className="text-gray-800">{job.status}</span>
      <span className="text-gray-800">{job.title}</span>
      <span className="text-gray-800">{job.company}</span>
      <span className="text-gray-800">{job.location}</span>
      <span className="text-gray-800 truncate">{job.description}</span>

      <div className="flex gap-2">
        <button className="text-blue-600 hover:underline">Edit</button>
        <button className="text-red-600 hover:underline">Delete</button>
      </div>
    </div>
  )
}

export default JobListItem;