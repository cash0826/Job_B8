import Overview from "./Overview";
import JobList from "./JobList";

function Dashboard() {

  // Possible Search to Add if time provided

  return (
    <section className="w-full">
      <div className="flex justify-center p-3">
        <Overview/>
      </div>

      <div className="grid grid-cols-6 gap-4 px-6 py-3 bg-gray-100 border-b border-gray-300 rounded-t-lg">
        <h3 className="font-semibold text-gray-700">Status</h3>
        <h3 className="font-semibold text-gray-700">Title</h3>
        <h3 className="font-semibold text-gray-700">Company</h3>
        <h3 className="font-semibold text-gray-700">Location</h3>
        <h3 className="font-semibold text-gray-700">Description</h3>
        <h3 className="font-semibold text-gray-700">Actions</h3>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 flex justify-center">
        <JobList/>
      </div>

    </section>
  )
}

export default Dashboard;