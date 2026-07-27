import { jobStatus } from "./jobStatus.js"

function JobListItem({ job, onStatusChange }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h4 className="font-semibold text-gray-800">{job.title}</h4>
      <p className="text-sm text-gray-500">{job.company}</p>

      <select
        className="mt-3 border rounded px-2 py-1 text-sm"
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value)}
      >
        {Object.values(jobStatus).map((status) => (
          <option key={status} value={status}>
            {status.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  )
}

export default JobListItem;