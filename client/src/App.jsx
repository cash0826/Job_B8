import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom"
import LeftNavBar from "./components/LeftNavBar";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { getJWTUserId } from "./services/UserService";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getJWTUserId()
      .then( (u) => setUser(u))
      .catch( () => setUser(null))
      .finally(() => setLoading(false))
  }, []);

  function onLogin(userData) {
    setUser(userData)
    navigate("/");
  }

  if (loading) {
    return <p>Checking authentication...</p>
  }

  return (
    <>
      <LeftNavBar/>

      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login onLogin={onLogin} />} />

        {/* Protected layout */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home user={user}/> }> 
            <Route index element={<Dashboard/>} />
            <Route path="/events" element={<Events/> }> </Route>
            <Route path="/contacts" element={<Contacts/> }> </Route>
            <Route path="/profile" element={<Profile/>}> </Route>
          </Route>          
        </Route>
        
        <Route path="*" element={<NotFound/> }> </Route>
      </Routes>
    </>
  )
}

export default App
