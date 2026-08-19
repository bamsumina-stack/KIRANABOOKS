import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import books from "../data/books";

function Home() {

  const [search, setSearch] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <p className="small-title">
              BUY • SELL • REUSE
            </p>

            <h1>
              Give Books
              <br />
              a Second Life.
            </h1>

            <p>
              Discover affordable second-hand books
              from readers across Nepal.
            </p>

            <div className="hero-buttons">

              <Link to="/books">
                Browse Books
              </Link>

              <Link
                to="/sell"
                className="secondary-button"
              >
                Sell Your Books
              </Link>

            </div>

          </div>

          <div className="hero-book">
            
          </div>

        </section>


        {/* SEARCH */}

        <section className="search-section">

          <h2>Find your next book</h2>

          <input
            type="text"
            placeholder="Search books, authors..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </section>


        {/* BOOKS */}

        <section className="books-section">

          <div className="section-heading">

            <div>
              <p>DISCOVER</p>
              <h2>Popular Books</h2>
            </div>

            <Link to="/books">
              View All →
            </Link>

          </div>

          <div className="book-grid">

            {filteredBooks
              .slice(0, 4)
              .map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                />
              ))}

          </div>

        </section>


        {/* FEATURES */}

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

      </main>

    </>
  );
}

export default Home;