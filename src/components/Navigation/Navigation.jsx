import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ currentPage }) => {
  return (
    <div className="navigation">
      <Link to="/" className="navigation__link">
        Home
      </Link>
      <Link to={`/list/page/${currentPage}`} className="navigation__link">
        Coin List
      </Link>
    </div>
  );
};

export default Navigation;
