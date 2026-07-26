import { NavLink } from "react-router-dom";
import { useState } from "react";

function LeftNavBar() {
  const [open, setOpen] = useState(false);

  return(
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">My App</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/" end> Dashboard </NavLink>
          <NavLink to="/events" end> Events </NavLink>
          <NavLink to="/contacts" end> Contacts </NavLink>
          <NavLink to="/profile" end> Profile </NavLink>
        </nav>
      </aside>
      {/* Mobile menu button for smaller screens */}
      <button className="md:hidden p-4" onClick={() => setOpen(!open)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      {open && (
        <aside className="absolute top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <a href="/" className="hover:text-gray-300">Dashboard</a>
            <a href="/events" className="hover:text-gray-300">Events</a>
            <a href="/contacts" className="hover:text-gray-300">Contacts</a>
            <a href="/profile" className="hover:text-gray-300">Profile</a>
          </nav>
        </aside>
      )}
    </div>
  )
}

export default LeftNavBar;