import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    localStorage.setItem("kiranabooks_email", email);
     localStorage.setItem("kiranabooks_loggedin", "true"); 
navigate("/home");

    // Login successful
     localStorage.setItem("kiranabooks_loggedin", "true"); 
  navigate("/home");
};

  const handleGoogle = () => {
    alert("Google login will be connected later.");
  };

  const handleApple = () => {
    alert("Apple login will be connected later.");
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">

        <div className="brand">
          <span className="brand-icon">📚</span>
          KIRANABOOKS
        </div>

        <div className="left-content">
          <h1>
            Give books
            <br />
            a second life.
          </h1>

          <p>
            Buy affordable second-hand books, sell the books
            you no longer need, and keep stories moving.
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="login-card">

          <h2>Welcome back</h2>

          <p className="login-subtitle">
            Login to your Kiranabooks account
          </p>

          <form onSubmit={handleLogin}>

            <label>Email address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button className="login-button" type="submit">
              Login
            </button>

          </form>

          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <button
            className="social-button"
            onClick={handleGoogle}
          >
            <span>G</span>
            Continue with Google
          </button>

          <button
            className="social-button"
            onClick={handleApple}
          >
            <span></span>
            Continue with Apple
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign up
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;