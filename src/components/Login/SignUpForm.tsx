import { useState } from "react";
import "./interface.scss";
import { fetchSignup } from "../../store/reducer";
import { useAppDispatch } from "../../store/hooks";

const SignUpForm = ({
  onSwitch,
  onClose,
}: {
  onSwitch: () => void;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    fetchSignup({ name, email, password })
      .then((res) => {
        if (res.success) {
          onClose();
        } else {
          console.log("falied");
        }
      })
      .catch((error) => {
        console.error("sign up failed", error);
      });
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
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Create password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
