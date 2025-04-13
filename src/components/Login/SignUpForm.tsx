import { useState } from "react";
import "./interface.scss";
import { fetchSignup } from "../../store/reducer";
import { useAppDispatch } from "../../store/hooks";

const SignUpForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("注册信息", { name, email, password });
    dispatch(fetchSignup({ name, email, password }));
  };

  return (
    <>
      <h2 className="form-title">Create your account</h2>
      <form onSubmit={handleRegister} className="login-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Your Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Create password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>
      <p className="signup">
        Already have an account? <a onClick={onSwitch}>Sign In</a>
      </p>
    </>
  );
};

export default SignUpForm;
