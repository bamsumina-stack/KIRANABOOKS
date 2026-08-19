import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      return;
    }

    navigate(`/books?search=${encodeURIComponent(search)}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <span className="search-icon">🔍</span>

      <input
        type="text"
        placeholder="Search books, authors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;