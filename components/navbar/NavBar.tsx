"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Message from "../common/Message";
import Notification from "../common/Notification";
import Setting from "../common/Setting";
import logo from "/public/images/logo.png";

const NavBar = ({ clss = "container" }: { clss: string }) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [active, setActive] = useState<string>("");
  const [activeSearchForm, setActiveSearchForm] = useState(false);

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  const activeHandler = (opt: string) => {
    if (opt === active) {
      setActive("");
    } else {
      setActive(opt);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  return (
    <header
      className={`header-section header-menu ${
        windowHeight > 50 && "animated fadeInDown header-fixed"
      }`}
    >
      <nav className="navbar navbar-expand-lg p-0">
        <div className={clss}>
          <nav className="navbar w-100 navbar-expand-lg justify-content-between">
            <Link href="/" className="navbar-brand">
              <Image src={logo} className="logo" alt="logo" />
            </Link>
            {/* <button
              className="button search-active d-block d-md-none"
              onClick={() => setActiveSearchForm(!activeSearchForm)}
            >
              <i className="d-center material-symbols-outlined fs-xxl mat-icon">
                search
              </i>
            </button> */}
            <div className={`search-form  ${activeSearchForm ? "active" : ""}`}>
              <form
                action="#"
                className="Ts_searchBar input-area d-flex align-items-center"
              >
                {" "}
                <input
                  type="text"
                  placeholder="search"
                  autoComplete="off"
                  className="Ts_searchBar_input"
                />
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="#F15A29"
                      strokeWidth="4"
                      fill="black"
                    />
                    <text
                      x="13"
                      y="25"
                      fontFamily="Arial, sans-serif"
                      fontWeight="bold"
                      fontSize="14"
                      fill="#F15A29"
                    >
                      AI
                    </text>
                    <line
                      x1="31"
                      y1="31"
                      x2="44"
                      y2="44"
                      stroke="#F15A29"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </form>
            </div>

            <div className="right-area position-relative d-flex gap-3 gap-xxl-6 align-items-center left-side">
              <div
                className={`single-item d-none d-lg-block messages-area ${
                  active === "message" ? "active" : ""
                }`}
              >
                <Message activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item d-none d-lg-block messages-area notification-area ${
                  active === "notification" ? "active" : ""
                }`}
              >
                <Notification activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item d-none d-lg-block profile-area position-relative ${
                  active === "settings" ? "active" : ""
                }`}
              >
                <Setting activeHandler={activeHandler} />
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
