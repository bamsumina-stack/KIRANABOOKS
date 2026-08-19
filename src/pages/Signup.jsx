import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save basic account information
    localStorage.setItem(
      "kiranabooksUser",
      JSON.stringify({
        name,
        email,
        password
      })
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="signup-page">

      {/* LEFT */}
      <div className="signup-left">

        <div className="brand">
          <span className="brand-icon">📚</span>
          KIRANABOOKS
        </div>

        <div className="signup-left-content">

          <h1>
            Start your
            <br />
            book journey.
          </h1>

          <p>
            Create your account and discover affordable
            second-hand books from readers across Nepal.
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="signup-right">

        <div className="signup-card">

          <h2>Create account</h2>

          <p className="signup-subtitle">
            Join the Kiranabooks community
          </p>

          <form onSubmit={handleSignup}>

            <label>Full name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && (
              <p className="signup-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="signup-button"
            >
              Create Account
            </button>

          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;