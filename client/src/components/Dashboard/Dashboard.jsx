import Overview from "./Overview";
import JobList from "./JobList";
import AddJobForm from "./AddJobForm";

function Dashboard() {

  // Possible Search to Add if time provided

  return (
    <section>
      <div className="flex justify-center">
        <Overview/>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg flex justify-center">
        <AddJobForm/>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-3 flex justify-center">
        <JobList/>
      </div>

    </section>
  )
}

export default Dashboard;