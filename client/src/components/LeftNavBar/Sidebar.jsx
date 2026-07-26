import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import { DashboardIcon, EventsIcon, ContactsIcon, ProfileIcon } from "./icons";

function Sidebar() {
  // Persist collapsed state after page refresh using localStorage
  const [expanded, setExpanded] = useState(() => {
    const stored = localStorage.getItem("sidebar-expanded");
    return stored === null ? false : stored === "false";
  });

  return (
    <aside className={`hidden md:flex flex-col bg-gray-800 text-white h-screen transition-[width] duration-300 ease-in-out ${expanded ? "w-48" : "w-20"}`}>
      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)} className="p-3 hover:bg-gray-700" > {expanded ? "<<" : ">>"}
      </button>

      {/* Nav items */}
      <nav className={`mt-6 flex flex-col gap-4`}>
        <NavItem icon={<DashboardIcon/>} label="Dashboard" expanded={expanded} to="/" />
        <NavItem icon={<EventsIcon/>} label="Events" expanded={expanded} to="/events" />
        <NavItem icon={<ContactsIcon />} label="Contacts" expanded={expanded} to="/contacts" />
        <NavItem icon={<ProfileIcon/>} label="Profile" expanded={expanded} to="/profile" />
      </nav>      
    </aside>
  )
}

export default Sidebar;