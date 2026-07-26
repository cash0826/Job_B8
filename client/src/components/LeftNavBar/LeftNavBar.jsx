import { useState } from "react";
import SideBar from "./Sidebar";
import Menu from "./Menu";

function LeftNavBar() {
  const [open, setOpen] = useState(false);

  return(
    <>
      <SideBar />
      <Menu />
    </>
  )
}

export default LeftNavBar;
