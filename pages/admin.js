// pages/admin.js

import { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import MasterLayout from "../components/dashboard/components/MasterLayout";
import { withAuth } from "../components/HOC/withAuth";

function Admin({ user }) {
  const { name , uid } = user;
  const [active, setActive] = useState(false);

  return (
    <>
      <MasterLayout uid={uid} active={active} setActive={setActive}>
        <Dashboard name={name} active={active} />
      </MasterLayout>
    </>
  );
}

Admin.getLayout = function getLayout(page) {
  return <>{page}</>;
};

// Use the HOC to get the getServerSideProps
const { getServerSideProps } = withAuth(Admin);

// Export the component with the getServerSideProps attached
export { getServerSideProps };
export default Admin;
