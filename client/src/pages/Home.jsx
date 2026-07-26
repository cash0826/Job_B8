import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { loadJobs } from "../services/JobService";
import LeftNavBar from "../components/LeftNavBar";

function Home({ user, logout }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs()
      .then( (data) => setJobs(existing => data ) )
      .catch( (error) => console.log("Error retrieving jobs: ", error))
  }, []);

  return (
    <main>
      <LeftNavBar/>
      <h2>Job B8🪱</h2>
      <Outlet context={{ jobs, user, logout }}/>
    </main>
  )
}

export default Home;