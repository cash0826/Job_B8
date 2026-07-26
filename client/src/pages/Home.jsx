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
    <div className="bg-sky-50">
      <LeftNavBar/>
      <main className="flex-1 p-6">
        <h2>Job B8🪱</h2>
        <Outlet context={{ jobs }}/>
      </main>
    </div>
  )
}

export default Home;