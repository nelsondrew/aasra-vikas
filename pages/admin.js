import { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Sidebar from "../components/dashboard/Sidebar";
import AdminNavbar from "../components/common/AdminNavbar";

export default function About() {
  let [active, setActive] = useState(false);
  let [show, setShow] = useState(false);
  let dashboardControl = () => {
    setActive(!active);
  };
  let showProfileControl = () => {
    setShow(!show);
  };
  return (
    <>
      <AdminNavbar active={active} dashboardControl={dashboardControl} />
      <div
        style={{
          marginTop: "7rem",
          display: "flex",
        }}
      >
        <Sidebar
          show={show}
          showProfileControl={showProfileControl}
          active={active}
          dashboardControl={dashboardControl}
        />
        <Dashboard active={active} />
      </div>
    </>
  );
}

About.getLayout = function getLayout(page) {
  return <>{page}</>;
};
