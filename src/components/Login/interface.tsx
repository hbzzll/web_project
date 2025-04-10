import "./interface.scss";

const Interface = () => {
  return (
    <div className="login-container">
      <h2 className="form-title">Log in with</h2>
      <div className="social-login">
        <button className="social-button">
          <img
            src="public\images\login\google.svg"
            alt="Google"
            className="social-icon"
          />
          Google
        </button>
        <button className="social-button">
          <img
            src="public\images\login\apple.svg"
            alt="Apple"
            className="social-icon"
          />
          Apple
        </button>
      </div>

      <p className="separator">
        <span>or</span>
      </p>

      <form action="#" className="login-form">
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            required
          />
        </div>

        <a href="#" className="forgot-pass-link">
          Forgot Password?
        </a>
        <button className="login-button">Log In</button>
      </form>

      <p className="signup">
        {" "}
        Don't have an acount? <a href="#">Sign Up</a>
      </p>
    </div>
  );
};

export default Interface;
