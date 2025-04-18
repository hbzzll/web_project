import "./interface.scss";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchLogin } from "../../store/reducer";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "antd/dist/reset.css";

const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //prevent refresh the page
    console.log("Logging in with:", { email, password });
    const result = await dispatch(fetchLogin({ email, password }));
    if (result.success) {
      success();
    } else {
      message.error("Login failed");
      console.log("failed");
    }
  };
  return (
    <>
      {contextHolder}
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
            className="input-field"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
