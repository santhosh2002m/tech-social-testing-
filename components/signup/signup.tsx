"use client";

import { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser, verifyOtp, clearError } from "../../store/authSlice";
import "../../styles/custom.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Explicitly type the icons as React components
const FiEyeIcon: React.FC = FiEye as React.FC;
const FiEyeOffIcon: React.FC = FiEyeOff as React.FC;

export default function SignUp({
  isRightPanelActive,
}: {
  isRightPanelActive: boolean;
}) {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "",
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
  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated && showOtpForm) {
      toast.success("OTP verified successfully!");
      setUserProfile({
        username: "",
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
      setOtp("");
      setShowOtpForm(false);
      router.push("/dashboard");
    }
    if (!error && showOtpForm && !loading && !isAuthenticated) {
      toast.success("Signup successful! Please verify OTP.");
    }
  }, [error, isAuthenticated, showOtpForm, loading, dispatch, router]);

  function userSubmitProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserProfile((previousEl) => ({ ...previousEl, [name]: value }));
    dispatch(clearError());
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      userProfile.username === "" ||
      userProfile.email === "" ||
      userProfile.password === "" ||
      userProfile.current_password === ""
    ) {
      toast.warn("Please fill all fields");
      return;
    }
    if (userProfile.password !== userProfile.current_password) {
      toast.warn("Passwords do not match");
      return;
    }

    const payload = {
      username: userProfile.username,
      email: userProfile.email,
      password: userProfile.password,
      phone: userProfile.phone,
      country_code: userProfile.country_code,
      login_ip: userProfile.login_ip,
      role: userProfile.role,
      device_type: userProfile.device_type,
      industry: userProfile.industry,
      location: userProfile.location,
      bio: userProfile.bio,
      website: userProfile.website,
      profile_category_type: userProfile.profile_category_type,
      interest_id: userProfile.interest_id,
    };

    dispatch(registerUser(payload)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setShowOtpForm(true);
      }
    });
  }

  function onSubmitOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp === "") {
      toast.warn("Please enter OTP");
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
              {showPassword ? <FiEyeOffIcon /> : <FiEyeIcon />}
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
              {showConfirmPassword ? <FiEyeOffIcon /> : <FiEyeIcon />}
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
