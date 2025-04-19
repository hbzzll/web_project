import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const Interface = ({ onClose }: { onClose: () => void }) => {
  const [view, setView] = useState("login");

  return (
    <div className="login-container">
      {view === "login" ? (
        <LoginForm onSwitch={() => setView("signup")} onClose={onClose} />
      ) : (
        <SignUpForm onSwitch={() => setView("login")} onClose={onClose} />
      )}
    </div>
  );
};

export default Interface;
