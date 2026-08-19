import { Link } from "react-router-dom";

function BookCard({ book }) {

  const addToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExists = cart.some(
      (item) => item.id === book.id
    );

    if (!alreadyExists) {
      cart.push(book);
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      alert("Book added to cart!");
    } else {
      alert("Book is already in your cart.");
    }
  };

  const addToWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(
      (item) => item.id === book.id
    );

    if (!exists) {
      wishlist.push(book);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );

      alert("Added to wishlist!");
    }
  };

  return (
    <div className="book-card">

      <Link to={`/book/${book.id}`}>

        <div className="book-image">
          <img
            src={book.image}
            alt={book.title}
          />
        </div>

      </Link>

      <div className="book-info">

        <p className="book-category">
          {book.category}
        </p>

        <h3>{book.title}</h3>

        <p className="book-author">
          by {book.author}
        </p>

        <div className="book-bottom">

          <strong>
            Rs. {book.price}
          </strong>

          <span>
            {book.condition}
          </span>

        </div>

        <div className="book-actions">

          <button onClick={addToCart}>
            Add to Cart
          </button>

          <button
            className="heart"
            onClick={addToWishlist}
          >
            ♡
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookCard;