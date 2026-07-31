import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { loadJobs } from "../services/JobService";
import LeftNavBar from "../components/LeftNavBar/LeftNavBar";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs()
      .then((data) => setJobs(data))
      .catch((error) => console.log("Error retrieving jobs: ", error))
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <LeftNavBar/>

      {/* Right side, stacked content for Dashboard */}
      <div className="flex-1 flex flex-col max-w-full">
        <header className="w-full p-3 bg-gray-50 shadow-sm sticky top-0 z-10">
          <h1 className="text-4xl font-semibold leading-tight text-gray-800">Job B8</h1>
        </header>
        <main >
          <div className="p-2">
            <Outlet context={{ jobs, setJobs }} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home;