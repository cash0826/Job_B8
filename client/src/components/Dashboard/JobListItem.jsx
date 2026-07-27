import { jobStatus } from "./jobStatus.js"

function JobListItem({ job, onStatusChange }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 border-b border-gray-200 hover:bg-gray-50">
      <span className="text-gray-800 text-left">{job.title}</span>
      <span className="text-gray-800 text-left">{job.company}</span>
      <span className="text-gray-800 text-left">{job.location}</span>
      <span className="hidden md:block text-gray-800 truncate text-left">{job.description}</span>
      <span className="text-gray-800 text-left">{job.status}</span>
    </div>
  )
}

export default JobListItem;