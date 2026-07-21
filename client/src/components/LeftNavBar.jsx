import { NavLink } from "react-router-dom";

function LeftNavBar() {
  return(
    <nav>
      <NavLink to="/" end> Dashboard </NavLink>
      <NavLink to="/events" end> Events </NavLink>
      <NavLink to="/contacts" end> Contacts </NavLink>
      <NavLink to="/profile" end> Profile </NavLink>
    </nav>
  )
}