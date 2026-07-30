import { useOutletContext } from "react-router-dom"
import KPICard from "./KPICard";

function Overview() {
  const { jobs } = useOutletContext();

  const totalJobs = jobs.length
  const savedJobs = jobs.filter(j => j.status === "Saved").length
  const appliedJobs = totalJobs - savedJobs

  const stats = [
    { label: "Total Jobs", value: totalJobs },
    { label: "Applied", value: appliedJobs },
    { label: "Interviewing", value: jobs.filter(j => j.status === "Interviewing").length },
    { label: "Job Offer",  value: jobs.filter(j => j.status === "Job Offer").length },
  ]

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold text-gray-800">Overview</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
        {stats.map( (stat) => (
          <KPICard key={stat.label} stat={stat}/>
        ))}
      </div>
    </div>
  )
}

export default Overview;