import Overview from "./Overview";
import JobList from "./JobList";

function Dashboard() {

  return (
    <section className="w-full">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Overview/>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 md:col-span-2 xl:col-span-1">
        <JobList/>
      </div>
    </section>
  )
}

export default Dashboard;