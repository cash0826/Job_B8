import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { getJWTUserId } from "../services/UserService";
import { loadJobs } from "../services/JobService";
import Login from "./Login";
import Dashboard from "../components/Dashboard";

function Home() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // let currentUser = await getJWTUserId();
    getJWTUserId()
      .then( (user) => setUser(existing => user) )
      .catch( (error) => console.log("Error fetching user: ", error) )

    loadJobs()
      .then( (data) => setJobs(existing => data ) )
      .catch( (error) => console.log("Error retrieving jobs: ", error))
  }, []);

  const onLogin = (user) => {
    setUser(user)
  }

  if (!user) return <Login onLogin={onLogin}/>;

  return (
    <main>
      <h2>Welcome to Job Bait🪝</h2>
      <Outlet context={{jobs}}/>
    </main>
  )
}

export default Home;