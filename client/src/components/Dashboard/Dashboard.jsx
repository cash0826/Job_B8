import Overview from "./Overview";
import JobList from "./JobList";

function Dashboard() {

  // Possible Search to Add if time provided

  return (
    <section>
      <div className="flex justify-center p-3">
        <Overview/>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-center">
        <JobList/>
      </div>

    </section>
  )
}

export default Dashboard;