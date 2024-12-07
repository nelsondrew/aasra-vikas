/* eslint-disable @next/next/no-img-element */

import { StyledDashboardContainer } from "./styled";
import LoanApplicantsTable from "./components/LoanApplicantsTable";
import ChartContainer from "./components/UserSignUps/ChartContainer";
import DashboardCard from "./components/DashboardCard";
import { useEffect, useRef, useState } from "react";


const Dashboard = ({ active , name }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    // Function to update width when container size changes
    const handleResize = (entries) => {
      const entry = entries[0];
      if (entry) {
        const newWidth = entry.contentRect.width;
        setContainerWidth(newWidth);
      }
    };

    // Create a ResizeObserver to watch for changes in container's size
    const resizeObserver = new ResizeObserver(handleResize);

    // Check if containerRef.current is available, then observe it
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    } else {
      // If containerRef.current is null, we can observe again once it's assigned
      const intervalId = setInterval(() => {
        if (containerRef.current) {
          resizeObserver.observe(containerRef.current);
          clearInterval(intervalId); // Stop the interval once the element is available
        }
      }, 100); // Check every 100ms until the element is available
    }

    // Cleanup observer when the component is unmounted
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array to run on mount and unmount

  useEffect(() => {
    console.log(containerWidth)
  },[containerWidth])

  return (
    <StyledDashboardContainer ref={containerRef}>
      <div className="dashboard-body__content">
        {/* welcome balance Content Start */}
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">{`Welcome back ${name} !`}</h4>
          </div>
          <div className="welcome-balance__right flx-align gap-2">
            <span className="welcome-balance__text fw-500 text-heading">
              Total Loan Granted
            </span>
            <h4 className="welcome-balance__balance mb-0"> ₹5.00 Lacs</h4>
          </div>
        </div>
        {/* welcome balance Content End */}
        <div className="dashboard-body__item-wrapper">
          {/* dashboard body Item Start */}
          <div className="dashboard-body__item">
            <div className="row gy-4">
              <div className="col-xl-3 col-sm-6">
                <div className="dashboard-widget">
                  <img
                    src="/images/shapes/widget-shape1.png"
                    alt=""
                    className="dashboard-widget__shape one"
                  />
                  <img
                    src="/images/shapes/widget-shape2.png"
                    alt=""
                    className="dashboard-widget__shape two"
                  />
                  <span className="dashboard-widget__icon">
                    <img
                      src="/images/icons/dashboard-widget-icon1.svg"
                      alt=""
                    />
                  </span>
                  <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                    <div>
                      <h4 className="dashboard-widget__number mb-1 mt-3">23</h4>
                      <span className="dashboard-widget__text font-14">
                        Total Loan Applicants
                      </span>
                    </div>
                    <img src="/images/icons/chart-icon.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="dashboard-widget">
                  <img
                    src="/images/shapes/widget-shape1.png"
                    alt=""
                    className="dashboard-widget__shape one"
                  />
                  <img
                    src="/images/shapes/widget-shape2.png"
                    alt=""
                    className="dashboard-widget__shape two"
                  />
                  <span className="dashboard-widget__icon">
                    <img
                      src="/images/icons/dashboard-widget-icon2.svg"
                      alt=""
                    />
                  </span>
                  <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                    <div>
                      <h4 className="dashboard-widget__number mb-1 mt-3">
                        ₹ 56000
                      </h4>
                      <span className="dashboard-widget__text font-14">
                        Total Interest Earnings
                      </span>
                    </div>
                    <img src="/images/icons/chart-icon.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="dashboard-widget">
                  <img
                    src="/images/shapes/widget-shape1.png"
                    alt=""
                    className="dashboard-widget__shape one"
                  />
                  <img
                    src="/images/shapes/widget-shape2.png"
                    alt=""
                    className="dashboard-widget__shape two"
                  />
                  <span className="dashboard-widget__icon">
                    <img
                      src="/images/icons/dashboard-widget-icon3.svg"
                      alt=""
                    />
                  </span>
                  <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                    <div>
                      <h4 className="dashboard-widget__number mb-1 mt-3">
                         23
                      </h4>
                      <span className="dashboard-widget__text font-14">
                        Total Verified Users
                      </span>
                    </div>
                    <img src="/images/icons/chart-icon.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="dashboard-widget">
                  <img
                    src="/images/shapes/widget-shape1.png"
                    alt=""
                    className="dashboard-widget__shape one"
                  />
                  <img
                    src="/images/shapes/widget-shape2.png"
                    alt=""
                    className="dashboard-widget__shape two"
                  />
                  <span className="dashboard-widget__icon">
                    <img
                      src="/images/icons/dashboard-widget-icon4.svg"
                      alt=""
                    />
                  </span>
                  <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                    <div>
                      <h4 className="dashboard-widget__number mb-1 mt-3">
                        500,000
                      </h4>
                      <span className="dashboard-widget__text font-14">
                        Total Value of Approved Loans
                      </span>
                    </div>
                    <img src="/images/icons/chart-icon.svg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* dashboard body Item End */}
          {/* dashboard body Item Start */}
          <div className="dashboard-body__item">
            <div className="row gy-4">
              <div className="col-xl-8">
                <div className="dashboard-card">
                  <div className="dashboard-card__header flx-between gap-2">
                    <h6 className="dashboard-card__title mb-0">
                      User Sign ups
                    </h6>
                    <div className="select-has-icon d-inline-block">
                      <select
                        className="select common-input select-sm"
                        defaultValue={1}
                      >
                        <option value={1}>Monthly</option>
                        <option value={2}>Daily</option>
                        <option value={3}>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="dashboard-card__chart">
                    <ChartContainer />
                  </div>
                </div>
              </div>
              <DashboardCard />
            </div>
          </div>
          {/* dashboard body Item End */}
          {/* dashboard body Item Start */}
          <div className="dashboard-body__item">
            <LoanApplicantsTable containerWidth={containerWidth} active={active} />
          </div>
          {/* dashboard body Item End */}
        </div>
      </div>
    </StyledDashboardContainer>
  );
};

export default Dashboard;
