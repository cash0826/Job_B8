import { useOutletContext } from "react-router-dom"
import KPICard from "./KPICard";

function Overview() {
  const { jobs } = useOutletContext();

  const totalJobs = jobs.length
  const savedJobs = jobs.filter(j => j.status === "Saved").length
  const appliedJobs = totalJobs - savedJobs // All jobs except those in status "Saved"
  const interviewing = jobs.filter(j => j.status === "Interviewing").length
  const jobOffer = jobs.filter(j => j.status === "Job Offer").length

  const stats = [
    { label: "Total Jobs", value: totalJobs },
    { label: "Applied", value: appliedJobs },
    { label: "Interviewing", value: interviewing },
    { label: "Job Offer",  value: jobOffer },
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