import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SellBook.css";

function SellBook() {
  const navigate = useNavigate();
  const { id } = useParams(); // present only when editing
  const isEditMode = Boolean(id);

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

  // If editing, preload the existing book's data
  useEffect(() => {
    if (isEditMode) {
      const existingBooks = JSON.parse(
        localStorage.getItem("kiranabooks_userlistings") || "[]"
      );

      const bookToEdit = existingBooks.find(
        (book) => String(book.id) === id
      );

      if (bookToEdit) {
        setFormData(bookToEdit);
      }
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Convert uploaded image file to base64 string
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!formData.title || !formData.author || !formData.price) {
      setError("Please fill in at least title, author, and price.");
      return;
    }

    const existingBooks = JSON.parse(
      localStorage.getItem("kiranabooks_userlistings") || "[]"
    );

    let updatedBooks;

    if (isEditMode) {
      // Update the matching book
      updatedBooks = existingBooks.map((book) =>
        String(book.id) === id
          ? {
              ...book,
              title: formData.title,
              author: formData.author,
              price: Number(formData.price),
              category: formData.category || "Uncategorized",
              condition: formData.condition,
              image: formData.image || "/placeholder-cover.jpg",
            }
          : book
      );
    } else {
      // Add new listing
      const newBook = {
        id: Date.now(),
        title: formData.title,
        author: formData.author,
        price: Number(formData.price),
        category: formData.category || "Uncategorized",
        condition: formData.condition,
        image: formData.image || "/placeholder-cover.jpg",
      };

      updatedBooks = [...existingBooks, newBook];
    }

    // Save to localStorage
    localStorage.setItem(
      "kiranabooks_userlistings",
      JSON.stringify(updatedBooks)
    );

    setSuccess(true);

    // Clear form after adding a new book
    if (!isEditMode) {
      setFormData({
        title: "",
        author: "",
        price: "",
        category: "",
        condition: "Good",
        image: "",
      });
    }

    // Redirect to My Listings
    setTimeout(() => {
      navigate("/my-listings");
    }, 1000);
  };

  return (
    <div className="sell-book-page">
      {/* Back to Home Button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="back-home-btn"
      >
        ← Back to Home
      </button>

      <h1>{isEditMode ? "Edit Book Listing" : "Sell a Book"}</h1>

      <p>
        {isEditMode
          ? "Update the details below."
          : "Fill in the details below to list your book."}
      </p>

      <form onSubmit={handleSubmit}>
        {/* Book Title */}
        <label>Book Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Palpasa Cafe"
        />

        {/* Author */}
        <label>Author</label>

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="e.g. Narayan Wagle"
        />

        {/* Price */}
        <label>Price (Rs.)</label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 350"
          min="0"
        />

        {/* Category */}
        <label>Category</label>

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Fiction"
        />

        {/* Condition */}
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

        {/* Cover Image */}
        <label>Cover Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Image Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{
              width: "100px",
              marginTop: "8px",
              display: "block",
              borderRadius: "5px",
            }}
          />
        )}

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="success-message">
            {isEditMode
              ? "Book updated successfully!"
              : "Book listed successfully!"}{" "}
            Redirecting...
          </p>
        )}

        {/* Submit Button */}
        <button type="submit">
          {isEditMode ? "Update Book" : "List Book"}
        </button>
      </form>
    </div>
  );
}

export default SellBook;