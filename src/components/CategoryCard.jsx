import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({ name, icon, description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books?category=${encodeURIComponent(name)}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-icon">
        {icon}
      </div>

      <div className="category-content">
        <h3>{name}</h3>

        <p>{description}</p>

        <button>
          Explore →
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;