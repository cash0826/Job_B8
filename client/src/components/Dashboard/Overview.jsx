import { useOutletContext } from "react-router-dom"
import KPICard from "./KPICard";

function Overview() {
  const { jobs } = useOutletContext();

  const stats = [
    { label: "Total Jobs", value: jobs.length },
    { label: "Applied", value: jobs.filter(j => j.status === "Applied").length },
    { label: "Interviewing", value: jobs.filter(j => j.status === "Interviewing").length },
    { label: "Job Offer",  value: jobs.filter(j => j.status === "Job Offer").length },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Overview</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map( (stat) => (
          <KPICard key={stat.label} stat={stat}/>
        ))}
      </div>
    </div>
  )
}

export default Overview;