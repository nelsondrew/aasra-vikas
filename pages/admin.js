import { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import MasterLayout from "../components/dashboard/components/MasterLayout";

export default function About() {
  let [show, setShow] = useState(false); 

  let [active, setActive] = useState(false)

  return (
    <>
       <MasterLayout active={active} setActive={setActive}>
        <Dashboard active={active}/>
       </MasterLayout>
    </>
  );
}

About.getLayout = function getLayout(page) {
  return <>{page}</>;
};
