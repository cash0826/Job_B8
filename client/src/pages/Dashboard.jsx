import { useState, useEffect } from 'react'
import { getJWTUserId } from "../services/UserService"
import { loadJobs } from "../services/JobService";
import Login from "../pages/Login";


function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // let currentUser = await getJWTUserId();
    getJWTUserId()
      .then( (user) => setUser(existing => user) )
      .catch( (error) => console.log("Error fetching user: ", error) )

    loadJobs()
  }, []);

  const onLogin = (user) => {
    setUser(user)
  }

  if (!user) return <Login onLogin={onLogin}/>;

  return (
    <>
    </>
  )
}


export default Dashboard;