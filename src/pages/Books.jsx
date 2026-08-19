import { useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import books from "../data/books";

function Books() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Nepali Literature",
    "Fiction",
    "Self Help",
    "Finance"
  ];

  const filteredBooks = books.filter((book) => {

    const matchesSearch =
      book.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      book.author
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      book.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <div className="page-container">

        <h1>Browse Books</h1>

        <p className="page-description">
          Find your next favorite book at an affordable price.
        </p>

        <div className="filters">

          <input
            placeholder="Search books..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            {categories.map((cat) => (
              <option key={cat}>
                {cat}
              </option>
            ))}

          </select>

        </div>

        <div className="book-grid">

          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
            />
          ))}

        </div>

      </div>
    </>
  );
}

export default Books;