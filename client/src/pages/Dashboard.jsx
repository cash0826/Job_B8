import { useState } from 'react'
import { userLogin, getJWTUserId } from "../services/UserService"
import { loadJobs } from "../services/JobServices";
import { Login } from "./Login";


function JobDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // let currentUser = await getJWTUserId();
    getJWTUserId()
      .then( (user) => setUser(existing => user) )
      .catch( (error) => console.log("Error fetching user: ", error) )

    loadJobs()
  }, []);

  if (!user) return <Login />;

  return (
    <>
    </>
  )
}


export default JobDashboard