import { useOutletContext } from "react-router-dom"
import Overview from "./Overview";
import List from "./List";

function Dashboard() {
  const {jobs} = useOutletContext();
  // const sortedJobs = filter(jobs)

  return (
    <>
      <Overview/>
      <List/>
    </>
  )
}

export default Dashboard;