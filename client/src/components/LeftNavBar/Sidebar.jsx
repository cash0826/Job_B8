import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import { RightIcon, LeftIcon, DashboardIcon, EventsIcon, ContactsIcon, ProfileIcon } from "./icons";

function Sidebar() {
  // Persist collapsed state after page refresh using localStorage
  const [expanded, setExpanded] = useState(() => {
    const stored = localStorage.getItem("sidebar-expanded");
    return stored === null ? false : stored === "false";
  });

  return (
    <aside className={`hidden md:flex flex-col bg-gray-800 text-white h-screen transition-[width] duration-300 ease-in-out ${expanded ? "w-48" : "w-18"}`}>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex cursor-pointer rounded-md items-center gap-3 p-3 mt-3 w-full transition-all
          ${expanded ? "justify-start pl-6" : "justify-center"}
          hover:bg-gray-700`}
      >
        {expanded ? LeftIcon : RightIcon}
      </button>

      <div className="border-t border-gray-700 my-3 w-full"></div>
      {/* Main Navigation */}
      <nav className={`mt-3 flex flex-col gap-4 w-full`}>
        <NavItem icon={<DashboardIcon/>} label="Jobs" expanded={expanded} to="/" />
        <NavItem icon={<EventsIcon/>} label="Events" expanded={expanded} to="/events" />
        <NavItem icon={<ContactsIcon />} label="Contacts" expanded={expanded} to="/contacts" />
      </nav> 

      <div className="border-t border-gray-700 my-3 w-full"></div>
      {/* Footer section */}
      <div className="mt-auto mb-6 w-full">
        <NavItem icon={<ProfileIcon/>} label="Profile" expanded={expanded} to="/profile" />
      </div>
         
    </aside>
  )
}

export default Sidebar;