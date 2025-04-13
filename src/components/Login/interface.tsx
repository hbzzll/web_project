import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Interface = () => {
  const [view, setView] = useState("login");

  return (
    <div className="login-container">
      {view === "login" ? (
        <LoginForm onSwitch={() => setView("signup")} />
      ) : (
        <SignUpForm onSwitch={() => setView("login")} />
      )}
    </div>
  );
};

export default Interface;
