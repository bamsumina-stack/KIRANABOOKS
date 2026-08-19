import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("kiranabooks_loggedin");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        📚 Kiranabooks
      </Link>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/books">
          Browse Books
        </Link>

        <Link to="/sell">
          Sell a Book
        </Link>

        <Link to="/wishlist">
          ❤️ Wishlist
        </Link>

        <Link to="/cart">
          🛒 Cart
        </Link>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;