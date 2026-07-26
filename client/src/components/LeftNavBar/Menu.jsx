// Menu.jsx
import { useState } from "react";
import NavItem from "./NavItem";
import { DashboardIcon, EventsIcon, ContactsIcon, ProfileIcon } from "./icons";

function Menu() {
  const [open, setOpen] = useState(false);

  return(
    <div className="md:hidden">
      <button onClick={ () => setOpen(true)} className="p-3">
        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button onClick={ () => setOpen(false)} className="p-3 hover:bg-gray-700">✕</button>

        <nav className="mt-6 flex flex-col gap-4 p-3">
          <NavItem icon={<DashboardIcon />} label="Dashboard" expanded={true} to="/" />
          <NavItem icon={<EventsIcon />} label="Events" expanded={true} to="/events" />
          <NavItem icon={<ContactsIcon />} label="Contacts" expanded={true} to="/contacts" />
          <NavItem icon={<ProfileIcon />} label="Profile" expanded={true} to="/profile" />
        </nav>
      </aside>
    </div>
  )
}

export default Menu;