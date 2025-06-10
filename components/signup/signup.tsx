"use client";

import { useState, useEffect } from "react"; // Add useEffect
import { Form, FormGroup, Input, Label } from "reactstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser, verifyOtp, clearError } from "../../store/authSlice";
import "../../styles/custom.scss";
import { toast } from "react-toastify"; // Add toast import

export default function SignUp({
  isRightPanelActive,
}: {
  isRightPanelActive: boolean,
}) {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    current_password: "",
    phone: "1234567888",
    country_code: "+1",
    login_ip: "192.168.1.1",
    role: 3,
    device_type: "mobile",
    industry: "IT",
    location: "Bengaluru",
    bio: "Test is Test",
    website: "www.test.com",
    profile_category_type: 2,
    interest_id: "1,2,3,4,5",
  });
  const [otp, setOtp] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Add useEffect to show toasts for signup and OTP verification
  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast
      dispatch(clearError()); // Clear error after showing toast
    }
    if (isAuthenticated && showOtpForm) {
      toast.success("OTP verified successfully!"); // Show success toast for OTP
    }
    if (!error && showOtpForm && !loading && !isAuthenticated) {
      // This condition avoids duplicate toasts; only show signup success when OTP form is shown
      toast.success("Signup successful! Please verify OTP.");
    }
  }, [error, isAuthenticated, showOtpForm, loading, dispatch]);

  function userSubmitProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserProfile((previousEl) => ({ ...previousEl, [name]: value }));
    dispatch(clearError());
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      userProfile.username === "" ||
      userProfile.fullname === "" ||
      userProfile.email === "" ||
      userProfile.password === "" ||
      userProfile.current_password === ""
    ) {
      toast.warn("Please fill all fields"); // Replace alert with toast
      return;
    }
    if (userProfile.password !== userProfile.current_password) {
      toast.warn("Passwords do not match"); // Replace alert with toast
      return;
    }
    dispatch(registerUser(userProfile)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setShowOtpForm(true);
      }
    });
  }

  function onSubmitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp === "") {
      toast.warn("Please enter OTP"); // Replace alert with toast
      return;
    }
    dispatch(verifyOtp({ email: userProfile.email, otp }));
  }

  return (
    <div
      className={`form-container sign-up ${isRightPanelActive ? "active" : ""}`}
    >
      {!showOtpForm ? (
        <Form className="form" onSubmit={onSubmit}>
          <h1 className="margin-unset">Sign Up</h1>
          <Input
            name="username"
            value={userProfile.username}
            type="text"
            placeholder="Username"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <Input
            name="fullname"
            value={userProfile.fullname}
            type="text"
            placeholder="Full Name"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <Input
            name="email"
            value={userProfile.email}
            type="email"
            placeholder="Email"
            onChange={userSubmitProfile}
            className="black-bg"
          />
          <div className="password-container">
            <Input
              name="password"
              value={userProfile.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={userSubmitProfile}
              className="black-bg"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <div className="password-container">
            <Input
              name="current_password"
              value={userProfile.current_password}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={userSubmitProfile}
              className="black-bg"
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <div className="checkbox-container">
            <Input type="checkbox" id="terms" required />
            <Label htmlFor="terms">
              <p className="custom-style">
                By Signing up, you are acknowledging that you have read,
                understood and accept our{" "}
                <a className="link custom-style-a" href="#">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a className="link custom-style-a" href="#">
                  Privacy policy
                </a>
              </p>
            </Label>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Requesting..." : "Request OTP"}
            </button>
          </div>
        </Form>
      ) : (
        <Form className="form" onSubmit={onSubmitOtp}>
          <h1>Verify OTP</h1>
          <p className="description">Enter the OTP received on your email</p>
          <Input
            className="black-bg"
            value={otp}
            type="text"
            placeholder="Enter OTP"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
          />
          {error && <p className="error">{error}</p>}
          <div className="button-group btn-margin">
            <button
              type="button"
              onClick={() => {
                setShowOtpForm(false);
                dispatch(clearError());
              }}
            >
              Back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}
