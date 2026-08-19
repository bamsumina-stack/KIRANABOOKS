import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function MyListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("kiranabooks_userlistings") || "[]"
    );
    setListings(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = listings.filter((book) => book.id !== id);
    setListings(updated);
    localStorage.setItem("kiranabooks_userlistings", JSON.stringify(updated));
  };

  const handleEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>My Listings</h1>

        {listings.length === 0 && <p>You haven't listed any books yet.</p>}

        <div className="book-grid">
          {listings.map((book) => (
            <div key={book.id} className="my-listing-card">
              <img src={book.image} alt={book.title} style={{ width: "100px" }} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>Rs. {book.price}</p>
              <button onClick={() => handleEdit(book.id)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyListings;