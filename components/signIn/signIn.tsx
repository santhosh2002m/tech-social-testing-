"use client";

import { useState, useEffect } from "react"; // Add useEffect
import { Form, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, forgotPassword, clearError } from "../../store/authSlice";
import "../../styles/custom.scss";
import { toast } from "react-toastify"; // Add toast import

export default function SignIn({
  isRightPanelActive,
  setIsRightPanelActive,
}: {
  isRightPanelActive: boolean;
  setIsRightPanelActive: (active: boolean) => void;
}) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [credential, setCredentials] = useState({
    email: "",
    password: "",
    device_type: 1,
    device_token: "test",
    device_token_voip_ios: "test",
  });
  const [forgotpas, setForgotPas] = useState("");

  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Add useEffect to show toasts for login success/failure and forgot password
  useEffect(() => {
    if (error) {
      toast.error(error); // Show error toast
      dispatch(clearError()); // Clear error after showing toast
    }
    if (isAuthenticated && !showForgotPassword) {
      toast.success("Login successful!"); // Show success toast
    }
  }, [error, isAuthenticated, dispatch, showForgotPassword]);

  // Show toast for forgot password success
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotpas === "") {
      toast.warn("Please enter your email"); // Replace alert with toast
      return;
    }
    dispatch(forgotPassword(forgotpas)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Password reset link sent!"); // Show success toast
        setShowForgotPassword(false);
        setForgotPas("");
      }
    });
  };

  function userSubmitCredential(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((previousEl) => ({ ...previousEl, [name]: value }));
    dispatch(clearError());
  }

  function onSubmitCredentials(e: React.FormEvent) {
    e.preventDefault();
    if (credential.email === "" || credential.password === "") {
      toast.warn("Please fill all fields"); // Replace alert with toast
      return;
    }
    dispatch(loginUser(credential));
  }

  return (
    <div
      className={`form-container sign-in ${isRightPanelActive ? "hidden" : ""}`}
    >
      {!showForgotPassword ? (
        <Form onSubmit={onSubmitCredentials} className="form">
          <h1>Sign In</h1>
          <span>or use your account</span>
          <Input
            name="email"
            onChange={userSubmitCredential}
            value={credential.email}
            type="email"
            placeholder="Email"
            className="black-bg"
          />
          <Input
            name="password"
            value={credential.password}
            type="password"
            placeholder="Password"
            onChange={userSubmitCredential}
            className="black-bg"
          />
          <a href="#" onClick={() => setShowForgotPassword(true)}>
            Forgot your password?
          </a>
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <button type="submit" className="desktop-only" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <button type="button" onClick={() => setIsRightPanelActive(true)}>
              Sign Up
            </button>
          </div>
        </Form>
      ) : (
        <Form onSubmit={handleForgotPassword} className="form">
          <h1>Forgot Password</h1>
          <p className="description">
            Enter your email to receive a password reset link
          </p>
          <Input
            value={forgotpas}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForgotPas(e.target.value)
            }
            type="email"
            placeholder="Email"
            className="black-bg"
          />
          {error && <p className="error">{error}</p>}
          <div className="button-group btn-margin">
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                dispatch(clearError());
              }}
            >
              Back
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Link"}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}
