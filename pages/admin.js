// pages/admin.js

import { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import MasterLayout from "../components/dashboard/components/MasterLayout";
import { withAuth } from "../components/HOC/withAuth";
import { LOAN_APPLICANTS_API } from "../constants/apiConstants";
import { getDateFrequencies } from "../components/dashboard/components/UserSignUps/ChartContainer";

const fetchApplicantsData = async () => {
  try {
    const response = await fetch(LOAN_APPLICANTS_API);
    const result = await response.json();
    let ts = result.data.map((item) => item.createdAt.seconds);
    ts = getDateFrequencies(ts);

    // Sorting the data by date (from past to future)
    const sortedData = Object.keys(ts)
      .sort((a, b) => new Date(a) - new Date(b)) // Sort by date
      .reduce((acc, key) => {
        acc[key] = ts[key];
        return acc;
      }, {});
    return {
      tableData: result.data,
      chartData: sortedData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function Admin({ user, extraData = {} }) {
  const { name, uid } = user;
  const [active, setActive] = useState(false);
  const { tableData = [], chartData = {} } = extraData;

  return (
    <>
      <MasterLayout uid={uid} active={active} setActive={setActive}>
        <Dashboard
          tableData={tableData}
          chartData={chartData}
          name={name}
          active={active}
        />
      </MasterLayout>
    </>
  );
}

Admin.getLayout = function getLayout(page) {
  return <>{page}</>;
};

// Use the HOC to get the getServerSideProps
const { getServerSideProps } = withAuth(Admin, fetchApplicantsData);

// Export the component with the getServerSideProps attached
export { getServerSideProps };
export default Admin;
