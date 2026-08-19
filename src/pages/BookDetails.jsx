import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import books from "../data/books";

function BookDetails() {

  const { id } = useParams();

  const book = books.find(
    (item) => item.id === Number(id)
  );

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="page-container">
          <h1>Book not found</h1>
        </div>
      </>
    );
  }

  const addToCart = () => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(book);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Book added to cart!");
  };

  return (
    <>
      <Navbar />

      <div className="details-container">

        <div className="details-image">

          <img
            src={book.image}
            alt={book.title}
          />

        </div>

        <div className="details-info">

          <p>{book.category}</p>

          <h1>{book.title}</h1>

          <h3>
            By {book.author}
          </h3>

          <p className="details-description">
            This second-hand book is available
            through Kiranabooks. Check the condition
            before purchasing.
          </p>

          <div className="condition">
            Condition: <strong>{book.condition}</strong>
          </div>

          <h2>
            Rs. {book.price}
          </h2>

          <button
            className="buy-button"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <Link
            className="back-link"
            to="/books"
          >
            ← Back to Books
          </Link>

        </div>

      </div>
    </>
  );
}

export default BookDetails;