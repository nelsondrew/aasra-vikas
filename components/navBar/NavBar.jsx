import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { navData } from "./navData";
import Logo from "/public/images/av_logo.png";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';

const LoginButton = styled.button`
  background: transparent;
  color: #4B89DC;
  border: 2px solid #4B89DC;
  padding: 8px 24px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 16px;

  &:hover {
    background: rgba(75, 137, 220, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 20px;
    margin-right: 12px;
  }
`;

const NavBar = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const menus = useRef();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => {
    if(state?.user?.user?.id) {
      return true;
    }
    return false;
  });

  const hidenMenu = () => {
    menus.current.classList.remove("show");
  };

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  const logoConstants = {
    height: "57px",
    width: "13rem",
  };

  const handleCTAClick = () => {
    if (isAuthenticated) {
      window.location.href = '/dsa-dashboard';
    } else {
      window.location.href = '/splash';
    }
  };

  return (
    <header
      className={`header-section ${windowHeight > 50 && "header-fixed animated fadeInDown"
        }`}
    >
      <div className="overlay">
        <div className="container">
          <div className="row d-flex header-area">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link style={{
                height: logoConstants.height,
                width: logoConstants.width
              }} className="navbar-brand" href="/" onClick={hidenMenu}>
                <Image
                  src={Logo}
                  className="logo"
                  alt="logo"
                />
              </Link>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-content"
              >
                <i>
                  <FaBars />
                </i>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbar-content"
                ref={menus}
              >
                <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                  {navData.map(({ itm, url, id, dropdown, dropdown_itms }) => {
                    return !dropdown ? (
                      <li key={id} className="nav-item">
                        <Link
                          className="nav-link"
                          aria-current="page"
                          href={url}
                          onClick={hidenMenu}
                        >
                          {itm}
                        </Link>
                      </li>
                    ) : (
                      <li key={id} className="nav-item dropdown main-navbar">
                        <Link
                          className="nav-link dropdown-toggle"
                          href="/"
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                        >
                          {itm}
                        </Link>
                        <ul className="dropdown-menu main-menu shadow">
                          {dropdown_itms?.map(
                            ({ id, dp_itm, url, sbu_dropdown, sub_items }) =>
                              !sbu_dropdown ? (
                                <li key={id}>
                                  <Link
                                    className="nav-link"
                                    href={url}
                                    onClick={hidenMenu}
                                  >
                                    {dp_itm}
                                  </Link>
                                </li>
                              ) : (
                                <li key={id} className="dropend sub-navbar">
                                  <Link
                                    href="/"
                                    className="dropdown-item dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="outside"
                                  >
                                    {dp_itm}
                                  </Link>
                                  <ul className="dropdown-menu sub-menu shadow">
                                    {sub_items?.map(({ id, url, sub_itm }) => (
                                      <li key={id}>
                                        <Link
                                          className="nav-link"
                                          href={url}
                                          onClick={hidenMenu}
                                        >
                                          {sub_itm}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              )
                          )}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
                <div className="right-area header-action d-flex align-items-center">
                  <LoginButton onClick={handleCTAClick}>
                    {isAuthenticated ? 'Go to Dashboard' : 'Login'}
                  </LoginButton>
                  <Link
                    href="/apply-loan-v2"
                    className="cmn-btn"
                    onClick={hidenMenu}
                  >
                    Apply For Loan
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
