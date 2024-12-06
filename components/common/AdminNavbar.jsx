import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "/public/images/av_logo.png";
import logoSmall from "/public/images/av_small.png";

const AdminNavbar = ({ dashboardControl, active }) => {
  const [windowHeight, setWindowHeight] = useState(0);

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  // test
  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  const inActiveStyle = {
    height: "56px",
    width: "13rem",
  };

  const activeStyle = {
    height: "66px",
    width: "60px",
    transform: "translate(-1rem, 0px)",
  };

  return (
    <header
      className={`header-section register login ${
        windowHeight > 50 && "header-fixed animated fadeInDown"
      }`}
    >
      <div className="overlay">
        <div
          style={{
            marginLeft: "1rem",
          }}
          className="container"
        >
          <div className="row d-flex header-area">
            <nav className="navbar d-flex justify-content-between navbar-expand-lg navbar-dark">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof dashboardControl === "function") {
                    dashboardControl();
                  }
                }}
                style={{
                  ...(!active && { ...inActiveStyle }),
                }}
                className="navbar-brand"
                href="/"
              >
                <Image
                  style={{
                    ...(active && { ...activeStyle }),
                  }}
                  src={active ? logoSmall : logo}
                  className="logo"
                  alt="logo"
                />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
