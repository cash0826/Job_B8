import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import LeftNavBar from "./components/LeftNavBar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Contact from "./pages/Contacts";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  // For scrolling
  const location = useLocation()

  return (
    <>
      <BrowserRouter>
        <LeftNavBar/>
        <Routes>
          <Route path="/" element={<Dashboard/> }> </Route>
          <Route path="/login" element={<Login/> }> </Route>
          <Route path="/events" element={<Events/> }> </Route>
          <Route path="/contacts" element={<Contacts/> }> </Route>
          <Route path="/profile" element={<Profile/>}> </Route>
          <Route path="*" element={<NotFound/> }> </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
