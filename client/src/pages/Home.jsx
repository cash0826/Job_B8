import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { loadJobs } from "../services/JobService";
import LeftNavBar from "../components/LeftNavBar/LeftNavBar";

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs()
      .then( (data) => setJobs(existing => data ) )
      .catch( (error) => console.log("Error retrieving jobs: ", error))
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <LeftNavBar/>
      <header className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Here's your bait:</h1>
        </div>
      </header>
      <main className="flex-1">
        <Outlet context={{ jobs }}/>
      </main>
    </div>
  )
}

export default Home;