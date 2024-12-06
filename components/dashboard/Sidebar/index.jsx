/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import NavLink from "../Navlink";

const sidebarItems = [
  {
    to: "/dashboard",
    icon: "/images/icons/sidebar-icon1.svg",
    iconActive: "/images/icons/sidebar-icon-active1.svg",
    text: "Loans Dashboard",
  },
//   {
//     to: "/dashboard-profile",
//     icon: "/images/icons/sidebar-icon2.svg",
//     iconActive: "/images/icons/sidebar-icon-active2.svg",
//     text: "Profile",
//   },
//   {
//     to: "/follower",
//     icon: "/images/icons/sidebar-icon4.svg",
//     iconActive: "/images/icons/sidebar-icon-active4.svg",
//     text: "Followers",
//   },
//   {
//     to: "/following",
//     icon: "/images/icons/sidebar-icon5.svg",
//     iconActive: "/images/icons/sidebar-icon-active5.svg",
//     text: "Followings",
//   },
//   {
//     to: "/setting",
//     icon: "/images/icons/sidebar-icon10.svg",
//     iconActive: "/images/icons/sidebar-icon-active10.svg",
//     text: "Settings",
//   },
  {
    to: "/statement",
    icon: "/images/icons/sidebar-icon12.svg",
    iconActive: "/images/icons/sidebar-icon-active12.svg",
    text: "Statements",
  },
//   {
//     to: "/earning",
//     icon: "/images/icons/sidebar-icon11.svg",
//     iconActive: "/images/icons/sidebar-icon-active11.svg",
//     text: "Earnings",
//   },
//   {
//     to: "/review",
//     icon: "/images/icons/sidebar-icon7.svg",
//     iconActive: "/images/icons/sidebar-icon-active7.svg",
//     text: "Reviews",
//   },
//   {
//     to: "/download",
//     icon: "/images/icons/sidebar-icon6.svg",
//     iconActive: "/images/icons/sidebar-icon-active6.svg",
//     text: "Downloads",
//   },
//   {
//     to: "/refund",
//     icon: "/images/icons/sidebar-icon8.svg",
//     iconActive: "/images/icons/sidebar-icon-active8.svg",
//     text: "Refunds",
//   },
//   {
//     to: "/login",
//     icon: "/images/icons/sidebar-icon13.svg",
//     iconActive: "/images/icons/sidebar-icon-active13.svg",
//     text: "Logout",
//   },
];

const Sidebar = ({ active, dashboardControl, showProfileControl, show }) => {
  return (
    <div className={`dashboard-sidebar ${active ? "active" : ""}`}>
      <button
        type="button"
        className="dashboard-sidebar__close d-lg-none d-flex text-body hover-text-main"
        onClick={dashboardControl}
      >
        <i className="las la-times" />
      </button>
      <div className="dashboard-sidebar__inner">
        {/* Sidebar List Start */}
        <ul className="sidebar-list">
          {sidebarItems.map((item, index) => (
            <li key={index} className="sidebar-list__item">
              <NavLink
                to={item.to}
                className={(navData) =>
                  navData.isActive
                    ? "sidebar-list__link activePage"
                    : "sidebar-list__link"
                }
              >
                <span className="sidebar-list__icon">
                  <img
                    src={item.icon}
                    alt={item.text}
                    className="icon"
                  />
                  <img
                    src={item.iconActive}
                    alt={`${item.text} active`}
                    className="icon icon-active"
                  />
                </span>
                <span className="text">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Sidebar List End */}
      </div>
    </div>
  );
};

export default Sidebar;
