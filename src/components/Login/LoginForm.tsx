import "./interface.scss";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchLogin } from "@/store/reducer";
import { useNavigate } from "react-router-dom";

const LoginForm = ({
  onSwitch,
  onClose,
}: {
  onSwitch: () => void;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passworderror, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent refresh the page
    setEmailError("");
    setPasswordError("");

    console.log("Logging in with:", { email, password });
    const res = await dispatch(fetchLogin({ email, password }));
    if (res.success) {
      onClose();
    } else {
      if (res.category === "email") {
        setEmailError(res.message);
      } else if (res.category === "password") {
        setPasswordError(res.message);
      } else {
        alert(res.message);
      }
    }
  };
  return (
    <>
      <h2 className="form-title">Sign in with</h2>
      <div className="social-login">
        <button className="social-button">
          <img
            src="/images/login/google.svg"
            alt="Google"
            className="social-icon"
          />
          Google
        </button>
        <button className="social-button">
          <img
            src="/images/login/apple.svg"
            alt="Apple"
            className="social-icon"
          />
          Apple
        </button>
      </div>

      <p className="separator">
        <span>or</span>
      </p>

      <form onSubmit={handleSubmit} action="#" className="login-form">
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email address"
            className={`input-field ${emailerror ? "error" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            required
          />
          {emailerror && <div className="error-message">{emailerror}</div>}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className={`input-field ${passworderror ? "error" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            required
          />
          {passworderror && (
            <div className="error-message">{passworderror}</div>
          )}
        </div>

        <a href="#" className="forgot-pass-link">
          Forgot Password?
        </a>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>

      <p className="signup">
        {" "}
        Don't have an account? <a onClick={onSwitch}>Sign Up</a>
      </p>
    </>
  );
};

export default LoginForm;
