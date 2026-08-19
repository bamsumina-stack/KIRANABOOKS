import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SellBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    condition: "Good",
    image: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.author || !formData.price) {
      setError("Please fill in at least title, author, and price.");
      return;
    }

    // Get existing user-listed books (or empty array if none yet)
    const existingBooks = JSON.parse(
      localStorage.getItem("kiranabooks_userlistings") || "[]"
    );

    const newBook = {
      id: Date.now(), // simple unique id for now
      title: formData.title,
      author: formData.author,
      price: Number(formData.price),
      category: formData.category || "Uncategorized",
      condition: formData.condition,
      image: formData.image || "/placeholder-cover.jpg",
    };

    const updatedBooks = [...existingBooks, newBook];
    localStorage.setItem(
      "kiranabooks_userlistings",
      JSON.stringify(updatedBooks)
    );

    setSuccess(true);

    // Reset form
    setFormData({
      title: "",
      author: "",
      price: "",
      category: "",
      condition: "Good",
      image: "",
    });

    // Redirect to books page after a short delay
    setTimeout(() => navigate("/books"), 1000);
  };

  return (
    <div className="sell-book-page">
      <h1>Sell a Book</h1>
      <p>Fill in the details below to list your book.</p>

      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Palpasa Cafe"
        />

        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="e.g. Narayan Wagle"
        />

        <label>Price (Rs.)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 350"
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Fiction"
        />

        <label>Condition</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Worn">Worn</option>
        </select>

        <label>Cover Image URL</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://covers.openlibrary.org/b/isbn/..."
        />

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Book listed successfully! Redirecting...</p>}

        <button type="submit">List Book</button>
      </form>
    </div>
  );
}

export default SellBook;