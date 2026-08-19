import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    payment: "Cash on Delivery",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      address,
      city,
    } = formData;

    if (!name || !email || !phone || !address || !city) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");

    // Save order information locally
    localStorage.setItem(
      "kiranabooksOrder",
      JSON.stringify(formData)
    );

    alert("Order placed successfully!");

    navigate("/home");
  };

  return (
    <div className="checkout-page">

      {/* HEADER */}

      <header className="checkout-header">
        <button
          className="back-button"
          onClick={() => navigate("/cart")}
        >
          ← Back to Cart
        </button>

        <h1>KIRANABOOKS</h1>

        <div className="secure-text">
          🔒 Secure Checkout
        </div>
      </header>

      {/* MAIN */}

      <main className="checkout-container">

        <div className="checkout-left">

          <h2>Checkout</h2>

          <p className="checkout-subtitle">
            Enter your details to complete your order.
          </p>

          <form onSubmit={handleOrder}>

            {/* CONTACT */}

            <section className="checkout-section">

              <h3>Contact Information</h3>

              <label>Full Name *</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Email Address *</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Phone Number *</label>

              <input
                type="tel"
                name="phone"
                placeholder="98XXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
              />

            </section>

            {/* ADDRESS */}

            <section className="checkout-section">

              <h3>Delivery Address</h3>

              <label>Address *</label>

              <textarea
                name="address"
                placeholder="Enter your delivery address"
                value={formData.address}
                onChange={handleChange}
              />

              <label>City *</label>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">
                  Select your city
                </option>

                <option value="Kathmandu">
                  Kathmandu
                </option>

                <option value="Lalitpur">
                  Lalitpur
                </option>

                <option value="Bhaktapur">
                  Bhaktapur
                </option>

                <option value="Pokhara">
                  Pokhara
                </option>

                <option value="Biratnagar">
                  Biratnagar
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </section>

            {/* PAYMENT */}

            <section className="checkout-section">

              <h3>Payment Method</h3>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    formData.payment === "Cash on Delivery"
                  }
                  onChange={handleChange}
                />

                <span>
                  <strong>Cash on Delivery</strong>
                  <small>
                    Pay when your book arrives.
                  </small>
                </span>

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Online Payment"
                  checked={
                    formData.payment === "Online Payment"
                  }
                  onChange={handleChange}
                />

                <span>
                  <strong>Online Payment</strong>
                  <small>
                    Payment gateway can be connected later.
                  </small>
                </span>

              </label>

            </section>

            {error && (
              <p className="checkout-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="place-order-button"
            >
              Place Order
            </button>

          </form>

        </div>

        {/* ORDER SUMMARY */}

        <aside className="order-summary">

          <h2>Order Summary</h2>

          <div className="summary-book">

            <div className="book-placeholder">
              📚
            </div>

            <div>
              <h3>Selected Book</h3>
              <p>Second-hand book</p>
              <p>Quantity: 1</p>
            </div>

          </div>

          <div className="summary-line">
            <span>Book Price</span>
            <span>Rs. 500</span>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <span>Rs. 100</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>Rs. 600</strong>
          </div>

        </aside>

      </main>

    </div>
  );
}

export default Checkout;