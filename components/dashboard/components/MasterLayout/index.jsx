/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import Link from "next/link";
import NavLink from "../../Navlink";

const MasterLayout = ({ children, active, setActive }) => {
  let [show, setShow] = useState(false);
  let dashboardControl = () => {
    setActive(!active);
  };
  let showProfileControl = () => {
    setShow(!show);
  };

  return (
    <>

      <section
        className={`dashboard ${active && "active"}`}
        onClick={() => show === true && setShow(false)}
      >
        <div className="dashboard__inner d-flex">
          {/* Dashboard Sidebar Start */}
          <div className={`dashboard-sidebar ${active && "active"}`}>
            <button
              type="button"
              className="dashboard-sidebar__close d-lg-none d-flex text-body hover-text-main"
              onClick={dashboardControl}
            >
              <i className="las la-times" />
            </button>
            <div className="dashboard-sidebar__inner">
              <Link href="/" className="logo mb-48">
                <img
                  src="/images/logo/logo.png"
                  alt=""
                  className="white-version"
                />
                <img
                  src="/images/logo/white-logo-two.png"
                  alt=""
                  className="dark-version"
                />
              </Link>
              <Link href="/" className="logo favicon mb-48">
                <img src="/images/logo/favicon.png" alt="" />
              </Link>
              {/* Sidebar List Start */}
              <ul className="sidebar-list">
                <li className="sidebar-list__item">
                  <NavLink
                    to="/admin"
                    className={"sidebar-list__link activePage"}
                  >
                    <span className="sidebar-list__icon">
                      <img
                        src="/images/icons/sidebar-icon1.svg"
                        alt=""
                        className="icon"
                      />
                      <img
                        src="/images/icons/sidebar-icon-active1.svg"
                        alt=""
                        className="icon icon-active"
                      />
                    </span>
                    <span className="text">Loan Applicants</span>
                  </NavLink>
                </li>

                <li className="sidebar-list__item">
                  <NavLink
                    to="/statements"
                    className={(navData) =>
                      navData.isActive
                        ? "sidebar-list__link activePage"
                        : "sidebar-list__link"
                    }
                  >
                    <span className="sidebar-list__icon">
                      <img
                        src="/images/icons/sidebar-icon8.svg"
                        alt=""
                        className="icon"
                      />
                      <img
                        src="/images/icons/sidebar-icon-active8.svg"
                        alt=""
                        className="icon icon-active"
                      />
                    </span>
                    <span className="text">Statements</span>
                  </NavLink>
                </li>
              </ul>
              {/* Sidebar List End */}
            </div>
          </div>

          <div
            style={{
              width: "100% !important",
              background: "#F6F7F9",
            }}
            className="dashboard-body"
          >
            {/* Dashboard Nav Start */}
            <div className="dashboard-nav bg-white flx-between gap-md-3 gap-2">
              <div className="dashboard-nav__left flx-align gap-md-3 gap-2">
                <button
                  onClick={dashboardControl}
                  type="button"
                  className="icon-btn bar-icon text-heading bg-gray-seven flx-center"
                >
                  <i className="las la-bars" />
                </button>
                <button
                  onClick={dashboardControl}
                  type="button"
                  className="icon-btn arrow-icon text-heading bg-gray-seven flx-center"
                >
                  <img src="/images/icons/angle-right.svg" alt="" />
                </button>
              </div>
              <div className="dashboard-nav__right">
                <div className="header-right flx-align">
                  <div className="header-right__inner gap-sm-3 gap-2 flx-align d-flex">
                    {/* Light Dark Mode */}
                    <div className="user-profile">
                      <button
                        className="user-profile__button flex-align"
                        onClick={showProfileControl}
                      >
                        <span className="user-profile__thumb">
                          <img
                            src="/images/thumbs/user-profile.png"
                            className="cover-img"
                            alt=""
                          />
                        </span>
                      </button>
                      <ul
                        className={`user-profile-dropdown ${show && "show"} `}
                      >
                        <li className="sidebar-list__item">
                          <Link
                            href="/dashboard-profile"
                            className="sidebar-list__link"
                          >
                            <span className="sidebar-list__icon">
                              <img
                                src="/images/icons/sidebar-icon2.svg"
                                alt=""
                                className="icon"
                              />
                              <img
                                src="/images/icons/sidebar-icon-active2.svg"
                                alt=""
                                className="icon icon-active"
                              />
                            </span>
                            <span className="text">Profile</span>
                          </Link>
                        </li>
                        <li className="sidebar-list__item">
                          <Link href="/setting" className="sidebar-list__link">
                            <span className="sidebar-list__icon">
                              <img
                                src="/images/icons/sidebar-icon10.svg"
                                alt=""
                                className="icon"
                              />
                              <img
                                src="/images/icons/sidebar-icon-active10.svg"
                                alt=""
                                className="icon icon-active"
                              />
                            </span>
                            <span className="text">Settings</span>
                          </Link>
                        </li>
                        <li className="sidebar-list__item">
                          <Link href="/login" className="sidebar-list__link">
                            <span className="sidebar-list__icon">
                              <img
                                src="/images/icons/sidebar-icon13.svg"
                                alt=""
                                className="icon"
                              />
                              <img
                                src="/images/icons/sidebar-icon-active13.svg"
                                alt=""
                                className="icon icon-active"
                              />
                            </span>
                            <span className="text">Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* children */}
            {children}
            {/* Dashboard Footer */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MasterLayout;
