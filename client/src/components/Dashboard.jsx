import { useOutletContext } from "react-router-dom"
import Overview from "./Overview";
import JobList from "./JobList";

function Dashboard() {
  const {jobs} = useOutletContext();
  // const sortedJobs = filter(jobs)

  return (
    <>
      <Overview/>
      <JobList/>
    </>
  )
}

export default Dashboard;