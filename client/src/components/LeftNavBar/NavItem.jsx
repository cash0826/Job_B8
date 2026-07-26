import { NavLink } from "react-router-dom";

function NavItem({ icon, label, expanded, to }) {

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex p-3 cursor-pointer rounded-md
        transition-[width] duration-300 ease-in-out
        ${expanded ? "justify-start gap-3 w-full" : "justify-center"}

        ${isActive ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"}
      `}
    >
      <div className="w-6 h-6">
        {icon}
      </div>

      <span
        className={`
          whitespace-nowrap transition-opacity duration-200
          ${expanded ? "opacity-100" : "opacity-0 hidden"}
        `}
      >
        {label}
      </span>
    </NavLink>
  );
}

export default NavItem;