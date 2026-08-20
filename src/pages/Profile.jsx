import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const [success, setSuccess] = useState(false);

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

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <h1>My Profile</h1>
        <p>Manage your personal details.</p>

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
    </>
  );
}

export default Profile;