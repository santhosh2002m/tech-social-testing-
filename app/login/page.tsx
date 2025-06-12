"use client";

import { useState } from "react";
import SignIn from "../../components/signIn/signIn";
import SignUp from "../../components/signup/signup";
import logo from "/public/images/logo.png";
import "../../styles/custom.scss";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className="container">
      <div
        className={`panel-container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        <SignUp isRightPanelActive={isRightPanelActive} />
        <SignIn
          isRightPanelActive={isRightPanelActive}
          setIsRightPanelActive={setIsRightPanelActive}
        />
        <div
          className={`overlay ${isRightPanelActive ? "-translate-x-full" : ""}`}
        >
          <div
            className={`overlay-content ${
              isRightPanelActive ? "translate-x-1/2" : ""
            }`}
          >
            <div className={`panel left ${isRightPanelActive ? "active" : ""}`}>
              <Image src={logo} alt="TechSocial Logo" width={300} height={80} />
              <h1 className="text-black">Welcome Back!</h1>
              <p className="text-black">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="action-btn"
                onClick={() => setIsRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className={`panel right ${isRightPanelActive ? "" : ""}`}>
              <Image src={logo} alt="TechSocial Logo" width={300} height={80} />
              <h1 className="text-black">Hello, Friend!</h1>
              <p className="text-black">
                Enter your personal details and start journey with us
              </p>
              <button
                className="action-btn"
                onClick={() => setIsRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
