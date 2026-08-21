import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const [success, setSuccess] = useState(false);

  const [stats, setStats] = useState({
    listings: 0,
    wishlist: 0,
    orders: 0,
  });

  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("kiranabooks_profile") || "null"
    );
    if (stored) {
      setProfile(stored);
    } else {
      const loggedInEmail = localStorage.getItem("kiranabooks_email") || "";
      setProfile((prev) => ({ ...prev, email: loggedInEmail }));
    }

    const listings = JSON.parse(
      localStorage.getItem("kiranabooks_userlistings") || "[]"
    );
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const order = JSON.parse(
      localStorage.getItem("kiranabooksOrder") || "null"
    );

    setStats({
      listings: listings.length,
      wishlist: wishlist.length,
      orders: order ? 1 : 0,
    });

    setMyListings(listings);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("kiranabooks_profile", JSON.stringify(profile));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const logout = () => {
    localStorage.removeItem("kiranabooks_loggedin");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      <div className="profile-layout">

        {/* LEFT SIDEBAR */}
        <aside className="profile-sidebar">
          <div className="sidebar-avatar">
            {profile.image ? (
              <img src={profile.image} alt="Profile" />
            ) : (
              <span className="avatar-placeholder">👤</span>
            )}
          </div>
          <h3>{profile.name || "Your Name"}</h3>
          <p className="sidebar-email">{profile.email}</p>

          <nav className="sidebar-nav">
            <Link to="/profile" className="active">👤 My Profile</Link>
            <Link to="/my-listings">📚 My Listings</Link>
            <Link to="/wishlist">❤️ Wishlist</Link>
            <Link to="/cart">🛒 Cart</Link>
            <button onClick={logout} className="sidebar-logout">
              🚪 Logout
            </button>
          </nav>
        </aside>

        {/* CENTER FORM */}
        <div className="profile-page">
          <h1>My Profile</h1>
          <p>Manage your personal details.</p>

          <div className="profile-stats">
            <div className="stat-box">
              <h3>{stats.listings}</h3>
              <p>Books Listed</p>
            </div>
            <div className="stat-box">
              <h3>{stats.wishlist}</h3>
              <p>Wishlist Items</p>
            </div>
            <div className="stat-box">
              <h3>{stats.orders}</h3>
              <p>Orders Placed</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-image-section">
              <div
                className="profile-avatar"
                onClick={() => fileInputRef.current.click()}
              >
                {profile.image ? (
                  <img src={profile.image} alt="Profile" />
                ) : (
                  <span className="avatar-placeholder">👤</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                hidden
              />

              <button
                type="button"
                className="upload-label"
                onClick={() => fileInputRef.current.click()}
              >
                Change Photo
              </button>
            </div>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
            />

            <label>Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />

            {success && (
              <p className="success-message">Profile updated successfully!</p>
            )}

            <button type="submit">Save Changes</button>
          </form>
        </div>

        {/* RIGHT SIDE — LISTINGS PREVIEW */}
        <aside className="profile-right">
          <h3>Your Listings</h3>

          {myListings.length === 0 ? (
            <div className="right-empty">
              <p>You haven't listed any books yet.</p>
              <Link to="/sell">Sell a Book →</Link>
            </div>
          ) : (
            <>
              <div className="mini-listing-list">
                {myListings.slice(0, 4).map((book) => (
                  <div key={book.id} className="mini-listing-card">
                    <img src={book.image} alt={book.title} />
                    <div>
                      <p className="mini-title">{book.title}</p>
                      <p className="mini-price">Rs. {book.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/my-listings" className="view-all-link">
                Manage all listings →
              </Link>
            </>
          )}
        </aside>

      </div>
    </>
  );
}

export default Profile;