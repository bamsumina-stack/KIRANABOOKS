import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Cart() {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const removeItem = (id) => {

    const updatedCart =
      cart.filter((book) => book.id !== id);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, book) => sum + book.price,
    0
  );

  return (
    <>
      <Navbar />

      <div className="page-container">

        <h1>Your Cart </h1>

        {cart.length === 0 ? (

          <div className="empty-box">

            <h2>Your cart is empty</h2>

            <Link to="/books">
              Browse Books
            </Link>

          </div>

        ) : (

          <>

            <div className="cart-list">

              {cart.map((book) => (

                <div
                  className="cart-item"
                  key={book.id}
                >

                  <img
                    src={book.image}
                    alt={book.title}
                  />

                  <div>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <strong>
                      Rs. {book.price}
                    </strong>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(book.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            <div className="cart-total">

              <h2>
                Total: Rs. {total}
              </h2>

              <button>
                Proceed to Checkout
              </button>

            </div>

          </>

        )}

      </div>
    </>
  );
}

export default Cart;