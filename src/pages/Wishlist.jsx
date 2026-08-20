import { useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

function Wishlist() {

  const [wishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  return (
    <>
      <Navbar />

      <div className="page-container">

        <h1>Your Wishlist </h1>

        {wishlist.length === 0 ? (

          <div className="empty-box">

            <h2>Your wishlist is empty</h2>

            <p>
              Add books you want to remember.
            </p>

            <Link to="/books">
              Browse Books
            </Link>

          </div>

        ) : (

          <div className="book-grid">

            {wishlist.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}

          </div>

        )}
        <section className="features">

          <div>
            <span></span>
            <h3>Affordable Books</h3>
            <p>
              Find quality second-hand books
              at student-friendly prices.
            </p>
          </div>

          <div>
            <span></span>
            <h3>Give Books a Second Life</h3>
            <p>
              Sell books you no longer need
              and earn from them.
            </p>
          </div>

          <div>
            <span>🇳🇵</span>
            <h3>Nepali Books</h3>
            <p>
              Discover books from Nepali
              authors and writers.
            </p>
          </div>

        </section>

      
      </div>
    </>
  );
}

export default Wishlist;