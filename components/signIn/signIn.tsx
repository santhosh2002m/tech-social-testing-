"use client";

import { useState, useEffect } from "react";
import { Form, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, forgotPassword, clearError } from "../../store/authSlice";
import "../../styles/custom.scss";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated && !showForgotPassword) {
      toast.success("Login successful!");
      setCredentials({
        email: "",
        password: "",
        device_type: 1,
        device_token: "test",
        device_token_voip_ios: "test",
      });
      router.push("/dashboard");
    }
  }, [error, isAuthenticated, dispatch, showForgotPassword, router]);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotpas === "") {
      toast.warn("Please enter your email");
      return;
    }
    dispatch(forgotPassword(forgotpas)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Password reset link sent!");
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
      toast.warn("Please fill all fields");
      return;
    }
    dispatch(loginUser(credential)).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        console.error("Login failed:", result.payload);
      }
    });
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
