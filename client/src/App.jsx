import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <Routes> 
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home /> }> 
            <Route index element={<Dashboard/>} />
            <Route path="events" element={<Events/> }> </Route>
            <Route path="contacts" element={<Contacts/> }> </Route>
            <Route path="profile" element={<Profile/>}> </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<NotFound/> }> </Route>
      </Routes>
    </>
  )
}

export default App
